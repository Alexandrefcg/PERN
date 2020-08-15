import React, {Fragment, useState} from 'react';

function InputTodo () {

    const [description, setDescription] = useState("");

    const onChange = e => {
        setDescription(e.target.value);
    }
    
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const body = {description};
            const response = await fetch("http://localhost:5000/todos", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            window.location = "/";
        } catch (error) {
            console.error({"deu ruim": error.message});
        }
    }
    return(        
        <Fragment>
            <div className="container">
                <h1 className="text-center mt-5">Lista de atividades</h1>
                <form onSubmit={onSubmit} className="d-flex mt-5">
                    <input type="text" className="form-control" value={description} name="description" onChange={onChange}/>
                    <button className="btn btn-success">Adicionar</button>
                </form>
            </div>
        </Fragment>        
    );
}

export default InputTodo;