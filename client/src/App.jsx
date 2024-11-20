import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/Header';
import QueuesList from './components/QueuesList';
import SelectQueue from './components/SelectQueue';
import MessagesList from './components/MessagesList';
import AddMessageForm from './components/AddMessageForm';
import Footer from './components/Footer';

const API_URL = 'http://localhost:4000/api';

const App = () => {
  const [queues, setQueues] = useState({});
  const [selectedQueue, setSelectedQueue] = useState('');
  const [data, setData] = useState(null);
  const [newQueue, setNewQueue] = useState('');
  const [newMessage, setNewMessage] = useState('');

  // Handle selecting a queue and fetching its messages
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

  return (
    <div className="App">
      <Header title="Message Queue Manager" />
      <main>
        <QueuesList queues={queues} />
        <SelectQueue
          queues={queues}
          selectedQueue={selectedQueue}
          setSelectedQueue={setSelectedQueue}
          handleGo={handleGo}
        />
        {data && <MessagesList messages={data.messages} />}
        <AddMessageForm
          newQueue={newQueue}
          setNewQueue={setNewQueue}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          handleAddMessage={handleAddMessage}
        />
      </main>
      <Footer />
    </div>
  );
};

export default App;
