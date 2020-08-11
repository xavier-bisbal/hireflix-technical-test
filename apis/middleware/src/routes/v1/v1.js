import express from 'express';
import { getPosition, getInterview, inviteCandidate } from 'services/api';

const router = express.Router();

router.get('/version', (req, res) => {
  res.json({
    version: process.env.VERSION || 'no version available',
  });
});

router.get('/position/:positionId', async (req, res) => {
  const position = await getPosition(req.params.positionId);
  res.json({ position });
});

router.get('/interview/:interviewId', async (req, res) => {
  const interview = await getInterview(req.params.interviewId);
  res.json({ interview });
});

router.get('/invite/:positionId/:name/:email/:phone', async (req, res) => {
  const interview = await inviteCandidate(req.params.positionId, req.params.name, req.params.email, req.params.phone);
  res.json({ interview });
});

export default router;
