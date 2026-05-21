const express = require('express');
const cors = require('cors');

// Ensures compatibility with fetch in native Node environments
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware Setup
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // This will serve Adi's frontend files automatically

/* ========================================================
   1. GITHUB REPOSITORY METRICS ENGINE (Akhil's Core Task)
   ======================================================== */
app.get('/api/github-check', async (req, res) => {
    try {
        const { repoUrl } = req.query; // Expects: ?repoUrl=https://github.com/owner/repo
        
        if (!repoUrl) {
            return res.status(400).json({ error: "Missing repository URL parameter" });
        }

        // Clean up the URL string to grab owner and repo names cleanly
        const cleanUrl = repoUrl.replace('https://', '').replace('http://', '').replace('www.', '');
        const urlParts = cleanUrl.split('/');
        const owner = urlParts[1];
        const repo = urlParts[2];

        if (!owner || !repo) {
            return res.status(400).json({ error: "Invalid GitHub format. Use: https://github.com/owner/repo" });
        }

        // Target the public repository contributors endpoint
        const githubApiUrl = `https://api.github.com/repos/${owner}/${repo}/contributors`;
        const response = await fetch(githubApiUrl, {
            headers: { 'User-Agent': 'Credify-App' }
        });

        if (!response.ok) {
            return res.status(response.status).json({ error: "Repository not found or private" });
        }

        const contributors = await response.json();
        const totalCommits = contributors.reduce((sum, current) => sum + current.contributions, 0);
        
        // Map data arrays cleanly for Adi's UI charts
        const teamBreakdown = contributors.map(user => ({
            username: user.login,
            avatar: user.avatar_url,
            commits: user.contributions,
            percentage: ((user.contributions / totalCommits) * 100).toFixed(1)
        }));

        res.json({
            success: true,
            totalRepoCommits: totalCommits,
            teamBreakdown: teamBreakdown
        });

    } catch (error) {
        console.error("GitHub API Processing Exception:", error);
        res.status(500).json({ error: "Internal server error parsing repository metadata" });
    }
});

/* ========================================================
   2. SYSTEM STUBS (Awaiting Shreeshant's Database Connections)
   ======================================================== */

app.post('/api/issue', async (req, res) => {
    const { studentName, examScore, attendance } = req.body;
    console.log(`[Data Queued]: ${studentName} - Score: ${examScore}`);
    res.json({ success: true, message: "Academic performance record logged." });
});

app.post('/api/approve', async (req, res) => {
    const simulatedHash = "sha256-4a8f3b2c1d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f";
    res.json({ success: true, generatedHash: simulatedHash });
});

app.get('/api/verify/:hash', async (req, res) => {
    res.json({
        isValid: true,
        institution: "PDA College of Engineering",
        data: { studentName: "Sample Student", examScore: 85, attendance: 90, status: "Verified" }
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Credify Engine live on http://localhost:${PORT}`);
});