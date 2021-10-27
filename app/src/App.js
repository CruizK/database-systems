import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./routes/Home";
import MainView from './routes/MainView';
import UserProvider from './components/UserProvider';

function App() {
  return (
    <Router>
      <UserProvider>
        <Route exact path="/" component={Home}/>
        <Route path="/main" component={MainView} />
      </UserProvider>
    </Router>
  );
}

export default App;
