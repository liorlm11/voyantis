const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const queues = {};

app.post('/api/:queue_name', (req, res) => {
    const { queue_name } = req.params;

    console.log(queue_name)
    const { message } = req.body;

    console.log(req.body)

    if (!queues[queue_name]) {
        queues[queue_name] = [];
    }
    queues[queue_name].push(message);

    res.status(201).json({ message: 'Message added to queue' });
});


app.get('/api/queues', (req, res) => {
    const queueSummary = Object.keys(queues).map((queue) => ({
        queue_name: queue,
        message_count: queues[queue].length,
    }));

    console.log("queueSummary: ", queueSummary)
    res.status(200).json(queueSummary);
});


app.get('/api/:queue_name', (req, res) => {
    const { queue_name } = req.params;

    if (!queues[queue_name] || queues[queue_name].length === 0) {
        return res.status(204).json({ message: 'Queue is empty or does not exist' });
    }

    res.status(200).json({
        queue_name,
        messages: queues[queue_name],
    });
});


app.listen(4000, () => {
    console.log("listeining to port : ", 4000)
})