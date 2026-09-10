# 🚀 Render.com Deployment Guide

## Step-by-Step Instructions

### 1️⃣ GitHub Push (Already Done)
Your code is already on GitHub. ✅

---

### 2️⃣ Render Dashboard Settings

When you connect your GitHub repo to Render, use these **exact settings**:

#### **Basic Settings:**
```
Name: pinnacle-studio-demo
Region: Singapore (or closest to you)
Branch: main (or your default branch)
Root Directory: (leave blank)
```

#### **Build & Deploy Settings:**

**Environment:**
```
Node
```

**Build Command:**
```bash
npm install && npm run build
```

**Start Command:**
```bash
npm start
```

**Node Version:**
```
20.11.0
```

---

### 3️⃣ Environment Variables (Optional)

Add these if needed:

```
NODE_ENV = production
NODE_VERSION = 20.11.0
```

---

### 4️⃣ Advanced Settings

**Auto-Deploy:**
✅ Yes (Enable automatic deploys from GitHub)

**Health Check Path:**
```
/
```

---

## 🔧 Common Issues & Fixes

### Issue 1: "404 Not Found" on page refresh
**Fix:** Already handled! Next.js routing will work properly.

### Issue 2: Build timeout
**Fix:** In Render dashboard, go to Settings → increase build timeout to 15 minutes

### Issue 3: Out of memory during build
**Fix:** Upgrade to paid plan (Free tier has 512MB RAM limit)

---

## 📋 Deployment Checklist

Before deploying, make sure:

- [x] Code pushed to GitHub
- [x] `package.json` has correct scripts
- [x] `next.config.ts` has `output: 'standalone'`
- [x] No hardcoded `localhost` URLs in code
- [x] All environment variables set (if any)

---

## 🎯 After Deployment

1. **Wait 5-10 minutes** for first build
2. **Check logs** if build fails
3. **Test all pages** after deployment
4. **Share the live URL** with client! 🎉

---

## 🔗 Your Live URL Will Be:

```
https://pinnacle-studio-demo.onrender.com
```

(Or whatever name you choose)

---

## 💡 Pro Tips

1. **Free tier sleeps after 15 min inactivity** - first load will be slow
2. **Paid tier ($7/month)** - no sleep, faster, more RAM
3. **Custom domain** available on paid plans
4. **Auto-deploy** from GitHub on every push

---

## 🆘 If Something Goes Wrong

**Check Build Logs:**
Render Dashboard → Your Service → Logs tab

**Common errors:**
- Missing dependencies → Check `package.json`
- Build timeout → Increase timeout in settings
- Memory error → Upgrade plan

---

**Good luck bhai! 🚀**
