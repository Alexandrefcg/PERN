import React, {Fragment, useEffect, useState} from 'react';
import EditTodo from './EditTodo'

function ListTodo () {

    const [atividades, setAtividades] = useState([]);

    const getTodos = async() => {        
        try {
            const response = await fetch("http://localhost:5000/getalltodos");
            const retorno  = await response.json();
            setAtividades(retorno);
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        getTodos();
    }, []);
    
    const removerAtividade = async(id) => {
        try {
            const remover = await fetch(`http://localhost:5000/deletetodo/${id}`, {
                method: "DELETE"
            });
            setAtividades(atividades.filter(todo => todo.todo_id !== id));
        } catch (erro) {
            console.error(erro.message);
        }
    }
    

    return(        
        <Fragment>
            <div className="container">
                <h1 className="text-center mt-5">Todas Atividades</h1>                
                <table className="table mt-5 text-center">
                    <thead>
                        <tr>
                            <th>Descrição</th>
                            <th>Editar</th>
                            <th>Remover</th>
                        </tr>
                    </thead>
                    <tbody>                    
                    {atividades.map(todo => (
                        <tr key={todo.todo_id}>
                            <td>{todo.description}</td>
                            <td><EditTodo todo={todo}/> </td>
                            <td><button className="btn btn-danger" onClick={() => removerAtividade(todo.todo_id)}>Remover</button></td>
                        </tr>
                    ))}                    
                    </tbody>
                </table>
            </div>
        </Fragment>        
    );
}

export default ListTodo;