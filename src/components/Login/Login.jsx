import { useContext, useEffect, useReducer, useState } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthStore from "../../store/AuthContext";

const emailReducer = (prevState, actions) => {
  switch (actions.name) {
    case "SET_EMAIL":
      return { value: actions.payload, isValid: actions.payload.includes("@") };
    case "USER_5RAJ_MEL_INPUT":
      return { value: prevState.value, isValid: prevState.value.includes("@") };
    default:
      return { value: "", isValid: null };
  }
};

const passwordReducer = (prevState, actions) => {
  switch (actions.name) {
    case "SET_PASSWORD":
      return {
        value: actions.payload,
        isValid: actions.payload.trim().length > 6,
      };
    case "USER_5RAJ_MEL_INPUT":
      return {
        value: prevState.value,
        isValid: prevState.value.trim().length > 6,
      };
    default:
      return { value: "", isValid: null };
  }
};

const Login = () => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();

  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();

  const [formIsValid, setFormIsValid] = useState(false);

  const [email, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [password, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });
  const { isValid: emailIsValid } = email;
  const { isValid: passwordIsValid } = password;
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("aaa");
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 1000);
    return () => {
      clearTimeout(timer);
      console.log("zzz");
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({ name: "SET_EMAIL", payload: event.target.value });
    // setFormIsValid(
    //   event.target.value.includes("@") && password.value.trim().length > 6
    // );
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({ name: "SET_PASSWORD", payload: event.target.value });

    // setFormIsValid(
    //   event.target.value.trim().length > 6 && email.value.includes("@")
    // );
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(enteredEmail.includes("@"));
    dispatchEmail({ name: "USER_5RAJ_MEL_INPUT" });
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({ name: "USER_5RAJ_MEL_INPUT" });
  };
  const { loginHandler } = useContext(AuthStore);
  const submitHandler = (event) => {
    event.preventDefault();
    loginHandler(email.value, password.value);
  };

  return (
    <AuthStore.Provider
      value={{
        email: email.value,
        password: password.value,
      }}
    >
      <Card className={classes.login}>
        <form onSubmit={submitHandler}>
          <div
            className={`${classes.control} ${
              email.isValid === false ? classes.invalid : ""
            }`}
          >
            <label htmlFor="email">E-Mail</label>
            <input
              type="email"
              id="email"
              value={email.value}
              onChange={emailChangeHandler}
              onBlur={validateEmailHandler}
            />
          </div>
          <div
            className={`${classes.control} ${
              password.isValid === false ? classes.invalid : ""
            }`}
          >
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password.value}
              onChange={passwordChangeHandler}
              onBlur={validatePasswordHandler}
            />
          </div>
          <div className={classes.actions}>
            <Button
              type="submit"
              className={classes.btn}
              disabled={!formIsValid}
            >
              Login
            </Button>
          </div>
        </form>
      </Card>
    </AuthStore.Provider>
  );
};

export default Login;
