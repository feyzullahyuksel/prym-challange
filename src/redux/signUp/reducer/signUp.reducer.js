const INITIAL_STATE = {
  lastName: '',
  firstName: '',
  nickName: '',
  email: '',
  password: '',
  repeatPassword: '',
  showAddress: false,
  street: '',
  house: '',
  zip: '',
  city: '',
  additionalInformation: '',
};
const signUpReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SIGN_UP':
      return {
        ...state,
        ...action.data,
      };
    default:
      return state;
  }
};
export { signUpReducer };
