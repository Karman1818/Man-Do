"use client"

import { Plus } from "lucide-react"
import {useEffect, useState} from "react";
import {Todo} from "./todo"
import {db} from "@/firebase.config";
import {query, collection, onSnapshot} from "@firebase/firestore";

export const TodoList = () => {

    const [todos, setTodos] = useState([])

    // Creating todo
    // Reading todos
    useEffect(() => {
        const q = query(collection(db, 'Data'))
        const unsubscribe = onSnapshot(q,(querySnapshot) => {
            let  todosArr = [];
            querySnapshot.forEach((doc) => {
                todosArr.push({...doc.data(), id: doc.id})
            });
            setTodos(todosArr)
        })
        return () => unsubscribe()
    },[])
    // Updating todo
    // Deleting todo

    return(
        <>
            <h3 className="text-3xl sm:text-2xl md:text-3xl lg:text-3xl font-lexend flex justify-center m-16 px-8 sm:px-16 md:px-24 drop-shadow-xl text-center">
                To-Do List
            </h3>
            <form>
                <input type="text" placeholder={'Add Todo'}/>
                <button><Plus size={30}/></button>
            </form>
            <ul>
                {todos.map((todo, index) => (
                    <Todo key={index} todo={todo}/>
                ))}

            </ul>
            <p>You have 2 todos</p>

        </>
    )
}