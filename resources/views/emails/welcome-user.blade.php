<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to {{ config('app.name') }}</title>
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

                    {{-- Welcome Banner --}}
                    <tr>
                        <td style="padding: 0;">
                            <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 30px; text-align: center;">
                                <div style="font-size: 48px; margin-bottom: 10px;">👋</div>
                                <h2 style="color: #92400e; margin: 0; font-size: 24px; font-weight: 700;">Welcome to the Team!</h2>
                                <p style="color: #b45309; margin: 8px 0 0 0; font-size: 16px;">Your account has been created successfully</p>
                            </div>
                        </td>
                    </tr>

                    {{-- Content --}}
                    <tr>
                        <td style="padding: 40px 30px;">
                            <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                                Hello <strong style="color: #f0a500;">{{ $user->name }}</strong>,
                            </p>

                            <p style="color: #555555; font-size: 15px; line-height: 1.6; margin: 0 0 30px 0;">
                                Your account has been created by <strong>{{ $createdBy->name }}</strong>. You can now access the {{ config('app.name') }} platform with your credentials below.
                            </p>

                            {{-- Login Credentials Card --}}
                            <div style="background-color: #fffbeb; border: 2px solid #f0a500; border-radius: 8px; padding: 24px; margin-bottom: 30px;">
                                <h3 style="color: #1a1f2e; margin: 0 0 20px 0; font-size: 18px; font-weight: 600; border-bottom: 2px solid #f0a500; padding-bottom: 10px;">🔐 Your Login Credentials</h3>
                                
                                <table width="100%" cellpadding="12" cellspacing="0">
                                    <tr>
                                        <td style="color: #92400e; font-size: 14px; font-weight: 600; width: 35%;">Email:</td>
                                        <td style="color: #1a1f2e; font-size: 14px; font-family: monospace; background-color: #ffffff; padding: 8px; border-radius: 4px;">{{ $user->email }}</td>
                                    </tr>
                                    <tr>
                                        <td style="color: #92400e; font-size: 14px; font-weight: 600;">Password:</td>
                                        <td style="color: #1a1f2e; font-size: 14px; font-family: monospace; background-color: #ffffff; padding: 8px; border-radius: 4px;">{{ $password }}</td>
                                    </tr>
                                    <tr>
                                        <td style="color: #92400e; font-size: 14px; font-weight: 600;">Role:</td>
                                        <td>
                                            <span style="background-color: #f0a500; color: #ffffff; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600; text-transform: uppercase;">{{ $user->role }}</span>
                                        </td>
                                    </tr>
                                </table>
                            </div>

                            {{-- Security Notice --}}
                            <div style="background-color: #fef2f2; border-left: 4px solid #ef4444; border-radius: 6px; padding: 16px; margin-bottom: 30px;">
                                <h4 style="color: #991b1b; margin: 0 0 8px 0; font-size: 14px; font-weight: 600;">🔒 Important Security Notice</h4>
                                <p style="color: #7f1d1d; font-size: 13px; line-height: 1.6; margin: 0;">
                                    For security reasons, please change your password immediately after your first login. Go to your profile settings to update your password.
                                </p>
                            </div>

                            {{-- CTA Button --}}
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td align="center" style="padding: 20px 0;">
                                        <a href="{{ $loginUrl }}" style="display: inline-block; background: linear-gradient(135deg, #f0a500 0%, #d99200 100%); color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 8px; font-size: 16px; font-weight: 600; box-shadow: 0 4px 12px rgba(240, 165, 0, 0.4);">
                                            Login to Your Account →
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            {{-- Getting Started Section --}}
                            <div style="background-color: #f0fdf4; border-radius: 8px; padding: 24px; margin-top: 30px;">
                                <h4 style="color: #065f46; margin: 0 0 16px 0; font-size: 16px; font-weight: 600;">🚀 Getting Started:</h4>
                                <ul style="color: #047857; font-size: 14px; line-height: 1.8; margin: 0; padding-left: 20px;">
                                    <li>Login with your credentials above</li>
                                    <li>Change your password in profile settings</li>
                                    <li>Complete your profile information</li>
                                    @if($user->role === 'editor')
                                    <li>Start creating and submitting posts for review</li>
                                    <li>Familiarize yourself with the editorial guidelines</li>
                                    @elseif($user->role === 'admin')
                                    <li>Explore the admin dashboard</li>
                                    <li>Review pending posts and manage content</li>
                                    @endif
                                </ul>
                            </div>

                            {{-- Help Section --}}
                            <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin-top: 20px;">
                                <p style="color: #666666; font-size: 13px; font-weight: 600; margin: 0 0 10px 0;">📚 Need Help?</p>
                                <p style="color: #666666; font-size: 13px; line-height: 1.6; margin: 0;">
                                    If you have any questions or need assistance, please contact:<br>
                                    • <a href="mailto:news@bashtvmedia.com" style="color: #f0a500; text-decoration: none;">news@bashtvmedia.com</a><br>
                                    • Visit our <a href="{{ config('app.url') }}/help" style="color: #f0a500; text-decoration: none;">Help Center</a>
                                </p>
                            </div>

                            <p style="color: #f0a500; font-size: 15px; line-height: 1.6; margin: 30px 0 0 0; text-align: center; font-weight: 600;">
                                Welcome aboard! We're excited to have you on the team.
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
