import React, { Component } from 'react';
import Nav from './Components/Nav/Nav'
import Footer from './Components/Footer/Footer'
import routes from './routes';

import './App.scss';
import './reset.scss';

class App extends Component {
constructor() {
  super();
  this.state = {
  }
}


  render() {
    console.log('isModalOpen: ', this.state.isModalOpen);
    return (
      <div className='appContainer'>
        <Nav />
        {routes}
        <Footer />
      </div>
    );
  }
}


export default App;
