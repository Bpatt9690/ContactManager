import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react'
import { Button, Form, Modal, Segment, Message, Header, Card } from 'semantic-ui-react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import About from './pages/About';
import cookie from 'js-cookie'
import Contacts from './pages/Contacts'

function App() {
  return (
 <>
<nav className="navbar navbar-expand-lg navbar navbar-dark bg-dark" > 

<a className="navbar-brand" href="#">Contact Manager</a>
<div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <a className="nav-link" href="/Home">Home <span class="sr-only">(current)</span></a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/About">About</a>     
      </li>
    </ul>
  
<button class="ui primary button" onClick = {handleLogout}>       
Logout
</button>  
  </div>   
  </nav> 
<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css"/>

    

    <Router >
      <Switch>
        <Route path="/" exact>
          <Homepage />
          
        </Route>

        <Route path="/Login" exact >
        
          <Login />
        </Route>

        <Route path="/About" exact>
          <About />
        </Route>
        
        <Route path="/signup" exact>
          <Signup />
        </Route>
        <Route path="/contacts" >
          <Contacts />
        </Route>
        <Redirect to="/" />        
      </Switch>  
    </Router>
    
    </>
    
  );
  
}

function handleLogout(){
cookie.remove("token");
window.location.href = '.Login'
}

 


export default App;