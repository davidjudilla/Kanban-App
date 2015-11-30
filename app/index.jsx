require('./main.css');

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import 'array.prototype.findindex';

main();

function main() {
	const app = document.createElement('div');

	document.body.appendChild(app);

	ReactDOM.render(<App />, app);
}