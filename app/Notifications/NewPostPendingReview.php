<?php

namespace App\Notifications;

use App\Models\Post;
use App\Models\User;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewPostPendingReview extends Notification
{

    public $post;
    public $author;

    /**
     * Create a new notification instance.
     */
    public function __construct(Post $post, User $author)
    {
        $this->post = $post;
        $this->author = $author;
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
        $url = route('admin.posts.edit', $this->post->slug);
        
        return (new MailMessage)
            ->subject('New Post Pending Review: ' . $this->post->title)
            ->markdown('emails.post-pending-review', [
                'post' => $this->post,
                'author' => $this->author,
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
            'author_name' => $this->author->name,
        ];
    }
}
