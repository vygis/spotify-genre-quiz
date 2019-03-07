import React from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import AboutPage from './aboutPage';
import QuizPage from './quizPage';

const App = () => (
  <Router>
    <>
      <nav className="navbar navbar-dark">
        <Link className="navbar-brand text-uppercase" to="/">Spotify Artwork Quiz</Link>
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link" to="/about/" activeClassName="active">About</NavLink>
          </li>
        </ul>
      </nav>
      <main className="container-fluid pt-3">
        <div className="row">
          <Route path="/" exact component={QuizPage} />
          <Route path="/about/" component={AboutPage} />
        </div>
      </main>
    </>
  </Router>
);

export default hot(App);
