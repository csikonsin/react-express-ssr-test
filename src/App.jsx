import React, { Component } from "react"
import List from "./components/List"
import Calc from "./components/Calc"
export default class App extends Component{
    constructor(props){
        super(props)
        this.state = {
            name: "Daniel22s2"
        }
    }
    render(){
        return(
            <div className="app-body">
            <p>Hello my name iss <b>{this.state.name}</b>!!!!!!</p>
            <List/>
            <Calc/>
            </div>
        )
    }
}