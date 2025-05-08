const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Mock data structure
// teams: { week: { team: [ { name: '...', role: '...', image: '...' }, ... ] } }
const mockData = {};

// GET /teams/:week/:team
app.get('/teams/:week/:team', (req, res) => {
    const { week, team } = req.params;
    const teamMembers = mockData[week]?.[team] || [];
    res.json(teamMembers);
});

// POST /teams/:week/:team/members
app.post('/teams/:week/:team/members', (req, res) => {
    const { week, team } = req.params;
    const newMember = req.body;

    if (!newMember || !newMember.name || !newMember.role) {
        return res.status(400).json({ message: 'Member name and role are required.' });
    }

    if (!mockData[week]) {
        mockData[week] = {};
    }
    if (!mockData[week][team]) {
        mockData[week][team] = [];
    }

    mockData[week][team].push(newMember);
    res.status(201).json({ message: 'Member added successfully', member: newMember });
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
