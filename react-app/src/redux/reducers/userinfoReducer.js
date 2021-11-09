const defaultState = null;
const userinfo = (state = defaultState, action) => {
  switch (action.type) {
    case 'UPDATE_USERINFO':
      return action.payload;
    default: 
      return state;
  }
};

export default userinfo;