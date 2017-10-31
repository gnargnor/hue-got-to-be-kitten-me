import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import HueApp from './pages/hueApp';
import './styles/index.css';



const entry =  document.getElementById('hueApp');

const render = () => {
  ReactDOM.render(
    <HueApp />,
    entry
  );
};

render();
