import {Trash2} from "lucide-react";

export const Todo = ({todo, toggleComplete, deleteTodo}) => {
    return (
        <li className="flex items-center justify-between px-4 py-3 bg-white border-2 border-black rounded-lg mb-2 last:mb-0 hover:bg-gray-50 transition-colors duration-200">
            <div className="flex items-center gap-3 flex-1">
                <input
                    onChange={() => toggleComplete(todo)}
                    type="checkbox"
                    className="w-5 h-5 text-black border-2 border-gray-300 rounded focus:ring-black focus:ring-2 cursor-pointer"
                />
                <p
                    className={`text-lg flex-1 cursor-pointer ${
                        todo.is_done ? 'line-through text-gray-400' : 'text-black'
                    }`}
                >
                    <span className="flex gap-2">
                        {todo.task}
                        <span className="text-gray-500">-</span>
                        {todo.points}
                    </span>
                </p>
            </div>
            <button
                onClick={() => deleteTodo(todo.id)}
                className="text-black hover:text-gray-600 transition-colors duration-200 p-1"
            >
                <Trash2 size={24} className="stroke-current"/>
            </button>
        </li>
    );
};