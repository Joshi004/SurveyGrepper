import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './dform.scss'

export default class DynamicFormComponent extends Component {
    constructor(props) {
        super(props)
    }
    state = { selectedKey: 0 }


    componentWillMount() {
        this.setState(
            { formModel: this.props.model || {} }
        )
    }


    submitEventHandler(event) {
        console.log("Submit called for DForm")
        this.props.onSubmit(this.state)
        event.preventDefault()
    }

    changeFormData = () => {
        this.state.formModel[0].label += " Changed "
        var newFormModel = this.state.formModel
        this.setState({
            formModel: newFormModel
        }
        )
    }

    editField(current_key) {
        console.log("Edit Key : ", current_key)
        this.setState({
            ...this.state,
            selectedKey: current_key
        })
    }

    getIndex = (key, ) => {
        console.log("Inside getIndex", key)
        for (let i = 0; i < this.state.formModel.length; i++) {
            var current_key = this.state.formModel[i].key
            console.log("Current key in loop is ", current_key, key)
            if (current_key == key) {
                return i
            }
        }
    }

    deleteField(current_key) {
        console.log("This is Delete for ", current_key)

        var index = this.getIndex(current_key)
        console.log("Returned index is", index)
        if (index != undefined) {
            this.state.formModel.splice(index, 1)
            this.setState({
                ...this.state
            })
        }
    }

    renderForm() {
        console.log("This is model Object", this.props.model)
        var model = this.state.formModel
        var formUI = model.map((field) => {
            return (
                <div key={field.key} className="fieldDiv">
                    <div className="fieldOptions">
                        <span onClick={() => { this.editField(field.key) }} className="fa-pencil-square">Edit </span>
                        <span onClick={() => { this.deleteField(field.key) }} className="fa-times" aria-hidden="true"> Delete</span>
                    </div>
                    <label htmlFor={field.key}>
                        {field.label}
                    </label>
                    <input {...field.props} name="nar" type={field.type}>
                    </input>
                </div>
            )
        })
        return formUI
    }

    handleValueChange = (event) => {
        console.log("Updating name", event.target)
        console.log("Trying to chnage value", event.target.value)
        var index = this.getIndex(this.state.selectedKey)
        var key = event.target.name
        var value = event.target.value
        this.state.formModel[index][key] = value
        this.setState(this.state)

    }


    render() {
        let title = this.props.title || "Dynamic Form"
        return (
            <div className="dynamicPage">

                <div className="dynamicLeft">
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

                {/* Dynamic Right Now */}
                <div className="DynamicRight">
                    <div className='rightHead'>{title}</div>

                    <div className="questionDiv">
                    <div className="questionHead">Response Type</div>

                    </div>

                    <hr/>

                    <div className="questionDiv">
                        <div className="questionHead">Question</div>
                        <div className="questionBody">
                            <input name='label' type="text" onChange={this.handleValueChange} value={this.state.formModel[this.state.selectedKey].label} ></input>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}