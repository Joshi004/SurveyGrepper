import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import './dform.scss'

export default class DynamicFormComponent extends Component{
constructor(props){
    super(props)
    
}
state = {}

submitEventHandler(event){
console.log("Submit called for DForm")
this.props.onSubmit(this.state)
event.preventDefault()
}


render(){
    let title = this.props.title || "Dynamic Form" 
    return(<div>
        <h3>{title}</h3>
        <form onSubmit={(event)=>{this.submitEventHandler(event)}}>
            <div className = "btnGrp">
                <button type='submit'>Submit</button>
            </div>
        </form>
    </div>)
}
}