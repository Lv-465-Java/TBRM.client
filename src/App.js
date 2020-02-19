import React from 'react';
import './App.css';
import Routers from './routers';

import Footer from './components/footer/footer';
import Header from './components/header/header';



function App() {
  return (
    <div className="App">
      <Header/>
      <Routers/>
      <Footer/>
    </div>
  );
}

export default App;
