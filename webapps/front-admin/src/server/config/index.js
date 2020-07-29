const config = {
  api: {
    url: process.env.API_URL || 'http://localhost:3001',
  },
};

// Return config object without secrets
// this will be sent to the browser
export const clean = () => ({
  ...config,
});

export default () => config;
