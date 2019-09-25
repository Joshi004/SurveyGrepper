import React, { Component } from 'react'
import './login.scss';
import '../CommonCode/Validators'
import { validatePassword, validateMail } from '../CommonCode/Validators';
import  DynamicFormComponent from '../DynamicForm/dform'

class LoginComponent extends Component {
    constructor() {
        super()
        this.state = {
            formData:[],
            loginForm: {
                userID: '',
                password: ''
            }
        }
    }
    formData = []
    componentDidMount(){
        
        console.log("Component is mounted")
        fetch('/src/Data/Mock/formData.JSON')
        .then( data => data.json())
        .then((data)=>{
            console.log("Fetched data is",data)
            this.formData = data
        })
        .catch((err)=>{
            console.log("Could not fetch formDatafromServer loading MockData")
            this.formData = require('../Data/Mock/formData.json')
        });
    }

    changeHandler = (event) => {
        // console.log("This is change handler invoked")
        const name = event.target.name
        const value = event.target.value

        this.setState({
            ...this.state,
            loginForm: { ...this.state.loginForm, [name]: value }
        }, () => {
            // console.log(this.state.loginForm)
        })

    }


    submitHandler = (event) => {
        // console.log("Subbmitted Data is ", this.state.loginForm)
        event.preventDefault()
    }

    blurHandler = (event) => {
        var inputType = event.target.name
        var value = event.target.value
        var result =  false
        if(inputType === 'userID'){
            result = validateMail(value)
        }else if (inputType === 'password'){
            result = validatePassword(value)
        }
        return result
        // console.log("Validation result is ", result)
    }

    formReset = (event) => {
        // console.log("This resets the form")
        this.setState({
            ...this.state,
            loginForm: {}
        })
        event.preventDefault()
    }

    onSubmit(model){
        console.log("Parent Submit",model)
    }

    render() {
        return (
            <div>
                <form className="container formContainer">
                <div className="formHeading">Enter You Credentials</div>
                <div>
                    <img className="formImage" src="/loginImage.jpg" alt="LoginImg"></img>
                </div>
                <div className="innerForm">
                    <div className="formGroup inputGroup">
                        <label className="inputEntity inputLabel">User ID</label>
                        <input className="formControl textInput inputEntity textInput"
                            type='text'
                            name="userID"
                            value={this.state.loginForm.userID || ''}
                            onChange={this.changeHandler}
                            onBlur={this.blurHandler}
                            placeholder="Eneter Value"
                        >
                        </input>
                    </div>
                    <div className="formGroup inputGroup">
                        <label className="inputEntity inputLabel">Password</label>
                        <input className="textInput formControl inputEntity textInput"
                            type='password'
                            name="password"
                            value={this.state.loginForm.password || ''}
                            onChange={this.changeHandler}
                            onBlur={this.blurHandler}
                            placeholder="Eneter Password" >
                        </input>
                    </div>
                </div>
                <button className=" custBtn btn btn-success " onClick={this.submitHandler}>Subbmit</button>
                <button className=" custBtn btn btn-danger" onClick={this.formReset}>Clear Form</button>
            </form>

            <DynamicFormComponent
            title="New Survey"
            model = {[
                {key:"1",label:"Name",props:{required:true}},
                {key:"2",label:"Age",type:"number"},
                {key:"3",label:"Rating",type:"number",props:{min:0,max:5}},
                {key:"4",label:"Qualification"}
                ]}
                onSubmit = {(model)=> { this.onSubmit(model) }}
            >
                
            </DynamicFormComponent>

            </div>
        )
    }


}// Class End 

export default LoginComponent

