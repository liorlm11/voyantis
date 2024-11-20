
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:4000/api';

const App = () => {
  const [queues, setQueues] = useState({});
  const [selectedQueue, setSelectedQueue] = useState('');
  const [data, setData] = useState(null);
  const [newQueue, setNewQueue] = useState('');
  const [newMessage, setNewMessage] = useState('');


  // Handle selecting a queue and fetching its message
  const handleGo = async () => {
    if (selectedQueue) {
      try {
        const response = await axios.get(`${API_URL}/${selectedQueue}?timeout=5000`);
        setData(response.data || 'No messages in the queue');
      } catch (error) {
        setData('Error fetching messages');
      }
    }
  };

  // Handle adding a new message to a queue
  const handleAddMessage = async () => {
    if (newQueue && newMessage) {
      try {

        await axios.post(`${API_URL}/${newQueue}`, { message: newMessage });

        setQueues((prevQueues) => {
          const updatedQueues = { ...prevQueues };
          if (!updatedQueues[newQueue]) {
            updatedQueues[newQueue] = [];
          }
          updatedQueues[newQueue].push(newMessage);
          return updatedQueues;
        });

        alert('Message added successfully!');
        setNewQueue('');
        setNewMessage('');
      } catch (error) {
        console.error('Invalid JSON:', error.message);
        alert('Error adding message. Ensure the message is valid JSON.');
      }
    } else {
      alert('Please fill in both fields.');
    }
  };

  useEffect(() => {
    const fetchQueues = async () => {
      try {
        const response = await axios.get(`${API_URL}/queues`);
        console.log("fetchQueues response", response)
        const formattedQueues = response.data.reduce((acc, queue) => {
          acc[queue.queue_name] = new Array(queue.message_count).fill(null);
          return acc;
        }, {});
        setQueues(formattedQueues);
      } catch (error) {
        console.error('Error fetching queues:', error);
      }
    };
    fetchQueues();
  }, []);

  console.log("data: ", data)

  return (
    <div className="App">
      <header className="App-header">
        <h1>Message Queue Manager</h1>
      </header>
      <main>
        <section>
          <h2>Queues</h2>
          <ul>
            {Object.keys(queues).map((queue) => (
              <li key={queue}>
                {queue} ({queues[queue].length} messages)
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2>Select Queue</h2>
          <label htmlFor="select-queue">Select a queue:</label>
          <select
            id="select-queue"
            value={selectedQueue}
            onChange={(e) => setSelectedQueue(e.target.value)}
          >
            <option value="">--Select Queue--</option>
            {Object.keys(queues).map((queue) => (
              <option key={queue} value={queue}>
                {queue}
              </option>
            ))}
          </select>
          <button onClick={handleGo}>Go</button>
        </section>
        {data && (
          <section>
            <h3>Messages in the Queue:</h3>
            <ul>
              {
                data.messages.map(message => <li>{message}</li>)
              }
            </ul>
          </section>
        )}
        <section>
          <h2>Add a New Message</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddMessage();
            }}
          >
            <div>
              <label htmlFor="queue-name">Queue Name:</label>
              <input
                id="queue-name"
                type="text"
                value={newQueue}
                onChange={(e) => setNewQueue(e.target.value)}
                placeholder="Enter queue name"
              />
            </div>
            <div>
              <label htmlFor="message-json">Message:</label>
              <textarea
                id="message-json"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder='Enter message'
              />
            </div>
            <button type="submit">Add Message</button>
          </form>
        </section>
      </main>
      <footer>
        <p>© 2024 Message Queue Manager. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
