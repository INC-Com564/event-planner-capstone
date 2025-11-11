import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Event Calendar</h1>
      <div className="card">
        <img src="https://gdoc.io/uploads/printable-monthly-calendar-free-google-docs-template-t-1712x1239.webp" />
       <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> Enter Date</button>
        <button className='Delete'>Delete Date</button>
      </div>
      <p className="read-the-docs"> Click on either button to plan an event</p>
    </>
  )
}

export default App
