// routes - github
const express = require('express');
const githubController = require('../controllers/githubController');

const router = express.Router();

router.get('/users/:username', githubController.getUser);
router.get('/users/:username/repos', githubController.getUserRepos);
router.get('/repos/:owner/:repo/commits', githubController.getCommits);

module.exports = router;