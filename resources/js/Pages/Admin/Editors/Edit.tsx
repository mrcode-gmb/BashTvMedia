import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Switch } from '@/Components/ui/switch';
import { FormEventHandler } from 'react';

interface Editor {
    id: number;
    name: string;
    email: string;
    status: string;
    can_publish: boolean;
}

export default function Edit({ editor }: { editor: Editor }) {
    const { data, setData, put, processing, errors } = useForm({
        name: editor.name,
        email: editor.email,
        status: editor.status,
        can_publish: editor.can_publish,
        password: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('editors.update', editor.id));
    };

    return (
        <AdminLayout header="Edit Editor">
            <Head title={`Edit Editor - ${editor.name}`} />

            <Card>
                <CardHeader>
                    <CardTitle>Edit Editor</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={submit} className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="status">Status</Label>
                            <Select value={data.status} onValueChange={(value) => setData('status', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="deactivated">Deactivated</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.status && <p className="text-red-500 text-xs mt-1">{errors.status}</p>}
                        </div>

                        <div className="flex items-center space-x-2">
                            <Switch
                                id="can_publish"
                                checked={data.can_publish}
                                onCheckedChange={(checked) => setData('can_publish', checked)}
                            />
                            <Label htmlFor="can_publish">Publishing Rights</Label>
                            {errors.can_publish && <p className="text-red-500 text-xs mt-1">{errors.can_publish}</p>}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password">New Password (optional)</Label>
                            <Input
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                            />
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                        </div>

                        <div className="flex items-center gap-4">
                            <Button type="submit" disabled={processing}>Update Editor</Button>
                            <Link href={route('editors.index')}>
                                <Button variant="outline">Cancel</Button>
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </AdminLayout>
    );
}
