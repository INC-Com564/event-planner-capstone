import { useState } from 'react'
import './App.css'

function App() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ name: '', date: '', time: '', location: '', description: '' });
  const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEvent(prev => ({ ...prev, [name]: value }));
      };

  const handleAddEvent = (e) => {
        e.preventDefault();
        setEvents(prev => [...prev, { id: Date.now(), ...newEvent }]);
        setNewEvent({ name: '', date: '', time: '', location: '', description: '' }); 
      };
  const handleDeleteEvent = (e) => {
    e.preventDefault();
    setEvents([]);
  }
  return (
    <>
      <h1>Event Calendar</h1>
      <div className="card">
        <img src="https://gdoc.io/uploads/printable-monthly-calendar-free-google-docs-template-t-1712x1239.webp" />
        </div>
        <div>
           <h2>Upcoming Events</h2>
          {events.length === 0 ? (
            <p>No events planned yet!</p>
          ) : (
            <ul>
              {events.map(event => (
                <li key={event.id}>
                  <h3>{event.name}</h3>
                   <p>Date: {event.date}</p>
                <p>Time: {event.time}</p>
                <p>Location: {event.location}</p>
                <p>{event.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <form onSubmit={handleAddEvent}>
          <input 
            type='text' 
            name='name' 
            value={newEvent.name} 
            onChange={handleInputChange} 
            placeholder="Event Name"
          />
          <input type='date' name='date' value={newEvent.date} onChange={handleInputChange}
          placeholder='Event Date'/>
          <input type='time' name='time' value={newEvent.time} onChange={handleInputChange} placeholder='Event Time'/>
          <input type='location' name='location' value={newEvent.location} onChange={handleInputChange} placeholder='Event Location'/>
          <div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Enter Date
          </button>
          </div>
          <button 
            type="button"
            onClick={handleDeleteEvent} 
            className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
          >
            Delete Date
          </button>
        </form>
      </div>

      <p className="read-the-docs">Click on either button to plan an event</p>
    </>
  )
}

export default App