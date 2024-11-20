import React from 'react';

const AddMessageForm = ({
    newQueue,
    setNewQueue,
    newMessage,
    setNewMessage,
    handleAddMessage,
}) => (
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
                    placeholder="Enter message"
                />
            </div>
            <button type="submit">Add Message</button>
        </form>
    </section>
);

export default AddMessageForm;
