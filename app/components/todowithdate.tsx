"use client"

import { Plus, ChevronLeft, ChevronRight } from "lucide-react"
import React, {useEffect, useState} from "react";
import {Todo} from "./todo"
import {db} from "@/firebase.config";
import {query, collection, onSnapshot, updateDoc, doc, addDoc, deleteDoc, setDoc} from "@firebase/firestore";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { BarChart } from '@mui/x-charts/BarChart';
import {newDate} from "react-datepicker/dist/date_utils";






export const TodoWithDate = () => {



    //states
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');
    const [points, setPoints] = useState(0)
    const [completedPoints, setCompletedPoints] = useState(0);
    const [totalPoints, setTotalPoints] = useState(0);
    const [date, setDate] = useState(null);
    const [currentDocId, setCurrentDocId] = useState(null);
    const [datesData, setDatesData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(7);



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
    // saving dates and points


    useEffect(() => {
        if (date) {
            saveDateAndPointsAutomatically();
        }
    }, [date, completedPoints, totalPoints]);

    const saveDateAndPointsAutomatically = async () => {
        try {
            // Format date as string
            const dateString = date.toISOString().split('T')[0];

            // reference to document with ID = dateString
            const docRef = doc(db, "Dates_and_Points", dateString);

            // update or create new document
            await setDoc(docRef, {
                date: date,
                completed_points: completedPoints,
                total_points: totalPoints
            }, { merge: true }); // Merge prevents overwriting other fields

            setCurrentDocId(dateString);
        } catch (error) {
            console.error("saving error:", error);
        }
    };
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

    //datepicker
    const CustomButton = React.forwardRef(({ value, onClick }, ref) => (
        <button
            onClick={onClick}
            ref={ref}
            className="px-6 py-3 bg-white text-black text-4xl font-lexend rounded-lg hover:bg-gray-100 transition-colors duration-200 focus:outline-none shadow-md"
        >
            {value || 'Select date'}
        </button>
    ));

    //table
    useEffect(() => {
        const q = query(collection(db, 'Dates_and_Points'))
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let datesArr = [];
            querySnapshot.forEach((doc) => {
                datesArr.push({
                    id: doc.id,
                    date: doc.data().date?.toDate(),
                    completedPoints: doc.data().completed_points,
                    totalPoints: doc.data().total_points
                });
            });
            // sorting from newest date
            datesArr.sort((a, b) => b.date - a.date);
            setDatesData(datesArr);
        });
        return () => unsubscribe();
    }, []);

    //pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = datesData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(datesData.length / itemsPerPage);

    const handlePageChange = (newPage) => {
        if(newPage < 1 || newPage > totalPages) return;
        setCurrentPage(newPage);
    }

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1);
    }

    //chart

    const today = date || new Date();
    const oneMonthAgo = new Date(today);
    oneMonthAgo.setMonth(today.getMonth() - 1);

    const todayData = datesData.find(entry => {
        const entryDate = entry.date;
        return entryDate.toISOString().split('T')[0] === today.toISOString().split('T')[0];
    });

    const oneMonthAgoData = datesData.find(entry => {
        const entryDate = entry.date;
        const timeDifference = Math.abs(entryDate - oneMonthAgo);
        const daysDifference = Math.ceil(timeDifference/(1000*60*60*24));
        return daysDifference <= 3; // max 3 days difference
    })



    return(
        <>
            <div className=" flex flex-col items-center justify-center p-4 font-lexend">
                <div className="max-w-4xl w-full text-center space-y-6 font-lexend">
                    <DatePicker
                        selected={date}
                        onChange={(selectedDate) => setDate(selectedDate)}
                        customInput={<CustomButton/>}
                        dateFormat="dd/MM/yyyy"
                    />

                </div>
            </div>

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

            <div className="max-w-4xl mx-auto m-16 p-8 sm:px-16 md:px-24 bg-white rounded-lg ">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-3xl sm:text-2xl md:text-3xl font-lexend drop-shadow-xl">
                        Points History
                    </h3>

                    <div className="flex items-center gap-2">
                        <label className="text-sm text-gray-600 font-medium">Items per page:</label>
                        <select
                            value={itemsPerPage}
                            onChange={handleItemsPerPageChange}
                            className="px-4 py-2 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        >
                            <option value={7}>7</option>
                            <option value={14}>14</option>
                            <option value={21}>21</option>
                        </select>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border-collapse">
                        <thead>
                        <tr className="bg-gray-50">
                            <th className="p-4 text-sm font-semibold text-gray-700 border-b-2 border-black">Date</th>
                            <th className="p-4 text-sm font-semibold text-gray-700 border-b-2 border-black">Achieved
                                points
                            </th>
                            <th className="p-4 text-sm font-semibold text-gray-700 border-b-2 border-black">Available
                                points
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentItems.map((entry, index) => (
                            <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                                <td className="p-4 text-sm text-gray-600 border-b-2 border-black">
                                    {entry.date?.toLocaleDateString('pl-PL')}
                                </td>
                                <td className="p-4 text-sm text-gray-600 border-b-2 border-black text-center">
                                    {entry.completedPoints}
                                </td>
                                <td className="p-4 text-sm text-gray-600 border-b-2 border-black text-center">
                                    {entry.totalPoints}
                                </td>
                            </tr>
                        ))}
                        {datesData.length === 0 && (
                            <tr>
                                <td colSpan="3" className="p-4 text-sm text-gray-500 text-center">
                                    No data to display
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination controls */}
                <div className="flex justify-center items-center gap-2 mt-8">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="p-2 border-2 border-black rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors duration-200"
                    >
                        <ChevronLeft className="w-5 h-5"/>
                    </button>

                    {Array.from({length: totalPages}, (_, i) => i + 1).map(page => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`px-4 py-2 border-2 border-black rounded-lg ${
                                currentPage === page
                                    ? 'bg-black text-white'
                                    : 'hover:bg-gray-100'
                            } transition-colors duration-200`}
                        >
                            {page}
                        </button>
                    ))}

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="p-2 border-2 border-black rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors duration-200"
                    >
                        <ChevronRight className="w-5 h-5"/>
                    </button>
                </div>
            </div>

            <div className="max-w-4xl mx-auto m-16 p-8 sm:px-16 md:px-24 bg-white">
                <div className="flex justify-center mb-8">
                    <h3 className="text-3xl sm:text-2xl md:text-3xl font-lexend drop-shadow-xl text-center">
                        Points Progress Comparison
                    </h3>
                </div>

                <div className="flex justify-center">
                    <BarChart
                        xAxis={[{
                            data: [
                                'Today',
                                'One Month Ago'
                            ],
                            scaleType: 'band',
                            tickLabelStyle: {
                                fontSize: 14,
                                fill: '#4B5563'
                            },
                            axisLine: {
                                stroke: '#000'
                            }
                        }]}
                        yAxis={[{
                            scaleType: 'linear',
                            tickLabelStyle: {
                                fontSize: 14,
                                fill: '#4B5563'
                            },
                            axisLine: {
                                stroke: '#000'
                            }
                        }]}
                        series={[
                            {
                                data: [
                                    todayData?.completedPoints || 0,
                                    oneMonthAgoData?.completedPoints || 0
                                ],
                                color: '#1E3A8A', // Dark blue
                                label: 'Completed Points'
                            },
                            {
                                data: [
                                    todayData?.totalPoints || 0,
                                    oneMonthAgoData?.totalPoints || 0
                                ],
                                color: '#065F46', // Dark green
                                label: 'Total Points'
                            }
                        ]}
                        height={400}
                        width={500}
                        grid={{
                            vertical: true,
                            horizontal: true,
                            stroke: '#E5E7EB'
                        }}
                        sx={{
                            '.MuiChartsAxis-line': {
                                stroke: '#000!important'
                            },
                            '.MuiChartsAxis-tick': {
                                stroke: '#000!important'
                            },
                            '.MuiBarElement-root': {
                                strokeWidth: 2,
                                stroke: '#000'
                            }
                        }}
                        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
                    />
                </div>
            </div>

        </>
    )
}