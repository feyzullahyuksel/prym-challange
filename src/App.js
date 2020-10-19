import React, { useEffect, useState } from 'react';
import style from './App.module.scss';
import TextField from './components/textField';
import CheckboxField from './components/checkbox';
import { signUpSelector } from './redux/signUp/selectors/index';
import { usePersistedState } from './hooks/index';
import { connect } from 'react-redux';

const App = (props) => {
  // * "Last name" input of type text
  // * "First name" input of type text
  // * "Nick name" input of type text
  // * "Email" input of type
  // * "Password" password input of type password
  // * "Repeat password" input of type password

  // * "Street" input of type text
  // * "House/Apartment" input of type text
  // * "ZIP" input of type number
  // * "City" input of type string

  const [submitIsDisabled, setSubmitIsDisabled] = useState(true);

  // * "Last name" input field MUST be at least 2 characters long.
  // * "First name" input field MUST be at least 2 characters long.
  // * "Password" MUST be at least 6 characters long and contain at least 2 numbers.
  // * "Password" and "Repeat password" fields MUST contain the same value.
  // * "Nick name" input field MAY be empty.
  // * "Street" input field MUST be at least 4 characters long.
  // * "City" input field MUST be at least 4 characters long.
  // * "Additional information" area MAY be empty.
  // * "Email" input field MUST be a valid email.
  // * "ZIP" input field MUST be 5 characters long.
  const [state, setState] = usePersistedState('signUp', props.signUp);

  useEffect(() => {
    const lastNameIsValid = props.signUp.lastName.length >= 2;
    const firstNameIsValid = props.signUp.firstName.length >= 2;
    const passwordIsValid = () => {
      const password = props.signUp.password,
        repeatPassword = props.signUp.repeatPassword;

      if (
        password === repeatPassword &&
        /^(?=(?:\D*\d){2})[a-zA-Z0-9]*$/.test(password) &&
        password.length >= 6
      ) {
        return true;
      } else {
        return false;
      }
    };

    const streetIsValid = props.signUp.street.length >= 4;
    const cityIsValid = props.signUp.city.length >= 4;
    const zipIsValid = props.signUp.zip.length >= 5;
    const emailIsValid = () => {
      if (/^[^@]+@[^@]{2,}\.[^@]{2,}$/.test(props.signUp.email)) {
        return true;
      } else {
        return false;
      }
    };

    if (
      !props.signUp.showAddress &&
      lastNameIsValid &&
      firstNameIsValid &&
      passwordIsValid() &&
      emailIsValid()
    ) {
      setSubmitIsDisabled(false);
    } else if (
      props.signUp.showAddress &&
      zipIsValid &&
      cityIsValid &&
      streetIsValid &&
      lastNameIsValid &&
      firstNameIsValid &&
      passwordIsValid() &&
      emailIsValid()
    ) {
      setSubmitIsDisabled(false);
    }
  }, [
    props.signUp.lastName.length,
    props.signUp.firstName.length,
    props.signUp.street.length,
    props.signUp.city.length,
    props.signUp.zip.length,
    props.signUp.showAddress,
    props.signUp.password,
    props.signUp.repeatPassword,
    props.signUp.email,
  ]);

  const form = {
    lastName: {
      type: 'text',
      id: 'formFieldLastName',
      name: 'lastName',
      label: 'Last Name',
      value: state.lastName,
      placeholder: 'Last Name',
      required: true,
      onChange: (e) => {
        props.dispatchSignup({
          lastName: e.target.value,
        });
        setState({
          ...props.signUp,
          lastName: e.target.value,
        });
      },
    },
    firstName: {
      type: 'text',
      id: 'formFieldFirstName',
      name: 'firstName',
      label: 'First Name',
      value: state.firstName,
      placeholder: 'First Name',
      required: true,
      onChange: (e) => {
        props.dispatchSignup({
          firstName: e.target.value,
        });
        setState({
          ...props.signUp,
          firstName: e.target.value,
        });
      },
    },
    nickName: {
      type: 'text',
      id: 'formFieldNickName',
      name: 'nickName',
      label: 'Nick Name',
      value: state.nickName,
      placeholder: 'Nick Name',
      required: false,
      onChange: (e) => {
        props.dispatchSignup({
          nickName: e.target.value,
        });
        setState({
          ...props.signUp,
          nickName: e.target.value,
        });
      },
    },
    email: {
      type: 'email',
      id: 'formFieldEmail',
      name: 'email',
      label: 'Email',
      value: state.email,
      placeholder: 'Email',
      required: true,
      onChange: (e) => {
        props.dispatchSignup({
          email: e.target.value,
        });
        setState({
          ...props.signUp,
          email: e.target.value,
        });
      },
    },
    password: {
      type: 'password',
      id: 'formFieldPassword',
      name: 'password',
      label: 'Password',
      value: state.password,
      placeholder: 'Password',
      required: true,
      onChange: (e) => {
        props.dispatchSignup({
          password: e.target.value,
        });
        setState({
          ...props.signUp,
          password: e.target.value,
        });
      },
    },
    repeatPassword: {
      type: 'password',
      id: 'formFieldRepeatPassword',
      name: 'repeatPassword',
      label: 'Repeat Password',
      value: state.repeatPassword,
      placeholder: 'Repeat Password',
      required: true,
      onChange: (e) => {
        props.dispatchSignup({
          repeatPassword: e.target.value,
        });
        setState({
          ...props.signUp,
          repeatPassword: e.target.value,
        });
      },
    },
    showAddress: {
      id: 'formCheckboxShowAddress',
      name: 'showAddress',
      label: 'Show Address',
      required: false,
      checked: state.showAddress,
      onChange: (e) => {
        props.dispatchSignup({
          showAddress: e.target.checked,
        });
        setState({
          ...props.signUp,
          showAddress: e.target.checked,
        });
      },
    },
    address: {
      street: {
        type: 'text',
        id: 'formFieldStreet',
        name: 'street',
        label: 'Street',
        value: state.street,
        placeholder: 'Street',
        required: false,
        onChange: (e) => {
          props.dispatchSignup({
            street: e.target.value,
          });
          setState({
            ...props.signUp,
            street: e.target.value,
          });
        },
      },
      house: {
        type: 'text',
        id: 'formFieldHouse',
        name: 'house',
        label: 'House/Apartment',
        value: state.house,
        placeholder: 'House/Apartment',
        required: false,
        onChange: (e) => {
          props.dispatchSignup({
            house: e.target.value,
          });
          setState({
            ...props.signUp,
            house: e.target.value,
          });
        },
      },
      zip: {
        type: 'number',
        id: 'formFieldZip',
        name: 'zip',
        label: 'ZIP',
        value: state.zip,
        placeholder: 'ZIP',
        required: false,
        onChange: (e) => {
          props.dispatchSignup({
            zip: e.target.value,
          });
          setState({
            ...props.signUp,
            zip: e.target.value,
          });
        },
      },
      city: {
        type: 'text',
        id: 'formFieldCity',
        name: 'city',
        label: 'City',
        value: state.city,
        placeholder: 'City',
        required: false,
        onChange: (e) => {
          props.dispatchSignup({
            city: e.target.value,
          });
          setState({
            ...props.signUp,
            city: e.target.value,
          });
        },
      },
    },
    additionalInformation: {
      id: 'formFieldAdditionalInformation',
      name: 'additionalInformation',
      value: state.additionalInformation,
      onChange: (e) => {
        props.dispatchSignup({
          additionalInformation: e.target.value,
        });
        setState({
          ...props.signUp,
          additionalInformation: e.target.value,
        });
      },
    },
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('form', e);
    alert('form submitted');
  };

  const Address = (
    <div>
      <TextField {...form.address.street} />
      <TextField {...form.address.house} />
      <TextField {...form.address.zip} />
      <TextField {...form.address.city} />
    </div>
  );

  return (
    <div className={style.wrapper}>
      <form onSubmit={onSubmit}>
        <TextField {...form.lastName} />
        <TextField {...form.firstName} />
        <TextField {...form.nickName} />
        <TextField {...form.email} />
        <TextField {...form.password} />
        <TextField {...form.repeatPassword} />
        <CheckboxField {...form.showAddress} />
        {state.showAddress && Address}
        <textarea {...form.additionalInformation}></textarea>
        <div>
          <button type='submit' disabled={submitIsDisabled}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
const mapDispatch = (dispatch) => ({
  dispatchSignup: (data) => dispatch({ data, type: 'SIGN_UP' }),
});
const mapState = (state) => ({
  signUp: signUpSelector(state),
});

export default connect(mapState, mapDispatch)(App);
