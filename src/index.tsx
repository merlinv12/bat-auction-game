import React from 'react';
import ReactDOM from 'react-dom';
import QuizStart from './components/QuizStart';
import './index.css';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <h1 style={{ textAlign: "center"}}>The Car Auction Game</h1>
    <QuizStart />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
