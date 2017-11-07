'use strict';

import React from 'react';
import { Route } from 'react-router-dom';

const RouteHouse = ({className, component: Component, ...rest}) => {
  return (
    <Route {...rest} render = {
      props => {
        return (
          <div className={className}>
            <Component {...props} />
          </div>
        );
      }
    } />
  );
}

export default RouteHouse;
