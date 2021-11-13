import './App.css';

import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

export default class App extends Component {
apiKey='7122767105a44a6eb355302a829fd6a6'
state={
  progress : 0
}

setProgress=(progress)=>{
  this.setState({progress: progress})
}

  render() {
    return (
      <div>
      <Router>
    
        <NavBar/>
        <LoadingBar
        color='#f11946'
        progress={this.state.progress}
      />

        <Switch>
          <Route exact path="/"><News setProgress={this.setProgress} apiKey={this.apiKey} key="general" country = "in" pageSize = {8} category= "general"/></Route>
          <Route exact path="/business"><News setProgress={this.setProgress} apiKey={this.apiKey} key="business" country = "in" pageSize = {8} category= "business"/></Route>
          <Route exact path="/entertainment"><News setProgress={this.setProgress} apiKey={this.apiKey} key="entertainment" country = "in" pageSize = {8} category= "entertainment"/></Route>
          <Route exact path="/general"><News setProgress={this.setProgress} apiKey={this.apiKey} key="general" country = "in" pageSize = {8} category= "general"/></Route>
          <Route exact path="/health"><News setProgress={this.setProgress} apiKey={this.apiKey} key="health" country = "in" pageSize = {8} category= "health"/></Route>
          <Route exact path="/science"><News setProgress={this.setProgress} apiKey={this.apiKey} key="science" country = "in" pageSize = {8} category= "science"/></Route>
          <Route exact path="/sports"><News setProgress={this.setProgress} apiKey={this.apiKey} key="sports" country = "in" pageSize = {8} category= "sports"/></Route>
          <Route exact path="/technology"><News  setProgress={this.setProgress} apiKey={this.apiKey} key="technology" country = "in" pageSize = {8} category= "technology"/></Route>
        </Switch>
      </Router>
      </div>
    )
  }
}
