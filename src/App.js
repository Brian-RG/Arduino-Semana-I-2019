import React from 'react';
import './App.css';
import fire from './Firebase';
import Login from './Login';
import Home from './Home';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      user:null,
    }
  }

  
  componentDidMount(){
    this.authListener();
  }
  
  authListener(){
    fire.auth().onAuthStateChanged((user) => {
      //console.log(user);
      if(user){
        this.setState({user});
        //localStorage.setItem('user',user.uid);
      }
      else{
        this.setState({user:null});
        //localStorage.removeItem('user');
      }
    });
  }


  render(){
    return (
      <div className='App'>
        {this.state.user ? <Home/>: <Login/>}
      </div>

    )
  }
}


export default App;
