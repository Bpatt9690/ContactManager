import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Contacts from './pages/Contacts'
import Navbar from './components/navbar_component'





function App() {


  return (
    <>
    

    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css"/>
    <Navbar />
    <Router >
      <Switch>

        <Route path="/" exact>
          <Homepage />
        </Route>

        <Route path="/Login" exact >
          <Login />
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






export default App;