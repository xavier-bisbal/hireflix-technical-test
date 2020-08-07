const { spawn } = require('child_process');
const path = require('path');
const stdoutStream = require('stdout-stream');

let apiStarted = false;
let webappStarted = false;

let logWebappWebpack = false;
let logApiWebpack = false;

const startWebapp = () => {
  if (webappStarted) {
    return;
  }
  webappStarted = true;
  const webapp = spawn('npm.cmd', ['run', 'dev'], {
    cwd: path.resolve(__dirname, '..', 'webapps/front-admin')
  });
  webapp.stdout.on('data', (data) => {
    stdoutStream.write(`webapp | ${data}`);
  });
}

const startApi = () => {
  if (apiStarted) {
    return;
  }
  apiStarted = true;
  const api = spawn('npm.cmd', ['run', 'dev'], {
    cwd: path.resolve(__dirname, '..', 'apis/middleware')
  });
  
  api.stdout.on('data', (data) => {
    stdoutStream.write(`api | ${data}`);
  });
};

const run = () => {
  console.log('start Watchers');
  let webappBuilds = 0;
  let apiBuilds = 0;

  const webappWebpack = spawn('npm.cmd', ['run', 'watch'], {
    cwd: path.resolve(__dirname, '..', 'webapps/front-admin')
  });
  const apiWebpack = spawn('npm.cmd', ['run', 'watch'], {
    cwd: path.resolve(__dirname, '..', 'apis/middleware')
  });

  webappWebpack.stdout.on('data', (data) => {
    if (data.includes('Module build failed') && !logWebappWebpack) {
      logWebappWebpack = true;
      console.clear()
      console.error('------------------------- Error in Build ----------------------------')
    }

    if (logWebappWebpack) {
      stdoutStream.write(`webapp | ${data}`);
    }

    if (data.includes('Finished building')) {
      webappBuilds += 1;
      if (webappBuilds % 2 === 0) {
        logWebappWebpack = false;
        startWebapp();
      }
    }
  });
  apiWebpack.stdout.on('data', (data) => {
    if (data.includes('Module build failed') && !logWebappWebpack) {
      logApiWebpack = true;
      console.clear()
      console.error('------------------------- Error in Build ----------------------------')
    }
    if (logApiWebpack) {
      stdoutStream.write(`api | ${data}`);
    }
    if (data.includes('Built at')) {
      startApi();
      apiBuilds += 1;
    }
  });
}

run();