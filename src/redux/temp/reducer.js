const initialState = {
    value: null,
  };
  
  const tempReducer = (state = initialState, action) => {
    console.log(action)
    switch (action.type) {
      case 'INCREMENT':
        return { ...state, value: value + action.data };
      default:
        return state;
    }
  };
  
  export default tempReducer;
  