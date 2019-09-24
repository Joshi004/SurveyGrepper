import React, { Component } from 'react'
import './login.scss';
import '../CommonCode/Validators'
import { validatePassword, validateMail } from '../CommonCode/Validators';
import  DynamicFormComponent from '../DynamicForm/dform'
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
    formData= [
        {
          "id":1,
          "name":"a",
          "age":29,
          "qualification":"B.Com",
          "rating":3,
          "profile":"./loginImage.jpg"
        },
        {
          "id":2,
          "name":"b",
          "age":23,
          "qualification":"B.Com",
          "rating":4,
          "profile":"./loginImage.jpg"
        },
        {
          "id":3,
          "name":"c",
          "age":21,
          "qualification":"B.Com",
          "rating":2,
          "profile":"./loginImage.jpg"
        },
        {
          "id":4,
          "name":"d",
          "age":49,
          "qualification":"B.Com",
          "rating":1,
          "profile":"./loginImage.jpg"
        }
      ]
    componentDidMount(){
        
        console.log("Component is mounted")
        fetch('./Data/Mock/formData.json').then((data)=>{
            console.log("This is fetched data",data)
        }).catch((err)=>{
            console.log("There was some error fetching data : ",err)
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
                {key:"name",label:"Name",props:{required:true}},
                {key:"age",label:"Age",type:"number"},
                {key:"rating",labe:"Rating",type:"number",props:{min:0,max:5}},
                {key:"qualification",label:"Qualification"}
                ]}
                onSubmit = {(model)=> { this.onSubmit(model) }}
            >
                
            </DynamicFormComponent>

            </div>
        )
    }


}// Class End 

export default LoginComponent

