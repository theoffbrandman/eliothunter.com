import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './Header';
import Home from './index';
import Contact from './Contact';
import NotFound from './NotFound';
import './App.css';

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} /> {/* Catch-all route for 404 */}
        </Switch>
      <Footer />
    </Router>
  );
}

export default App;