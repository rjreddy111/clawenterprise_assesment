import { Component } from "react";
import TodoItem from "../TodoItem";

import "./index.css"



class Todos extends Component {
  
    state = {
        todos: [], 
        description: "", 
        status :""
    }

    componentDidMount(){
        this.fetchTodos()
    }

handleInputDescription =(event)=> {
    this.setState({description:event.target.value})
}

handleInputStatus = (event)=> {
    this.setState({status:event.target.value})
}

fetchTodos= async()=> {
    const jwtToken = localStorage.getItem("token")
    const response = await fetch ("http://localhost:4000/api/todos", {
        method:"GET",
        headers : {
            "Authorization" :`Bearer ${jwtToken}`,

        }
    })
    const data = await response.json()
    this.setState({todos:data})
}


handleCreateTodos = async(event)=> {
    event.preventDefault()
    const {description,status}= this.state
    const jwtToken = localStorage.getItem("token")
    try {
    const response =  await fetch ("http://localhost:4000/api/todos", {
        method: "POST", 
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${jwtToken}`
        },
        body : JSON.stringify({description,status})
    }); 
    if (!response.ok) {
        throw new Error ("Failed to create todo")
    }
    

    this.setState({description:"", status:""});
   
    this.fetchTodos()
    
} catch (error){
    console.log("Error found", error)

}

}


onupdateTodo= async(id)=> {
    const jwtToken = localStorage.getItem("token")
   
    const newDescription = prompt("Enter new description")
    const newStatus = prompt ("Enter new Status")
  
    if (newDescription && newStatus){

    await fetch(`http://localhost:4000/api/todos/${id}`, {
        method : "PUT",
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${jwtToken}`
        },
        body : JSON.stringify({description:newDescription,status:newStatus})

    });
    this.fetchTodos()

    }

}

onDeleteTodo = async(id)=> {
    const jwtToken = localStorage.getItem("token")
    await fetch (`http://localhost:4000/api/todos/${id}`, {
        method:"DELETE", 
        headers : {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${jwtToken}`
        }
    });
    this.fetchTodos()


}


    render(){

        const {description,status,todos} = this.state 
        console.log(todos)
        return (

            <div className="todo-main-page">
            <h1>To-dos List</h1>
            
        <form onSubmit={this.handleCreateTodos} className="todo-form-card" >
          <input
            type="text"
            name="description"
            placeholder="Description"
            value ={description}
           
            onChange={this.handleInputDescription}
             className="todos-description"
            required
          />
          
          <input
            type="text"
            name="status"
            placeholder="Status"
            
            onChange={this.handleInputStatus}
            className="todos-description"
            value={status}
            required
          />
          <button type="submit" className="add-todo-button">Add To-Do</button>
          
        </form>
            <div className="added-todo-item">
                {todos.map((eachTodo)=> (
                    <TodoItem key = {eachTodo.id} todoDetails = {eachTodo} onUpdate={this.onupdateTodo} onDeleteTodo={this.onDeleteTodo} />
                ))}
            </div>

        </div>
        )
    }
}



export default Todos