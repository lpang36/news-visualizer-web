import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Home from './Home';
import './styles/index.css'
import './styles/app.css'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Home />, document.getElementById('root'));
registerServiceWorker();
