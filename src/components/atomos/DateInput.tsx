import { useState } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt } from "react-icons/fa";

const DateInput: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    return (
        <div className="relative">
            <DatePicker
                selected={selectedDate}
                onChange={(date: Date | null) => setSelectedDate(date)}
                customInput={
                    <button
                        type="button"
                        className="flex items-center border   hover:border-green-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 p-2"
                    >
                        <FaCalendarAlt className="text-gray-500 " />
                        {/* <span className="ml-2"> */}
                        {selectedDate ? selectedDate.toLocaleDateString() : ''}
                        {/* </span> */}
                    </button>
                }
                dateFormat="yyyy"
                // dateFormat="yyyy/MM/dd"
                showYearDropdown
                showMonthDropdown
                dropdownMode="select"
            />
        </div>
    );
};

export default DateInput;