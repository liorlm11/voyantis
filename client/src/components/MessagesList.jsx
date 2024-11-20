import React from 'react';

const MessagesList = ({ messages }) => (
    <section>
        <h3>Messages in the Queue:</h3>
        <ul>
            {messages.map((message, index) => (
                <li key={index}>{message}</li>
            ))}
        </ul>
    </section>
);

export default MessagesList;
