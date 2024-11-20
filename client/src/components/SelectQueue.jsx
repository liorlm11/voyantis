import React from 'react';

const SelectQueue = ({ queues, selectedQueue, setSelectedQueue, handleGo }) => (
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
);

export default SelectQueue;
