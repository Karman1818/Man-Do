"use client"

import { Plus } from "lucide-react"
import {useEffect, useState} from "react";
import {Todo} from "./todo"
import {db} from "@/firebase.config";
import {query, collection, onSnapshot, updateDoc, doc, addDoc, deleteDoc} from "@firebase/firestore";


export const TodoList = () => {

    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');
    const [points, setPoints] = useState(0)
    const [completedPoints, setCompletedPoints] = useState(0);
    const [totalPoints, setTotalPoints] = useState(0);



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
            points:points,

        })
        setInput('')
        setPoints(0)

    }
    // Reading todos
    useEffect(() => {
        const q = query(collection(db, 'Data'))
        const unsubscribe = onSnapshot(q,(querySnapshot) => {
            let todosArr = [];
            let completedPointsSum = 0
            let pointsSum = 0;

            querySnapshot.forEach((doc) => {
                todosArr.push({...doc.data(), id: doc.id})
                if({...doc.data(), id: doc.id}.is_done){
                    completedPointsSum += Number({...doc.data(), id: doc.id}.points) || 0
                }
                pointsSum += Number({...doc.data(), id: doc.id}.points) || 0;
            });
            setTodos(todosArr)
            setCompletedPoints(completedPointsSum)
            setTotalPoints(pointsSum);



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
            <form
                onSubmit={createTodo}
                className="max-w-2xl mx-auto mb-8 p-4 bg-white rounded-lg shadow-lg"
            >
                <div className="flex gap-2">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        type="text"
                        placeholder="Add task"
                        className="flex-1 px-4 py-2 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent placeholder-gray-600"
                    />
                    <input
                        value={points}
                        onChange={(e) => setPoints(Number(e.target.value))}
                        type="number"
                        placeholder="Set point to your task"
                        className="flex-1 px-4 py-2 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent placeholder-gray-600"
                    />
                    <button
                        type="submit"
                        className="p-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center"
                    >
                        <Plus size={30} className="stroke-current"/>
                    </button>
                </div>
            </form>

            <ul className="max-w-2xl mx-auto space-y-2 mb-4">
                {todos.map((todo, index) => (
                    <Todo
                        key={index}
                        todo={todo}
                        toggleComplete={toggleComplete}
                        deleteTodo={deleteTodo}
                        className="group flex items-center justify-between px-4 py-3 bg-white border-2 border-black rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    />
                ))}
            </ul>

            <div className="text-center space-y-1">
                <p className="text-gray-600 text-sm font-medium">
                    Points you achieved: {completedPoints}
                </p>
                <p className="text-gray-600 text-sm font-medium">
                    Total points available: {totalPoints}
                </p>
            </div>


        </>
    )
}