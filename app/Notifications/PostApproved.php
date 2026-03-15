<?php

namespace App\Notifications;

use App\Models\Post;
use App\Models\User;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class PostApproved extends Notification
{

    public $post;
    public $approvedBy;

    /**
     * Create a new notification instance.
     */
    public function __construct(Post $post, User $approvedBy)
    {
        $this->post = $post;
        $this->approvedBy = $approvedBy;
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
        $url = route('posts.show.full', $this->post->slug);
        
        return (new MailMessage)
            ->subject('Your Post Has Been Approved: ' . $this->post->title)
            ->markdown('emails.post-approved', [
                'post' => $this->post,
                'approvedBy' => $this->approvedBy,
                'author' => $notifiable,
                'url' => $url,
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
            'post_id' => $this->post->id,
            'post_title' => $this->post->title,
            'approved_by' => $this->approvedBy->name,
        ];
    }
}
