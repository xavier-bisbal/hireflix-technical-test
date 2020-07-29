import React from 'react';
import { render } from 'react-dom';
import App from 'app';

function run() {
  render(<App />, document.getElementById('react-app'));
  document.removeEventListener('DOMContentLoaded', run, false);
}

if (['complete', 'loaded', 'interactive'].indexOf(document.readyState) !== -1 && document.body) {
  run();
} else {
  document.addEventListener('DOMContentLoaded', run, false);
}
