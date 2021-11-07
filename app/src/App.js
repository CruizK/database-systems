import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Home from "./routes/Home";
import UserProvider from './components/UserProvider';
import Navbar from './components/Navbar';
import Students from './routes/Students';
import Staff from './routes/Staff';
import Faculty from './routes/Faculty';
import Courses from './routes/Courses';
import Department from './routes/Department';
import Enrollment from './routes/Enrollment';
import UserContext from './userContext';
import StudentView from './routes/StudentView';

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
  const { user } = useContext(UserContext);

  if(user == null) return <Redirect to="/" />

  return (
    <div>
      <Navbar />
      <ProtectedRoute path="/students" Component={Students} />
      <ProtectedRoute path="/departments" Component={Department} />
      <ProtectedRoute path="/staff" Component={Staff} />
      <ProtectedRoute path="/faculty" Component={Faculty} />
      <ProtectedRoute path="/courses" Component={Courses} />
      <ProtectedRoute path="/enrollment" Component={Enrollment} />
      <Route path="/studentview" component={StudentView} />
    </div>
  )
}

function ProtectedRoute({ Component, path }) {
  const { user } = useContext(UserContext);


  console.log(user.role);
  return <Route path={path} render={() => {
    if(user.role != 'Faculty' && user.role != 'Staff') {
      return <Redirect to="/" />
    }

    return <Component />
  }} />
}

export default App;
