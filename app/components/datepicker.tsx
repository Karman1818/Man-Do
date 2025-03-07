import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const DatePickerButton = () => {
    const [date, setDate] = useState(null);

    const CustomButton = React.forwardRef(({ value, onClick }, ref) => (
        <button
            onClick={onClick}
            ref={ref}
            className="px-6 py-3 bg-white text-black text-4xl font-lexend  rounded-lg hover:bg-gray-100 transition-colors duration-200 focus:outline-none "
        >
            {value || 'Select date'}
        </button>
    ));

    return (
        <div className=" flex flex-col items-center justify-center p-4 font-lexend">
            <div className="max-w-4xl w-full text-center space-y-6 font-lexend">
                <DatePicker
                    selected={date}
                    onChange={(selectedDate) => setDate(selectedDate)}
                    customInput={<CustomButton />}
                    dateFormat="dd/MM/yyyy"
                />

            </div>
        </div>
    );
};