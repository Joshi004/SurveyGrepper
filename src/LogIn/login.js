import React, { Component } from 'react'
import './login.scss';

class LoginComponent extends Component {
    constructor() {
        super()
        this.state = {
            loginForm: {
                userID: '',
                password: ''
            }
        }
    }


    changeHandler = (event) => {
        console.log("This is change handler invoked")
        const name = event.target.name
        const value = event.target.value

        this.setState({
            ...this.state,
            loginForm: { ...this.state.loginForm, [name]: value }
        }, () => {
            console.log(this.state.loginForm)
        })

    }


    submitHandler = (event) => {
        console.log("Subbmitted Data is ", event)
        event.preventDefault()
    }

    formReset = () => {
        console.log("This resets the form")
        this.setState({
            loginForm: {
            }
        })
    }

    render() {
        return (
            <form className="container formContainer">
                <div class="formHeading">Enter You Credentials</div>
                <div>
                    <img  className="formImage" src="/loginImage.jpg"></img>
                </div>
                <div className="innerForm">
                    <div className="formGroup inputGroup">
                        <label className="inputEntity inputLabel">User ID</label>
                        <input className="formControl textInput inputEntity textInput" type='text' name="userID" value={this.state.loginForm.userID || ''} onChange={this.changeHandler} placeholder="Eneter Value" >
                        </input>
                    </div>
                    <div className="formGroup inputGroup">
                        <label className="inputEntity inputLabel">Password</label>
                        <input className="textInput formControl inputEntity textInput" type='password' name="password" value={this.state.loginForm.password || ''} onChange={this.changeHandler} placeholder="Eneter Value" >
                        </input>
                    </div>
                </div>
                <button className=" custBtn btn btn-success " onClick={this.submitHandler}>Subbmit</button>
                <button className=" custBtn btn btn-danger" onClick={this.formReset}>Clear Form</button>
            </form>
        )
    }


}// Class End 

export default LoginComponent

