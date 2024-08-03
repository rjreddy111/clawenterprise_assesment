import {Component} from "react"
import { useNavigate } from "react-router-dom"

import "./index.css"

class Register extends Component {

    state = {
        username: "", password: "",err:""
    }

onChangeUsername = (e)=> {
    this.setState({username:e.target.value})
}


onChangePassword = (e)=> {
    this.setState({password:e.target.value})
}


onSubmitForm = async(event)=> {
    event.preventDefault()
    const {username,password} = this.state
    
    try {
        const response = await fetch("http://localhost:4000/api/userAuth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username:username, password:password }),
        });
  
        


        if (!response.ok) {
          const errorText = await response.text();
          console.error("Server error:", errorText);
          this.setState({err:"User already exists"})
          return;
        }
  
        const data = await response.text();
        console.log("Response:", data);
        this.props.navigate("/login")
      } catch (error) {
        console.error("Fetch error:", error);

        this.setState({err:error})
      }
}

    render(){

        const {username,password,err} = this.state 
        console.log(username)
        return (
            <div className="register-main-page">
           

            <form className="form-style" onSubmit={this.onSubmitForm}>
            <h1 className="register-heading">Register Todos Applications</h1>
            <hr className="horizontal-line"/>

                <label className="label">Username:</label>
                
                <input type = "text" value={username} placeholder="Enter  Username" className="input-style" onChange={this.onChangeUsername} required />
               
                <label>Password :</label>

                <input type = "password" value={password} placeholder="Enter Your Password" className="input-style" onChange={this.onChangePassword} required />
                <p className="err">{err}</p>
                <div className="buttons-container">
                <button className="register-button" type ="submit">Register</button>
                <button className="login-button" onClick={()=>this.props.navigate("/login")}>Login</button>
                </div>
                
                
            </form>
            </div>
        )
    }
}

export default function RouteToLogin(props) {
    const navigate = useNavigate();
    return <Register {...props} navigate={navigate} />;
  }


