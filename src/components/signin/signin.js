import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import "./signin.scss";
import avatar from "../../images/avatar.png";

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useAuth();
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onBlur",
  });

  const fromPage = location.state?.from?.pathname;

  // const handleFormSubmit = (event) => {
  //   event.preventDefault();
  //   const form = event.target;
  //   const user = {};
  //   user.login = form.login.value;
  //   user.password = form.password.value;

  //   signIn(user, () => navigate(fromPage, { replace: true }));
  // };

  const onSubmit = (data, event) => {
    event.preventDefault();
    alert(JSON.stringify(data));
    reset();
    const user = {
      login: data.login,
      password: data.password,
    };
    signIn(user, () => navigate(fromPage, { replace: true }));
  };

  return (
    <section className="container signin-section">
      <div class="image-div">
        <img src={avatar} alt="logo sign-in form" />
        <h2>Authorization</h2>
      </div>
      <form
        className="book-form"
        action="/signin"
        method="post"
        // onSubmit={handleFormSubmit}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label htmlFor="login">Login:</label>
          <br />
          <input
            type="text"
            id="login"
            name="login"
            placeholder="Type your login"
            // required
            {...register("login", {
              required: "This field is required.",
              minLength: {
                value: 4,
                message: "Minimum must be 4 characters",
              },
              maxLength: {
                value: 16,
                message: "Maximum must be 16 characters",
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z]).{4,}$/,
                message:
                  "Must contain at least one uppercase and lowercase letter, and at least 4 characters",
              },
            })}
          />
        </div>
        <div>
          {/* <span id="error-login" className="error"></span> */}

          {errors?.login && (
            <span id="error-login" className="error">
              {errors?.login?.message || "Error!"}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <br />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Type your password"
            {...register("password", {
              required: "This field is required.",
              minLength: {
                value: 4,
                message: "Minimum must be 6 characters",
              },
              maxLength: {
                value: 16,
                message: "Maximum must be 16 characters",
              },
              pattern: {
                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                message:
                  "Must contain at least one  number and one uppercase and lowercase letter, and at least 6 characters",
              },
            })}
          />
        </div>
        <div>
          {/* <span id="error-password" className="error"></span> */}
          {errors?.password && (
            <span id="error-password" className="error">
              {errors?.password?.message || "Error!"}
            </span>
          )}
        </div>
        <button id="button-sign-in" type="submit" disabled={!isValid}>
          Sign-in
        </button>
      </form>
    </section>
  );
};

export default SignIn;
