import React from 'react';
import './App.css';

function App() {
  const toggleNav = () => {
    // Implement toggleNav functionality here if required
  };

  return (
    <div className="App">
      <div id="root"></div>
      <div id="content">
        <button className="openbtn" onClick={toggleNav}>☰</button>
        <div className="header">
          <h1>Auslan Hand Sign Learning</h1>
          <p>Improving the Quality of Hand Sign Learning One at a time </p>
          <button className="cta-button" onClick={() => window.location.href = 'course.html'}>Start Now</button>
        </div>
        <div className="services">
          <div className="service">
            <h2>Explore Our Course</h2>
            <p>A machine learning model that will recognize the hand sign you made, making sure that you are on the right path</p>
            <button className="cta-button" onClick={() => window.location.href = 'course.html'}>Start Now</button>
          </div>
          <div className="service">
            <h2>Getting More Insight</h2>
            <p>Learn more about the current situation of Auslan, and the population of the disabled population</p>
            <button className="cta-button" onClick={() => window.location.href = 'insight.html'}>Click here!</button>
          </div>
          <div className="service">
            <h2>About Us</h2>
            <p>Want to know more about us and what we do?</p>
            <p>Find out more!</p>
            <button className="cta-button" onClick={() => window.location.href = 'about.html'}>About</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
