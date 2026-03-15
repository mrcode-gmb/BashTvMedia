<?php

namespace App\Notifications;

use App\Models\User;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class WelcomeUserNotification extends Notification
{
    public $user;
    public $password;
    public $createdBy;

    /**
     * Create a new notification instance.
     */
    public function __construct(User $user, string $password, User $createdBy)
    {
        $this->user = $user;
        $this->password = $password;
        $this->createdBy = $createdBy;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable)
    {
        $loginUrl = route('login');
        
        return (new MailMessage)
            ->subject('Welcome to ' . config('app.name') . ' - Your Account Details')
            ->markdown('emails.welcome-user', [
                'user' => $this->user,
                'password' => $this->password,
                'createdBy' => $this->createdBy,
                'loginUrl' => $loginUrl,
            ]);
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'user_id' => $this->user->id,
            'user_name' => $this->user->name,
            'created_by' => $this->createdBy->name,
        ];
    }
}
