import React,{ Fragment } from 'react';
import './App.css';
import AddEmployee from './components/AddEmployee';
import ViewEmployees from './components/viewEmployees';

function App() {
  return (
    <Fragment>
      <div className='container'>
        <AddEmployee />
        <ViewEmployees />
      </div>
    </Fragment>
  );
}

export default App;
