'use strict';
// imported reducers

const INITIAL_STATE = {
  hello: 'world'
};

// export 
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'test':
      return state;
    default:
      return state;
  };
};
