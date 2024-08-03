

import { Component } from "react";
import { useNavigate } from "react-router-dom";


import "./index.css"


class Login extends Component {

    state = {username:"", password:"",token:"",err:""}


    onChangeUsername = (event)=> {
        this.setState({username:event.target.value})
    }

    onChangePassword = (event)=> {
        this.setState({password:event.target.value})
    }

   


    onSubmitLoginForm = async(event)=> {
        event.preventDefault()
        const {username,password} = this.state

        try {
       
        const response = await fetch("http://localhost:4000/api/userAuth/login", {
            method:"POST",
            headers: {
                "Content-Type": "application/json",
              },
            body : JSON.stringify({username:username, password:password})
        })
        if (!response.ok) {
            const errorText = await response.text();
            console.error("Server error:", errorText);
            this.setState({err:errorText})
            return;
          }


        const data = await response.json();
        console.log(data)
       
            this.setState({ token: data.token });
            localStorage.setItem('token', data.token)

            this.props.navigate("/todos")
       
        }
        catch(error) {
                this.setState({err:"Please try again later"})
        }

    }

    render(){
        const {password,username,err} = this.state
        
        
            return (
            <div className="register-main-page">
            
            <form className="form-style" onSubmit={this.onSubmitLoginForm}>
            <h1 className="register-heading">Login Page</h1> 
            <hr className="horizontal-line"/>
            <label>Username</label>
            <input type = "text" value={username} placeholder="Enter Username" className="input-style" onChange={this.onChangeUsername} required />
            <br/>
            <label>Password</label>
            <input type = "password" value={password} placeholder="Enter Your Password" className="input-style" onChange={this.onChangePassword} required /> 
            
            <p className="err">{err}</p>
            <button type ="submit"  className="login-button login-page">Login</button>

            </form>
            </div>

        )
    }
}


export default function RouteToTodos(props) {
    const navigate = useNavigate();
    return <Login {...props} navigate={navigate} />;
  }


