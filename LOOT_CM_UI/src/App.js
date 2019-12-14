import React from 'react';
import './App.css';

function App() {
  return (
    <div>
      <Router>
        <Route exact path="/" component={App}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/register" component={Register}></Route>
        <Route path="/main" component={Main}></Route>
        <Route path="/profile" component={Profile}></Route>
      </Router>
    </div>
  );
}

export default App;
