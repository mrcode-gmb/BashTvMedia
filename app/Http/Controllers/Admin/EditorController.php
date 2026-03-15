<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class EditorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/Editors/Index', [
            'editors' => User::where('role', 'editor')->withCount('posts')->latest()->paginate(10),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Editors/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
        ]);

        // Generate a random password
        $password = \Illuminate\Support\Str::random(12);

        $editor = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($password),
            'role' => 'editor',
        ]);

        // Send welcome email with login credentials
        $editor->notify(new \App\Notifications\WelcomeUserNotification($editor, $password, auth()->user()));

        return redirect()->route('editors.index')->with('success', 'Editor created successfully. Welcome email sent with login credentials.');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $editor)
    {
        return redirect()->route('editors.edit', $editor);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $editor)
    {
        return Inertia::render('Admin/Editors/Edit', [
            'editor' => $editor,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $editor)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users')->ignore($editor->id)],
            'status' => ['required', Rule::in(['active', 'deactivated'])],
            'can_publish' => 'required|boolean',
        ]);

        $editor->update($request->only('name', 'email', 'status', 'can_publish'));

        if ($request->filled('password')) {
            $editor->update(['password' => Hash::make($request->password)]);
        }

        return redirect()->route('editors.index')->with('success', 'Editor updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $editor)
    {
        $editor->delete();

        return redirect()->route('editors.index')->with('success', 'Editor deleted successfully.');
    }
}