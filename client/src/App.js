import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from 'react-router-dom'
import React from 'react'
import Header from './components/Header'
import WriteBlog from './components/WriteBlog'
import HomePage from './components/HomePage'
import ReadBlog from './components/ReadBlog'
class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
      return (
        <Router>
          <Header />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/writeblog" component={WriteBlog} />
            <Route path="/readblog" component={ReadBlog}/>
          </Switch>
        </Router>
      )
    }
}

export default App;