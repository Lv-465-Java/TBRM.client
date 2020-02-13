import React from 'react';
import logo from './logo.svg';
import './App.css';
import Routers from './Routers';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';


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
