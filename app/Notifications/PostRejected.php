<?php

namespace App\Notifications;

use App\Models\Post;
use App\Models\User;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class PostRejected extends Notification
{

    public $post;
    public $rejectedBy;
    public $reason;

    /**
     * Create a new notification instance.
     */
    public function __construct(Post $post, User $rejectedBy, $reason = null)
    {
        $this->post = $post;
        $this->rejectedBy = $rejectedBy;
        $this->reason = $reason;
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
        $url = route('editor.posts.edit', $this->post->id);
        
        return (new MailMessage)
            ->subject('Your Post Has Been Rejected: ' . $this->post->title)
            ->markdown('emails.post-rejected', [
                'post' => $this->post,
                'rejectedBy' => $this->rejectedBy,
                'author' => $notifiable,
                'reason' => $this->reason,
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
            'rejected_by' => $this->rejectedBy->name,
            'reason' => $this->reason,
        ];
    }
}
