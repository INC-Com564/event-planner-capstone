# AWS Cognito Setup Guide for Event Planner

## 📋 Overview
This guide walks you through setting up AWS Cognito authentication for your Event Planner capstone project.

---

## ✅ What We've Done So Far

1. ✅ Installed `aws-amplify` package
2. ✅ Created Amplify configuration file (`src/amplifyConfig.js`)
3. ✅ Created authentication component (`src/Auth.jsx`)
4. ✅ Updated App.jsx to handle authentication
5. ✅ Added environment variables template

---

## 🚀 What You Need to Do

### Step 1: Create Cognito User Pool in AWS Console

1. **Go to AWS Cognito:**
   - Navigate to: https://console.aws.amazon.com/cognito/
   - Make sure you're in **us-east-1** region

2. **Click "Create user pool"**

3. **Configure Sign-in Experience (Step 1 of 6):**
   - ✅ Check **"Email"** under "Cognito user pool sign-in options"
   - Click **Next**

4. **Configure Security Requirements (Step 2 of 6):**
   - Password policy: **Cognito defaults** (or customize as needed)
   - Multi-factor authentication: **No MFA** (for simplicity)
   - User account recovery: ✅ **Enable self-service account recovery**
   - Recovery method: **Email only**
   - Click **Next**

5. **Configure Sign-up Experience (Step 3 of 6):**
   - ✅ Enable **"Self-service sign-up"**
   - Attribute verification: ✅ **"Send email message, verify email address"**
   - Required attributes: Select **"name"** (optional)
   - Click **Next**

6. **Configure Message Delivery (Step 4 of 6):**
   - Email provider: **Send email with Cognito** (free tier - 50 emails/day limit)
   - Click **Next**

7. **Integrate Your App (Step 5 of 6):**
   - User pool name: `event-planner-users`
   - ❌ Uncheck **"Use the Cognito Hosted UI"** (we built custom auth pages)
   
   **Initial app client:**
   - App client name: `event-planner-web-client`
   - Client secret: **"Don't generate a client secret"** ⚠️ IMPORTANT
   - Authentication flows: Check these two:
     - ✅ **ALLOW_USER_PASSWORD_AUTH**
     - ✅ **ALLOW_REFRESH_TOKEN_AUTH**
   - Click **Next**

8. **Review and Create (Step 6 of 6):**
   - Review all settings
   - Click **"Create user pool"**

9. **📝 SAVE THESE VALUES:**
   After creation, you'll see:
   - **User Pool ID:** `us-east-1_XXXXXXXXX` (copy this!)
   - Click on the app client name to get:
   - **App Client ID:** `abcdefg1234567890` (copy this!)

---

### Step 2: Update Environment Variables

Open `.env.local` and replace the placeholder values:

```bash
# Replace XXXXXXXXX with your actual User Pool ID
VITE_COGNITO_USER_POOL_ID=us-east-1_XXXXXXXXX

# Replace with your actual Client ID
VITE_COGNITO_CLIENT_ID=abcdefg1234567890

VITE_AWS_REGION=us-east-1
VITE_API_URL=https://event-planner-capstone.onrender.com/api
```

---

### Step 3: Test Locally

1. **Start the dev server:**
   ```bash
   npm run dev
   ```

2. **Open browser:** http://localhost:5173

3. **Test the authentication flow:**
   - Click "Sign Up"
   - Enter name, email, password (must meet requirements)
   - Check email for confirmation code
   - Enter confirmation code
   - Sign in with email and password
   - You should see the Event Calendar!

---

### Step 4: Deploy to Production

After testing locally:

```bash
# Build production bundle
npm run build

# Deploy to S3
aws s3 sync dist/ s3://event-plan/ --delete

# Test deployed site
open http://event-plan.s3-website-us-east-1.amazonaws.com
```

---

## 🎯 Features Included

✅ **Sign Up** - New users can create accounts
✅ **Email Verification** - Confirmation code sent to email
✅ **Sign In** - Existing users can log in
✅ **Sign Out** - Users can log out
✅ **Protected Routes** - Must be logged in to see events
✅ **Session Management** - Stays logged in after refresh

---

## 🔒 Security Notes

- Passwords must have: 8+ chars, uppercase, lowercase, number, special character
- Email verification required before login
- Tokens stored securely by AWS Amplify
- HTTPS required in production

---

## ⚠️ Important Reminders

1. **Don't commit `.env.local`** - It's already in .gitignore
2. **Use VITE_ prefix** - Required for Vite to expose variables to browser
3. **No client secret** - Public web apps don't need it
4. **Free tier limits** - 50 emails/day for verification codes

---

## 🐛 Troubleshooting

**"User does not exist"**
- Make sure you confirmed your email with the verification code

**"Incorrect username or password"**
- Email is case-sensitive
- Password must meet requirements

**"User already exists"**
- Use a different email or sign in instead

**Environment variables not loading**
- Restart dev server after changing `.env.local`
- Make sure variables start with `VITE_`

---

## 📚 Next Steps

After Cognito is working:

1. ✅ Update backend to filter events by user
2. ✅ Add user ID to event records in DynamoDB
3. ✅ Update README.md to document authentication
4. ✅ Test full deployment

---

## 📞 Need Help?

- AWS Cognito Docs: https://docs.aws.amazon.com/cognito/
- AWS Amplify Docs: https://docs.amplify.aws/
- Vite Env Vars: https://vite.dev/guide/env-and-mode.html
