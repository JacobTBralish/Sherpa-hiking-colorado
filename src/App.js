import React, { Component } from 'react';
import Nav from './Components/Nav/Nav'
import Footer from './Components/Footer/Footer'
import routes from './routes';
import './App.css';
import './reset.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
            <header className='navContainer'>
                <Nav />
            </header>
            {routes}
            <footer>
                <Footer />
            </footer>
      </div>
    );
  }
}

export default App;
