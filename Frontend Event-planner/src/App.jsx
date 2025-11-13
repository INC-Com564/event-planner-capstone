import { useState, useEffect } from 'react'
import './App.css'
import './amplifyConfig'
import Auth from './Auth'
import { getCurrentUser, signOut, fetchAuthSession } from 'aws-amplify/auth'

const API_URL = 'https://event-planner-capstone.onrender.com/api';

function App() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ name: '', date: '', time: '', location: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check if user is already logged in
  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (err) {
      setUser(null);
    } finally {
      setAuthLoading(false);
    }
  };
 
  useEffect(() => {
    if (user) {
      fetchEvents();
    }
  }, [user]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/events`);
      if (!response.ok) throw new Error('Failed to fetch events');
      const data = await response.json();
      setEvents(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent(prev => ({ ...prev, [name]: value }));
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEvent)
      });
      
      if (!response.ok) throw new Error('Failed to add event');
      
      const addedEvent = await response.json();
      setEvents(prev => [...prev, addedEvent]);
      setNewEvent({ name: '', date: '', time: '', location: '' });
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error adding event:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/events/${eventId}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) throw new Error('Failed to delete event');
      
      setEvents(prev => prev.filter(event => event.eventId !== eventId));
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error deleting event:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setUser(null);
      setEvents([]);
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  // Show auth screen if not logged in
  if (!user) {
    return <Auth onAuthSuccess={checkUser} />;
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1>Event Calendar</h1>
        <button
          onClick={handleSignOut}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Sign Out
        </button>
      </div>
      <div className="card">
        <img src="https://gdoc.io/uploads/printable-monthly-calendar-free-google-docs-template-t-1712x1239.webp" alt="Calendar" />
      </div>

      {error && (
        <div className="bg-red-500 text-white p-4 rounded mb-4">
          Error: {error}
        </div>
      )}

      <div>
        <h2>Upcoming Events</h2>
        {loading ? (
          <p>Loading...</p>
        ) : events.length === 0 ? (
          <p>No events planned yet!</p>
        ) : (
          <ul>
            {events.map(event => (
              <li key={event.eventId}>
                <h3>{event.name}</h3>
                <p>Date: {event.date}</p>
                <p>Time: {event.time}</p>
                <p>Location: {event.location}</p>
                <button onClick={() => handleDeleteEvent(event.eventId)}
                  className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded mt-2'
                  disabled={loading}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <form onSubmit={handleAddEvent}>
          <input type='text' name='name' value={newEvent.name} onChange={handleInputChange} 
            placeholder="Event Name"
            required
          />
          <input type='date' name='date' value={newEvent.date} onChange={handleInputChange}
            placeholder='Event Date'
            required
          />
          <input type='time' name='time' value={newEvent.time} onChange={handleInputChange} 
            placeholder='Event Time'
            required
          />
          <input type='text' name='location' value={newEvent.location} onChange={handleInputChange} 
            placeholder='Event Location'
            required
          />
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" disabled={loading}>
            {loading ? 'Adding...' : 'Add Event'}</button>
        </form>
      </div>
      <p className="read-the-docs">Add events to your calendar</p>
    </>
  )
}

export default App