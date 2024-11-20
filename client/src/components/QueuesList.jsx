import React from 'react';

const QueuesList = ({ queues }) => (
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
);

export default QueuesList;
