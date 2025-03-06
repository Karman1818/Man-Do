import {Trash2} from "lucide-react";

export const Todo = ({todo}) => {
    return(
        <li >
            <div>
                <input type="checkbox"/>
                <p>{todo.task}</p>
                <button>{<Trash2 size={30}/>}</button>
            </div>
        </li>
    )
}