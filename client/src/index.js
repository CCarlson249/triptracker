import React from 'react';
import ReactDOM from 'react-dom';
import "./index.css";
import 'bootstrap/dist/css/bootstrap.css';
import {RecoilRoot} from 'recoil';
import App from './components/App';
import { BrowserRouter as Router } from "react-router-dom";


ReactDOM.render(
  <Router>
    <RecoilRoot>
    <App />
  </RecoilRoot>
  </Router>,
  document.getElementById('root')
);