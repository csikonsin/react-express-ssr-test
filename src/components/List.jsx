import React, { Component } from "react"



const getID = function(){
    return Math.floor(Math.random() * 1000000)
} 

export default class List extends Component{
    constructor(props) {
        super(props)
        this.state = { 
            input: "",
            values: [
                {
                    id: 10000,
                    value: "Hallo my name a Jeff"
                },
                {
                    id: 10001,
                    value: "This is a robbery"
                },
                {
                    id: 100002,
                    value: "Note"
                }] 
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
        this.handleItemDeleted = this.handleItemDeleted.bind(this)
        this.handleEditApply = this.handleEditApply.bind(this)
    }
    handleChange(e){
        this.setState({
            input : e.target.value
        })
    }

    handleAdd(e){
        if(this.state.input ==="")return
        this.setState((prev) =>({
            values: prev.values.concat({
                value: prev.input,
                id: getID()
            }),
            input : ""
        }))               
    }

    handleItemDeleted(id){
        this.setState((prev)=>{
            let newValues = prev.values

            for(let i=0; i<prev.values.length; i++){
                let element = newValues[i]
                if(element.id === id){
                    newValues.splice(i, 1)
                }
            }

            return {
                values: newValues
            }
        })
    }

    handleEditApply(id, value){
        let newValues = this.state.values
        for(let i=0; i< this.state.values.length; i++){
            let element = newValues[i]
            if(element.id === id){
                element.value = value
            }
        }
        this.setState({
            values: newValues
        })

        return true 
    }

    render(){
        return(
            <div className="list">
                <input type="text" onChange={this.handleChange} value={this.state.input} />
                <button onClick={this.handleAdd}>Add</button>
                <div className="list-items">
                {this.state.values.map((item, index) => {
                   return <ListItem value={item.value} id={item.id} key={item.id} onEditApply={this.handleEditApply} onItemDeleted={this.handleItemDeleted} />                    
                })}
         
                </div>
            </div>
        )
    }
}

class ListItem extends Component{
    constructor(props){
        super(props)
        
        this.state = {
            isEdit: false
        }

        this.handleClick = this.handleClick.bind(this)
        this.handleEditValueChange = this.handleEditValueChange.bind(this)
        this.handleEditApply = this.handleEditApply.bind(this)
    }

    handleClick(e,id){        
        this.props.onItemDeleted(id)
        e.preventDefault()
    }

    handleEditToggle(){

        let isEdit = !this.state.isEdit

        this.setState({
            isEdit: isEdit,
            editValue: this.props.value
        })

        if(!isEdit)return



    }

    handleEditValueChange(e){
        this.setState({
            editValue: e.target.value
        })
    }

    handleEditApply(){
        if(!this.props.onEditApply(this.props.id, this.state.editValue)){
            return
        }

        this.setState({
            isEdit: false,
            editValue: ""
        })
    }

    render(){
        let element  = <div>{this.props.value}</div>
        if (this.state.isEdit){
            element = (
                <div>
                    <input type="text" value={this.state.editValue} onChange={this.handleEditValueChange}/>
                    <button onClick={this.handleEditApply}>Apply</button>
                </div>
            )
        }

        return(
            <div className="list-item">
                {element}                
                <button onClick={ () => this.handleEditToggle(this.props.id)}>Edit</button>
                <button onClick={ (e) => this.handleClick(e,this.props.id)}>X</button>
            </div>
        )
    }
}