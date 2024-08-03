import { Component } from "react";
import { AiFillEdit,AiFillDelete } from 'react-icons/ai'


import "./index.css"

class TodoItem extends Component {

    render(){
        const {todoDetails,onUpdate,onDeleteTodo} = this.props 
        const {description,status,id} = todoDetails
        return (
            <div className="eachtodoCard">
            <div className="text-style">
                <li>{description}</li>
                <p>status-{status}</p>

                </div>
            <div className="buttons-update-delete">
            <button className="uodate-button" onClick={()=>onUpdate(id)}><AiFillEdit className="edit"/></button>
            <button className="delete-button" onClick={()=>onDeleteTodo(id)} ><AiFillDelete className="delete"/></button>
            </div>
            </div>
        )
    }
}


export default TodoItem