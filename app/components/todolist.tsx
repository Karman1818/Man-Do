"use client"

import { Plus } from "lucide-react"
import {useEffect, useState} from "react";
import {Todo} from "./todo"
import {db} from "@/firebase.config";
import {query, collection, onSnapshot, updateDoc, doc, addDoc, deleteDoc} from "@firebase/firestore";


export const TodoList = () => {

    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');


    // Creating todo
    const createTodo = async (e) => {
        e.preventDefault(e)
        if (input === ''){
            alert('please enter a valid task')
            return
        }
        if (input.length > 200){
            alert('Your task cant contain more than 200 characters')
            return
        }
        await addDoc(collection(db, 'Data'),{
            task: input,
            is_done: false,

        })
        setInput('')

    }
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
    const  toggleComplete = async (todo) => {
      await updateDoc(doc(db,'Data',todo.id), {
          is_done: !todo.is_done
      })
    }
    // Deleting todo
    const deleteTodo = async (id) => {
        await deleteDoc(doc(db,'Data',id))
    }


    // Debouncing


    return(
        <>
            <h3 className="text-3xl sm:text-2xl md:text-3xl lg:text-3xl font-lexend flex justify-center m-16 px-8 sm:px-16 md:px-24 drop-shadow-xl text-center">
                To-Do List
            </h3>
            <form onSubmit={createTodo}>
                <input value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder={'Add Todo'}/>
                <button type={"submit"}><Plus size={30}/></button>
            </form>
            <ul>
                {todos.map((todo, index) => (
                    <Todo key={index} todo={todo} toggleComplete={toggleComplete} deleteTodo={deleteTodo}/>
                ))}

            </ul>
            <p>You have {todos.length} tasks</p>

        </>
    )
}