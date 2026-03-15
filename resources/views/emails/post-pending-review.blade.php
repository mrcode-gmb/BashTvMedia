<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Post Pending Review</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 0;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
                    
                    {{-- Header with Logo --}}
                    <tr>
                        <td style="background: linear-gradient(135deg, #1a1f2e 0%, #2d3748 100%); padding: 40px 30px; text-align: center;">
                            <img src="{{ asset('images/logo.jpg') }}" alt="{{ config('app.name') }}" style="max-width: 120px; height: auto; border-radius: 12px; margin-bottom: 20px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
                            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">{{ config('app.name') }}</h1>
                        </td>
                    </tr>

                    {{-- Content --}}
                    <tr>
                        <td style="padding: 40px 30px;">
                            <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 16px; border-radius: 6px; margin-bottom: 30px;">
                                <h2 style="color: #856404; margin: 0 0 8px 0; font-size: 20px; font-weight: 600;">📝 New Post Awaiting Review</h2>
                                <p style="color: #856404; margin: 0; font-size: 14px;">Action required from editorial team</p>
                            </div>

                            <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                                Hello Admin,
                            </p>

                            <p style="color: #555555; font-size: 15px; line-height: 1.6; margin: 0 0 30px 0;">
                                A new post has been submitted for review by <strong style="color: #f0a500;">{{ $author->name }}</strong>. Please review and approve or provide feedback.
                            </p>

                            {{-- Post Details Card --}}
                            <div style="background-color: #f8f9fa; border-radius: 8px; padding: 24px; margin-bottom: 30px;">
                                <h3 style="color: #333333; margin: 0 0 20px 0; font-size: 18px; font-weight: 600; border-bottom: 2px solid #f0a500; padding-bottom: 10px;">Post Details</h3>
                                
                                <table width="100%" cellpadding="8" cellspacing="0">
                                    <tr>
                                        <td style="color: #666666; font-size: 14px; font-weight: 600; width: 30%;">Title:</td>
                                        <td style="color: #333333; font-size: 14px;">{{ $post->title }}</td>
                                    </tr>
                                    <tr>
                                        <td style="color: #666666; font-size: 14px; font-weight: 600;">Author:</td>
                                        <td style="color: #333333; font-size: 14px;">{{ $author->name }}</td>
                                    </tr>
                                    <tr>
                                        <td style="color: #666666; font-size: 14px; font-weight: 600;">Category:</td>
                                        <td style="color: #333333; font-size: 14px;">{{ $post->category->name ?? 'Uncategorized' }}</td>
                                    </tr>
                                    <tr>
                                        <td style="color: #666666; font-size: 14px; font-weight: 600;">Submitted:</td>
                                        <td style="color: #333333; font-size: 14px;">{{ $post->created_at->format('F j, Y \a\t g:i a') }}</td>
                                    </tr>
                                </table>

                                <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #dee2e6;">
                                    <p style="color: #666666; font-size: 13px; font-weight: 600; margin: 0 0 8px 0;">EXCERPT:</p>
                                    <p style="color: #555555; font-size: 14px; line-height: 1.6; margin: 0; font-style: italic;">
                                        {{ Str::limit(strip_tags($post->content), 200) }}
                                    </p>
                                </div>
                            </div>

                            {{-- CTA Button --}}
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td align="center" style="padding: 20px 0;">
                                        <a href="{{ $url }}" style="display: inline-block; background: linear-gradient(135deg, #f0a500 0%, #d99200 100%); color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 8px; font-size: 16px; font-weight: 600; box-shadow: 0 4px 12px rgba(240, 165, 0, 0.4);">
                                            Review Post Now →
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            <p style="color: #999999; font-size: 13px; line-height: 1.6; margin: 30px 0 0 0; text-align: center;">
                                This post is waiting for your review. Please take action within 24-48 hours.
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
