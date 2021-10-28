import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./routes/Home";
import MainView from './routes/MainView';
import UserProvider from './components/UserProvider';
import Navbar from './components/Navbar';
import Students from './routes/Students';
import Staff from './routes/Staff';
import Faculty from './routes/Faculty';
import Courses from './routes/Courses';

function App() {
  return (
    <Router>
      <UserProvider>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/" component={DefaultContainer} />
        </Switch>
      </UserProvider>
    </Router>
  );
}

function DefaultContainer() {
  return (
    <div>
      <Navbar />
      <Route path="/main" component={MainView} />
      <Route path="/students" component={Students} />
      <Route path="/staff" component={Staff} />
      <Route path="/faculty" component={Faculty} />
      <Route path="/courses" component={Courses} />
    </div>
  )
}

export default App;
