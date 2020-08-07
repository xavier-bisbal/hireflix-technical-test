const { spawn } = require('child_process');
const path = require('path');
const stdoutStream = require('stdout-stream');

let apiStarted = false;
let webappStarted = false;
let npm = /^win/.test(process.platform) ? 'npm.cmd' : 'npm';
let apiPath = 'apis/middleware';
let webappPath = 'webapps/front-admin';

const watchBuildErrorsAndStartLog = (data, shouldLogData, logStringTemplate) => {
  if (data.includes('Module build failed') && !shouldLogData) {
    shouldLogData = true;
    console.clear()
    console.error('------------------------- Error in Build ----------------------------')
  }

  if (shouldLogData) {
    stdoutStream.write(logStringTemplate.replace('{0}', data));
  }

  return shouldLogData;
}

const startWebapp = () => {
  if (webappStarted) {
    return;
  }
  webappStarted = true;
  const webapp = spawn(npm, ['run', 'dev'], {
    cwd: path.resolve(__dirname, '..', webappPath)
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
  const api = spawn(npm, ['run', 'dev'], {
    cwd: path.resolve(__dirname, '..', apiPath)
  });
  
  api.stdout.on('data', (data) => {
    stdoutStream.write(`api | ${data}`);
  });
};

const run = () => {
  console.log('start Watchers');
  let webappBuilds = 0;

  let logWebappWebpack = false;
  let logApiWebpack = false;

  const webappWebpack = spawn(npm, ['run', 'watch'], {
    cwd: path.resolve(__dirname, '..', webappPath)
  });
  const apiWebpack = spawn(npm, ['run', 'watch'], {
    cwd: path.resolve(__dirname, '..', apiPath)
  });

  webappWebpack.stdout.on('data', (data) => {
    logWebappWebpack = watchBuildErrorsAndStartLog(data, logWebappWebpack, "webapp | {0}")

    if (data.includes('Finished building')) {
      webappBuilds += 1;
      if (webappBuilds % 2 === 0) {
        logWebappWebpack = false;
        startWebapp();
      }
    }
  });
  apiWebpack.stdout.on('data', (data) => {
    logApiWebpack = watchBuildErrorsAndStartLog(data, logApiWebpack, "api | {0}")
    if (data.includes('Built at')) {
      logApiWebpack = false;
      startApi();
    }
  });
}

run();