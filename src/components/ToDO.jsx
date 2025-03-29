import { useState,useEffect } from "react";

const ToDO = () => {

    const [todos,setTodos] = useState(()=>{
        const storeTodos = localStorage.getItem('todos');
        return storeTodos ? JSON.parse(storeTodos) : [];
    })

    const [newTodo,setNewTodo] = useState("");

    const handleChange = (event) =>{
        setNewTodo(event.target.value);
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        if(newTodo.trim() === "") return;
        setTodos([...todos,newTodo]);
        setNewTodo("");
    }  
    const handleDelete = (index) =>{
        const updateTodos = todos.filter((todo,i) => i!==index);
        setTodos(updateTodos);
    }
    useEffect(()=> {
        localStorage.setItem("todos",JSON.stringify(todos));
    },[todos])
  return (
    <div>
        <h1>Simple To-DO Lista</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder='Add a new todo' value={newTodo} onChange={handleChange}/>
            <button type='submit'>Add</button>
        </form>
        <ul>
            {/*Display todos */}
            {todos.map((todo,index) =>(
                <p key={index}>{todo}
                    <button onClick={()=>handleDelete(index)}>Delete</button>

                </p>
            ))}
        </ul>
    </div>
  )
}

export default ToDO;
