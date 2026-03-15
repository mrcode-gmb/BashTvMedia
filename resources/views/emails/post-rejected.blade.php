<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Post Requires Revision</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 0;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
                    
                    {{-- Header with Logo --}}
                    <tr>
                        <td style="background: linear-gradient(135deg, #1a1f2e 0%, #2d3748 100%); padding: 40px 30px; text-align: center;">
                            <img src="{{ asset('bashTvMedia.jpeg') }}" alt="{{ config('app.name') }}" style="max-width: 120px; height: auto; border-radius: 12px; margin-bottom: 20px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
                            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">{{ config('app.name') }}</h1>
                        </td>
                    </tr>

                    {{-- Info Banner --}}
                    <tr>
                        <td style="padding: 0;">
                            <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 30px; text-align: center;">
                                <div style="font-size: 48px; margin-bottom: 10px;">📝</div>
                                <h2 style="color: #92400e; margin: 0; font-size: 24px; font-weight: 700;">Revision Requested</h2>
                                <p style="color: #b45309; margin: 8px 0 0 0; font-size: 16px;">Your post needs some improvements</p>
                            </div>
                        </td>
                    </tr>

                    {{-- Content --}}
                    <tr>
                        <td style="padding: 40px 30px;">
                            <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                                Hello <strong style="color: #f0a500;">{{ $author->name }}</strong>,
                            </p>

                            <p style="color: #555555; font-size: 15px; line-height: 1.6; margin: 0 0 30px 0;">
                                Your post <strong>"{{ $post->title }}"</strong> has been reviewed by <strong>{{ $rejectedBy->name }}</strong>. While we appreciate your effort, it requires some revisions before it can be published.
                            </p>

                            {{-- Post Details Card --}}
                            <div style="background-color: #fffbeb; border: 2px solid #f0a500; border-radius: 8px; padding: 24px; margin-bottom: 30px;">
                                <h3 style="color: #1a1f2e; margin: 0 0 20px 0; font-size: 18px; font-weight: 600; border-bottom: 2px solid #f0a500; padding-bottom: 10px;">📋 Post Details</h3>
                                
                                <table width="100%" cellpadding="8" cellspacing="0">
                                    <tr>
                                        <td style="color: #92400e; font-size: 14px; font-weight: 600; width: 35%;">Title:</td>
                                        <td style="color: #1a1f2e; font-size: 14px;">{{ $post->title }}</td>
                                    </tr>
                                    <tr>
                                        <td style="color: #92400e; font-size: 14px; font-weight: 600;">Category:</td>
                                        <td style="color: #1a1f2e; font-size: 14px;">{{ $post->category->name ?? 'Uncategorized' }}</td>
                                    </tr>
                                    <tr>
                                        <td style="color: #92400e; font-size: 14px; font-weight: 600;">Submitted:</td>
                                        <td style="color: #1a1f2e; font-size: 14px;">{{ $post->created_at->format('F j, Y \a\t g:i a') }}</td>
                                    </tr>
                                    <tr>
                                        <td style="color: #92400e; font-size: 14px; font-weight: 600;">Reviewed:</td>
                                        <td style="color: #1a1f2e; font-size: 14px;">{{ now()->format('F j, Y \a\t g:i a') }}</td>
                                    </tr>
                                    <tr>
                                        <td style="color: #92400e; font-size: 14px; font-weight: 600;">Status:</td>
                                        <td>
                                            <span style="background-color: #f59e0b; color: #ffffff; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600;">⚠ NEEDS REVISION</span>
                                        </td>
                                    </tr>
                                </table>
                            </div>

                            {{-- Feedback Section --}}
                            <div style="background-color: #fef2f2; border-left: 4px solid #ef4444; border-radius: 6px; padding: 20px; margin-bottom: 30px;">
                                <h4 style="color: #991b1b; margin: 0 0 12px 0; font-size: 16px; font-weight: 600;">💬 Reviewer Feedback:</h4>
                                <p style="color: #7f1d1d; font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap;">@if($reason){{ $reason }}@else
No specific feedback was provided. Please contact the editorial team for more details on the required changes.@endif</p>
                            </div>

                            {{-- CTA Button --}}
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td align="center" style="padding: 20px 0;">
                                        <a href="{{ $url }}" style="display: inline-block; background: linear-gradient(135deg, #f0a500 0%, #d99200 100%); color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 8px; font-size: 16px; font-weight: 600; box-shadow: 0 4px 12px rgba(240, 165, 0, 0.4);">
                                            Edit & Resubmit Post →
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            {{-- Encouragement Section --}}
                            <div style="background-color: #f0fdf4; border-radius: 8px; padding: 24px; margin-top: 30px;">
                                <h4 style="color: #065f46; margin: 0 0 16px 0; font-size: 16px; font-weight: 600;">💪 Don't Be Discouraged!</h4>
                                <p style="color: #047857; font-size: 14px; line-height: 1.6; margin: 0 0 16px 0;">
                                    Every great writer faces revisions. This is an opportunity to improve your content and make it even better!
                                </p>
                                <p style="color: #047857; font-size: 14px; font-weight: 600; margin: 0 0 12px 0;">What's Next?</p>
                                <ul style="color: #047857; font-size: 14px; line-height: 1.8; margin: 0; padding-left: 20px;">
                                    <li>Review the feedback carefully</li>
                                    <li>Make the necessary revisions to your post</li>
                                    <li>Resubmit for review when ready</li>
                                    <li>Contact the editorial team if you need clarification</li>
                                </ul>
                            </div>

                            {{-- Help Resources --}}
                            <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin-top: 20px;">
                                <p style="color: #666666; font-size: 13px; font-weight: 600; margin: 0 0 10px 0;">📚 Need Help?</p>
                                <p style="color: #666666; font-size: 13px; line-height: 1.6; margin: 0;">
                                    • Review our <a href="{{ config('app.url') }}/guidelines" style="color: #f0a500; text-decoration: none;">content guidelines</a><br>
                                    • Contact the <a href="{{ config('app.url') }}/contact" style="color: #f0a500; text-decoration: none;">editorial team</a> for clarification<br>
                                    • Check out our <a href="{{ config('app.url') }}/writing-tips" style="color: #f0a500; text-decoration: none;">writing tips</a> and best practices
                                </p>
                            </div>

                            <p style="color: #f0a500; font-size: 15px; line-height: 1.6; margin: 30px 0 0 0; text-align: center; font-weight: 600;">
                                We look forward to seeing your improved post!
                            </p>
                        </td>
                    </tr>

                    {{-- Footer --}}
                    <tr>
                        <td style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #dee2e6;">
                            <p style="color: #999999; font-size: 13px; margin: 0 0 10px 0;">
                                © {{ date('Y') }} {{ config('app.name') }}. All rights reserved.
                            </p>
                            <p style="color: #999999; font-size: 12px; margin: 0;">
                                <a href="{{ config('app.url') }}" style="color: #f0a500; text-decoration: none;">Visit Website</a> | 
                                <a href="{{ config('app.url') }}/dashboard" style="color: #f0a500; text-decoration: none;">Dashboard</a> | 
                                <a href="{{ config('app.url') }}/contact" style="color: #f0a500; text-decoration: none;">Contact Us</a>
                            </p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>
