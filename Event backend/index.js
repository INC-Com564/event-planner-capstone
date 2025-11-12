import express from "express";
import cors from "cors";
import { addEvent, getAllEvents, deleteEvent } from "./setup-dynamodb.js";

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
    res.send("Event Planner API");
});

// Get all events
app.get("/api/events", async (req, res) => {
    try {
        const events = await getAllEvents();
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add new event
app.post("/api/events", async (req, res) => {
    try {
        const event = await addEvent(req.body);
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete event
app.delete("/api/events/:eventId", async (req, res) => {
    try {
        await deleteEvent(req.params.eventId);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});