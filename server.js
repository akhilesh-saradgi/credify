const express = require('express');
const cors = require('cors');
const fetch = require('cross-fetch');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); 

// Dummy Database for testing before Shreeshant finishes his part
const certificates = [];
const generateHash = () => Math.random().toString(36).substring(2, 15);

app.post('/api/issue', (req, res) => {
    const { studentName, examScore, attendance } = req.body;
    const newCert = { id: certificates.length + 1, studentName, examScore, attendance, status: 'Approved', hash: generateHash() };
    certificates.push(newCert);
    res.json({ success: true, id: newCert.id, hash: newCert.hash });
});

app.get('/api/github-check', async (req, res) => {
    try {
        const { owner, repo } = req.query;
        const githubRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contributors`);
        const contributors = await githubRes.json();
        const totalCommits = contributors.reduce((acc, user) => acc + user.contributions, 0);
        res.json({ success: true, totalCommits });
    } catch (error) {
        res.json({ success: false });
    }
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));