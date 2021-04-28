import React, { Component } from "react";
import Form from "./form";
import Joi from "joi-browser";
import Input from "./input";

import axios from "axios";

class RegisterForm extends Form {
  state = {
    data: {
      fullname: "",
      email: "",
      mobileno: "",
      password: "",
      confirmpwd: "",
    },
    errors: {},
  };

  schema = {
    fullname: Joi.string().required().label("Full Name"),
    email: Joi.string().email().required().label("Email"),
    mobileno: Joi.number().integer().required().label("Mobile No."),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .required()
      .label("Password"),
    confirmpwd: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .required()
      .label("Confirm Password"),
  };

  doSubmit = () => {
    const registered = this.state.data;

    axios
      .post("http://localhost:4000/user/register", registered)
      .then((response) => console.log(response.data));

    this.setState({
      data: {
        fullname: "",
        email: "",
        mobileno: "",
        password: "",
        confirmpwd: "",
      },
    });
  };

  render() {
    const { data, errors } = this.state;
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="fullname"
            value={data.fullname}
            label="Full Name"
            onChange={this.handleChange}
            error={errors.fullname}
          />
          <Input
            name="email"
            value={data.email}
            label="Email"
            onChange={this.handleChange}
            error={errors.email}
          />
          <Input
            name="mobileno"
            value={data.mobileno}
            label="Mobile no."
            onChange={this.handleChange}
            error={errors.mobileno}
          />

          <Input
            name="password"
            type="password"
            value={data.password}
            label="Password"
            onChange={this.handleChange}
            error={errors.password}
          />
          <Input
            name="confirmpwd"
            value={data.confirmpwd}
            label="Confirm Password"
            onChange={this.handleChange}
            error={errors.confirmpwd}
          />

          <button disabled={this.validate()} className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    );
  }
}

export default RegisterForm;
