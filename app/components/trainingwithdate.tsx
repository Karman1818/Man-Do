"use client"

import { Plus } from "lucide-react"
import React, { useEffect, useState } from "react";
import { db } from "@/firebase.config";
import { query, collection, onSnapshot,  doc, addDoc,  setDoc } from "@firebase/firestore";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { PointsCharts } from './pointscharts';
import {TrainingHistory} from "@/app/components/traininghistory";


export const TrainingWithDate = () => {
    // states
    const [input, setInput] = useState('');
    const [date, setDate] = useState(null);
    const [datesData, setDatesData] = useState([]);

    // Creating todo
    const createTodo = async (e) => {
        e.preventDefault(e)
        if (input === '') {
            alert('please enter a valid task')
            return
        }
        if (input.length > 200) {
            alert('Your task cant contain more than 200 characters')
            return
        }
        if (date === null){
            alert('please enter date')
            return
        }
        await addDoc(collection(db, 'Trainings'), {
            training: input,
            date:date,

        })
        setInput('')

    }


    // Fetch dates data
    useEffect(() => {
        const q = query(collection(db, 'Trainings'))
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let datesArr = [];
            querySnapshot.forEach((doc) => {
                datesArr.push({
                    id: doc.id,
                    training: doc.data().training,
                    date: doc.data().date?.toDate(),
                });
            });
            // sorting from newest date
            datesArr.sort((a, b) => b.date - a.date);
            setDatesData(datesArr);
        });
        return () => unsubscribe();
    }, []);

    // datepicker custom button
    const CustomButton = React.forwardRef(({ value, onClick }, ref) => (
        <button
            onClick={onClick}
            ref={ref}
            className="px-6 py-3 bg-white text-black text-4xl font-lexend rounded-lg hover:bg-gray-100 transition-colors duration-200 focus:outline-none shadow-md"
        >
            {value || 'Select date'}
        </button>
    ));

    return (
        <>
            <div className="flex flex-col items-center justify-center p-4 font-lexend">
                <div className="max-w-4xl w-full text-center space-y-6 font-lexend">
                    <DatePicker
                        selected={date}
                        onChange={(selectedDate) => setDate(selectedDate)}
                        customInput={<CustomButton />}
                        dateFormat="dd/MM/yyyy"
                    />
                </div>
            </div>

            <h3 className="text-3xl sm:text-2xl md:text-3xl lg:text-3xl font-lexend flex justify-center m-16 px-8 sm:px-16 md:px-24 drop-shadow-xl text-center">
                Add your trainings
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
                        placeholder="Write down your training name"
                        className="flex-1 px-4 py-2 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent placeholder-gray-600"
                    />
                    <button
                        type="submit"
                        className="p-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center"
                    >
                        <Plus size={30} className="stroke-current" />
                    </button>
                </div>
            </form>


            <TrainingHistory datesData={datesData} />
            <PointsCharts datesData={datesData} date={date} />

        </>
    )
}