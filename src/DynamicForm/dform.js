import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './dform.scss'

export default class DynamicFormComponent extends Component {
    constructor(props) {
        super(props)
    }
    state = {}

    componentWillMount(){
        this.setState(
            {formModel:this.props.model || {}}
        )
    }


    submitEventHandler(event) {
        console.log("Submit called for DForm")
        this.props.onSubmit(this.state)
        event.preventDefault()
    }


    renderForm(){
        console.log("This is model Object", this.props.model)
        var model = this.state.formModel
        var formUI = model.map((field) => {
            return (
                <div key={field.key} className="">
                    <label  htmlFor={field.key}>
                    {field.label}
                    </label>
                    <input {...field.props} type={field.type}>
                    </input>                    
                </div>
            )
        })
        return formUI
    }

    changeFormData = (e)=>{
        this.setState({
            ...this.setState,
            formModel:{
                ...this.state.formModel,
                [this.state.formModel[0].label]:"Naresh"

            }
        }
        )
        e.preventDefault()
    }

    render() {
        let title = this.props.title || "Dynamic Form"
        return (
        <div className = "dynamicPage">
            <button onClick={this.changeFormData}>
                Chnage Form Content
            </button>
            <div className="container dynamicFormContainer">
            <div className="formHeading">{title}</div>
            
            <form onSubmit={(event) => { this.submitEventHandler(event) }}>
            {this.renderForm()}
                <div className="btnGrp">
                    <button type='submit'>Submit</button>
                </div>
            </form>
        </div>)
        </div>
        )
    }
}