import React from 'react';
import './Login.css';
import fire from './Firebase';


class Login extends React.Component{

    constructor(props){
        super(props);
        this.handleChange=this.handleChange.bind(this);
        this.login=this.login.bind(this);
        this.state = {
            email:'',
            password:'',
        }

    }

    login(e){
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.email,this.state.password).then((u)=>{}).catch((error)=>{alert("Correo o contraseña incorrectos");});
    }

    handleChange(e){  
        this.setState({ [e.target.name]: e.target.value });
    }

    render(){
        return (<div id="logreg-forms">
            <form className="form-signin">
            <h1 className="h3 mb-3 font-weight-normal"> Sign in</h1>
            
            <input type="email" value={this.state.email} name="email" onChange={this.handleChange} id="inputEmail" className="form-control" placeholder="Email address" required="" autoFocus=""/>
            <input type="password" value={this.state.password} name="password" onChange={this.handleChange} id="inputPassword" className="form-control" placeholder="Password" required=""/>
            
            <button className="btn btn-success btn-block" type="submit" onClick={this.login} ><i className="fas fa-sign-in-alt"></i> Sign in</button>
            
            <button className="btn btn-primary btn-block" type="button"  id="btn-signup"><i className="fas fa-user-plus"></i> Sign up New Account</button>
            </form>
            </div>)
    }
}

export default Login;