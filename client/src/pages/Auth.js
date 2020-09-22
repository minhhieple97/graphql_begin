import React, { Component } from "react"
import "./Auth.css"
export default class AuthPage extends Component {
  state = {
    isLogin: true,
  }

  render() {
    return (
      <form className="auth-form">
        <div className="form-control">
          <label htmlFor="email">E-Mail</label>
          <input type="email" id="email" />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" />
        </div>
        <div className="form-actions">
          <button type="submit">Submit</button>
          <button type="button">
            Switch to {this.state.isLogin ? "Signup" : "Login"}
          </button>
        </div>
      </form>
    )
  }
}
