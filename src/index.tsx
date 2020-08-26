import React from 'react';
import ReactDOM from 'react-dom';
import Layout from 'src/layout';
import * as serviceWorker from './serviceWorker';
import './assets/global.css';

ReactDOM.render(<Layout />, document.getElementById('root'));

/**
 * 不用 serviceWorker，如果使用把 unregister 改成 register 就行了
 */
serviceWorker.unregister();
