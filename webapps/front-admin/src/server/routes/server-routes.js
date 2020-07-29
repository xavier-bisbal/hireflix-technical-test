import express from 'express';

const router = express.Router();

router.get('/force-server-error', () => {
  throw new Error('Forced error');
});

export default router;
