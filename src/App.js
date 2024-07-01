import './App.css';
import {Route,Redirect,Switch} from 'react-router-dom'
import Movies from './components/movies'
import React, { Component } from 'react';
import NotFound from './components/notFound';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NavBar from './components/navBar';
import MovieForm from './components/movieForm';
import LoginForm from './components/loginForm';

class App extends Component {
  state = {  } 
  render() { 
    return (
      <>
      <NavBar/>
      <main className='container'>
        <Switch>
          <Route path="/login" component={LoginForm}></Route>
          <Route path="/movies/:id" component={MovieForm}></Route>
          <Route path="/movies" component={Movies}></Route>
          <Route path="/customers" component={Customers}></Route>
          <Route path="/rentals" component={Rentals}></Route>
          <Route path="/notFound" component={NotFound}></Route>
          <Redirect from="/" exact to="/movies"/>
          <Redirect to="/notFound"/>
        </Switch>
      </main>
      </>
    );
  }
}
 
export default App;
