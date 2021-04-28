import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./form";
import Input from "./input";
import axios from "axios";

class LoginForm extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {},
  };

  schema = {
    email: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = () => {
    const login = this.state.data;

    axios
      .post("http://localhost:4000/user/signin", login)
      .then((response) => console.log(response.data));

    this.setState({
      data: {
        email: "",

        password: "",
      },
    });
  };

  render() {
    const { data, errors } = this.state;
    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="email"
            value={data.email}
            label="Username"
            onChange={this.handleChange}
            error={errors.fullname}
          />
          <Input
            name="password"
            type="password"
            value={data.password}
            label="Password"
            onChange={this.handleChange}
            error={errors.password}
          />

          <button disabled={this.validate()} className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
