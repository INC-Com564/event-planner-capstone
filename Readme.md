Project Description and Purpose

What problem does your project solve?  
It's an Event Planner (create events, holidays, RSVP, reminders).

Who is the target user?  


What makes it interesting or unique?  




Planned Backend

AWS Lambda + API Gateway + DynamoDB

Main Models/Tables (DynamoDB Items)

- Event data, User data, RSVP status, Reminders, Holidays

API Routes and Methods

- `POST   /Events` &nbsp;&nbsp;&nbsp;→ create a new event  
- `PUT    /Events/:id` &nbsp;→ edit an event  
- `DELETE /Events/:id` → delete an event  

---

Frontend Features and Pages

Pages your frontend will include:

- Home page with featured content
- Login page
- Dashboard (shows user data)
- Calendar

--

Authentication Flow

- Will users log in with email/password (JWT)?
- Or will you use Amazon Cognito or another OIDC provider?
- Which routes/pages will be protected?
- <!-- Answer the above or add notes here. -->

---

Deployment Plan

- Frontend: AWS S3 + CloudFront
- Backend: AWS Lambda + API Gateway
- Database: DynamoDB

---

 Project Structure

```
Capstone-api/
├── capstone-plan.md
├── src/
│   ├── Frontend/
│   │   ├── Apps.jsx
│   │   ├── Apps.css
│   │   ├── index.css
│   │   └── Main.jsx
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── AWS set up
```
