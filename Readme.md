# Event Planner Capstone Project

## Project Description and Purpose

**What problem does your project solve?**  
This Event Planner helps users organize and manage events with features like creating events, tracking details (date, time, location), and managing their event calendar.

**Who is the target user?**  
Anyone who needs to organize events - from personal gatherings to professional meetings. Students, event coordinators, and busy professionals.

**What makes it interesting or unique?**  
Full-stack serverless architecture using AWS DynamoDB for scalability, with a modern React frontend styled with Tailwind CSS.

---

## Planned Backend

**Current Implementation:** Express.js + AWS DynamoDB  
**Alternative:** AWS Lambda + API Gateway + DynamoDB (configured but CORS pending)

### Main Models/Tables (DynamoDB)

**Events Table:**
- `eventId` (String, Partition Key) - Unique identifier
- `name` (String) - Event name
- `date` (String) - Event date
- `time` (String) - Event time
- `location` (String) - Event location
- `createdAt` (String) - Timestamp

### API Routes and Methods

**Express Backend (Port 3000):**
- `GET    /api/events` → Fetch all events
- `POST   /api/events` → Create a new event
- `DELETE /api/events/:eventId` → Delete an event by ID

**Lambda API (Configured):**
- Same routes available at: `https://xk7wr3rd0d.execute-api.us-east-1.amazonaws.com/default/My-Eventapi`

---

## Frontend Features and Pages

**Technology Stack:** React 19 + Vite 7 + Tailwind CSS 4

**Current Pages:**
- **Home/Calendar Page** - Main event calendar interface
  - Display all events
  - Add new events form
  - Delete events functionality
  - Loading states and error handling

**Features:**
- Responsive design with Tailwind CSS
- Real-time event management
- Form validation (required fields)
- Error handling with user feedback

---

## Authentication Flow

**Status:** ⚠️ NOT YET IMPLEMENTED

**Planned:**
- JWT-based authentication OR Amazon Cognito
- Protected routes for creating/deleting events
- User-specific event management

---

## Deployment Plan

**Frontend:**
- Platform: Vercel or AWS S3 + CloudFront
- Build: `npm run build` (Vite production build)
- URL: TBD

**Backend:**
- Current: Running locally on `http://localhost:3000`
- Target: AWS Lambda + API Gateway OR Render/Heroku
- Database: AWS DynamoDB (us-east-1) - ✅ DEPLOYED

**Environment Variables:**
- `AWS_REGION`
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`

---

## NPM Libraries Used

**Backend:**
- `express` - Web framework
- `cors` - CORS middleware
- `aws-sdk` - AWS DynamoDB integration
- `dotenv` - Environment variable management

**Frontend:**
- `react` - UI framework
- `vite` - Build tool
- `tailwindcss` - CSS framework
- `@tailwindcss/postcss` - Tailwind PostCSS plugin

---

## Project Structure

```
event-planner-capstone/
├── Event backend/
│   ├── index.js              # Express server
│   ├── setup-dynamodb.js     # DynamoDB helper functions
│   ├── .env                  # AWS credentials (gitignored)
│   └── package.json
├── Frontend Event-planner/
│   ├── src/
│   │   ├── App.jsx           # Main React component
│   │   ├── App.css
│   │   ├── index.css         # Tailwind imports
│   │   └── main.jsx
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
├── .gitignore
└── README.md                 # This file (serves as capstone-plan.md)
```

---

## Setup Instructions

### Prerequisites
- Node.js 18+
- AWS Account with DynamoDB access
- AWS IAM credentials

### Backend Setup
```bash
cd "Event backend"
npm install
# Create .env file with AWS credentials
node index.js
# Server runs on http://localhost:3000
```

### Frontend Setup
```bash
cd "Frontend Event-planner"
npm install
npm run dev
# App runs on http://localhost:5173
```

### Database Setup
DynamoDB table "Events" is already created in AWS us-east-1 region.

---

## Current Status

✅ **Completed:**
- DynamoDB table setup
- Express backend with CRUD operations
- React frontend with Tailwind CSS
- Event creation, viewing, and deletion
- Error handling and loading states

⚠️ **In Progress / TODO:**
- Authentication implementation
- Protected routes
- Backend deployment (Lambda or Render)
- Frontend deployment (Vercel or S3)
- Input validation improvements
- User-specific events

---

## Running the Application

1. **Start Backend:**
   ```bash
   cd "Event backend" && node index.js
   ```

2. **Start Frontend:**
   ```bash
   cd "Frontend Event-planner" && npm run dev
   ```

3. **Access:** http://localhost:5173

---

## API Documentation

### GET /api/events
Fetches all events from DynamoDB.

**Response:**
```json
[
  {
    "eventId": "1762908675305",
    "name": "Team Meeting",
    "date": "2025-11-15",
    "time": "10:00 AM",
    "location": "Conference Room A",
    "createdAt": "2025-11-12T00:51:15.305Z"
  }
]
```

### POST /api/events
Creates a new event.

**Request Body:**
```json
{
  "name": "Event Name",
  "date": "2025-11-15",
  "time": "10:00 AM",
  "location": "Location"
}
```

### DELETE /api/events/:eventId
Deletes an event by ID.

---

## License
MIT
