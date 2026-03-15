# 🚀 Queue Setup Guide - Email Notifications

## ✅ ISSUE IDENTIFIED

Your emails **ARE being created and queued** successfully! However, they're not being sent because **the queue worker is not running**.

### What's Happening:
1. ✅ Editor creates post → Notification added to queue
2. ✅ Notification class works correctly
3. ❌ **Queue worker is not running** → Emails stay in queue
4. ❌ Emails never get sent

---

## 🔧 SOLUTION: Start the Queue Worker

### Option 1: For Development (Quick Test)
Run this command in a separate terminal:

```bash
cd /var/www/html/Pantamitimes
php artisan queue:work
```

**Keep this terminal open** while testing. The queue worker will process emails in real-time.

---

### Option 2: For Development (Alternative - Sync Queue)
If you don't want to run a queue worker during development, change your `.env`:

```env
QUEUE_CONNECTION=sync
```

Then run:
```bash
php artisan config:clear
```

This will send emails **immediately** without queuing (good for development, not for production).

---

### Option 3: For Production (Supervisor)

Create a supervisor configuration file:

```bash
sudo nano /etc/supervisor/conf.d/pantamitimes-worker.conf
```

Add this content:

```ini
[program:pantamitimes-worker]
process_name=%(program_name)s_%(process_num)02d
command=php /var/www/html/Pantamitimes/artisan queue:work --sleep=3 --tries=3 --max-time=3600
autostart=true
autorestart=true
stopasgroup=true
killasgroup=true
user=www-data
numprocs=2
redirect_stderr=true
stdout_logfile=/var/www/html/Pantamitimes/storage/logs/worker.log
stopwaitsecs=3600
```

Then run:

```bash
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start pantamitimes-worker:*
```

---

## 🧪 Testing Your Email System

### Step 1: Start Queue Worker (Choose one option above)

For quick testing, use:
```bash
php artisan queue:work
```

### Step 2: Create a Test Post

1. Login as an editor
2. Create a new post
3. Submit it

### Step 3: Check Results

**In the terminal running queue:work**, you should see:
```
Processing: App\Notifications\NewPostPendingReview
Processed:  App\Notifications\NewPostPendingReview
```

**In Mailtrap** (https://mailtrap.io/):
- Login to your account
- Check your inbox
- You should see the email!

---

## 📊 Queue Commands Reference

```bash
# Start queue worker (keeps running)
php artisan queue:work

# Process one job and stop
php artisan queue:work --once

# View failed jobs
php artisan queue:failed

# Retry failed jobs
php artisan queue:retry all

# Clear all jobs from queue
php artisan queue:clear

# Monitor queue in real-time
php artisan queue:monitor

# Check queue status
php artisan queue:listen
```

---

## 🎯 Quick Fix Summary

**The fastest solution for testing:**

1. Open a new terminal
2. Run: `cd /var/www/html/Pantamitimes && php artisan queue:work`
3. Keep it running
4. Create a post as editor
5. Check Mailtrap inbox

**Your emails WILL work!** The code is correct, you just need the queue worker running.

---

## ✅ Verification Checklist

- [x] Slug is now unique (uses timestamp)
- [x] Email notification code is correct
- [x] Admin user exists in database
- [x] Mail configuration is correct (Mailtrap)
- [x] Notification classes are properly configured
- [ ] **Queue worker needs to be running** ← THIS IS THE ISSUE!

---

## 💡 Pro Tip

For development, I recommend using `QUEUE_CONNECTION=sync` in your `.env` file. This way, emails send immediately without needing a queue worker running.

For production, always use `database` or `redis` queue with Supervisor to ensure reliability.
