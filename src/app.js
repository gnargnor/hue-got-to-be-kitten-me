import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import HueApp from './pages/HueApp';
import './styles/index.css';



const entry =  document.getElementById('hueApp');

const render = () => {
  console.log(HueApp);
  ReactDOM.render(
    <HueApp />,
    entry
  );
};

console.log(render);
render();
