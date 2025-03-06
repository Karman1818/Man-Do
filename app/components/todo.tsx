import {Trash2} from "lucide-react";

export const Todo = ({todo, toggleComplete, deleteTodo}) => {
    return(
        <li >
            <div>
                <input onChange={() => toggleComplete(todo)} type="checkbox"/>
                <p onClick={() => toggleComplete(todo)}>{todo.task}</p>
                <button onClick={() => deleteTodo(todo.id)}>{<Trash2 size={30}/>}</button>
            </div>
        </li>
    )
}