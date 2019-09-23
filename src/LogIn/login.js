import React, { Component } from 'react'
import './login.scss'

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
            loginForm: { [name]: value },
            loginForm: { [name]: value }
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
            loginForm:{
            }
        })
    }

    render() {
        return (
            <form>
                <div>
                    <label>User ID</label>
                    <input type='text' name="userID" value={this.state.loginForm.userID || ''} onChange={this.changeHandler} placeholder="Eneter Value" >
                    </input>
                </div>
                <div>
                    <label>Password</label>
                    <input type='password' name="password" value={this.state.loginForm.password || ''} onChange={this.changeHandler} placeholder="Eneter Value" >
                    </input>
                </div>
                <button onClick={this.submitHandler}>Subbmit</button>
                <button onClick = {this.formReset}>Clear Form</button>
            </form>
        )
    }


}// Class End 

export default LoginComponent

