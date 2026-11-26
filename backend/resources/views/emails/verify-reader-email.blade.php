<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Verify Your MediaOS Reader Account</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; padding: 40px 20px; margin: 0;">
    <div style="max-width: 520px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; padding: 36px 32px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
        <div style="text-align: center; margin-bottom: 28px;">
            <div style="display: inline-block; width: 44px; height: 44px; line-height: 44px; background: #2563eb; color: #ffffff; font-weight: bold; font-size: 20px; border-radius: 12px;">M</div>
            <h2 style="font-size: 20px; font-weight: 700; color: #0f172a; margin: 16px 0 6px 0;">Verify Your Reader Account</h2>
            <p style="font-size: 13px; color: #64748b; margin: 0;">Welcome to MediaOS, <?php echo e($user->name); ?>!</p>
        </div>

        <p style="font-size: 14px; line-height: 1.6; color: #334155;">
            Thank you for registering. Please enter the 6-digit verification code below, or click the direct verification button to activate your <strong>Verified Reader</strong> badge.
        </p>

        <!-- 6-Digit Code Display -->
        <div style="background: #f1f5f9; border-radius: 12px; padding: 18px; text-align: center; margin: 24px 0;">
            <span style="font-size: 11px; text-transform: uppercase; font-weight: 600; letter-spacing: 0.05em; color: #64748b; display: block; margin-bottom: 6px;">Your 6-Digit Verification Code</span>
            <span style="font-family: 'SF Mono', Consolas, Monaco, monospace; font-size: 32px; font-weight: 800; letter-spacing: 8px; color: #2563eb;"><?php echo e($code); ?></span>
        </div>

        <!-- 1-Click Verification Button -->
        <div style="text-align: center; margin: 28px 0 20px 0;">
            <a href="<?php echo e($verifyUrl); ?>" style="display: inline-block; background: #2563eb; color: #ffffff; text-decoration: none; font-size: 13px; font-weight: 600; padding: 12px 28px; border-radius: 8px; box-shadow: 0 2px 4px rgba(37, 99, 235, 0.2);">
                Verify Email Address Directly
            </a>
        </div>

        <p style="font-size: 12px; color: #94a3b8; text-align: center; margin-top: 24px; line-height: 1.5;">
            This verification code will remain valid for <strong>120 seconds (2 minutes)</strong>.<br>
            If you did not request this account, you can safely ignore this email.
        </p>
    </div>
</body>
</html>
