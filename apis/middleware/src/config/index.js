export default {
  api: {
    url: process.env.HIREFLIX_API_URL || 'https://api.hireflix.com',
    key: process.env.HIREFLIX_API_KEY || '',
  },
  position: process.env.POSITION,
};
