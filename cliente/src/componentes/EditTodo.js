import React, {Fragment, useState} from 'react';

function EditTodo ({todo}) {

    const [description, setDescription] = useState(todo.description);

    const onChange = e => {        
        setDescription(e.target.value);
    }

    const updateDescription = async e => {
        e.preventDefault();
        
        try {
            const body = {"description": description};            
            const retorno = await fetch(`http://localhost:5000/puttodo/${todo.todo_id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })            
            window.location = '/';            

        } catch (error) {
            console.error(error.message);
        } 
    }

    return(
        <Fragment>
            
            <button type="button" className="btn btn-warning" data-toggle="modal" data-target={`#id${todo.todo_id}`}>Editar</button>
            
            <div className="modal" id={`id${todo.todo_id}`} onClick={() => setDescription(todo.description)}>
                <div className="modal-dialog">
                    <div className="modal-content">                
                    <div className="modal-header">
                        <h4 className="modal-title">Editar</h4>
                        <button type="button" className="close" data-dismiss="modal" onClick={() => setDescription(todo.description)}>&times;</button>
                    </div>
                    
                    <div className="modal-body">
                        <input type="text" className="form-control" value={description} onChange={onChange}></input>
                    </div>

                    <div className="modal-footer">
                    <button type="button" className="btn btn-warning" data-dismiss="modal" onClick={updateDescription}>Editar</button>
                        <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => setDescription(todo.description)}>Close</button>
                    </div>

                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default EditTodo;