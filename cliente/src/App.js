import React, {Fragment} from 'react';
import "./App.css";
import InputTodo from './componentes/InputTodo'
import ListTodo from './componentes/ListTodo'

function App() {
  return(
    <Fragment>      
        <InputTodo />    
        <ListTodo />
    </Fragment>
  );
}

export default App;
