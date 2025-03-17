"use client"

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const TrainingHistory = ({ datesData }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(7);

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = datesData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(datesData.length / itemsPerPage);

    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > totalPages) return;
        setCurrentPage(newPage);
    }

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1);
    }

    return (
        <div className="max-w-4xl mx-auto m-16 p-8 sm:px-16 md:px-24 bg-white rounded-lg">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <h3 className="text-3xl sm:text-2xl md:text-3xl font-lexend drop-shadow-xl">
                    Training History
                </h3>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <label className="text-sm text-gray-600 font-medium">Items per page:</label>
                    <select
                        value={itemsPerPage}
                        onChange={handleItemsPerPageChange}
                        className="px-4 py-2 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent w-full sm:w-auto"
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
                        <th className="p-4 text-sm font-semibold text-gray-700 border-b-2 border-black text-left">Date</th>
                        <th className="p-4 text-sm font-semibold text-gray-700 border-b-2 border-black text-left">Training</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentItems.map((entry, index) => (
                        <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                            <td className="p-4 text-sm text-gray-600 border-b-2 border-black text-left">
                                {entry.date?.toLocaleDateString('pl-PL')}
                            </td>
                            <td className="p-4 text-sm text-gray-600 border-b-2 border-black text-left">
                                {entry.training}
                            </td>
                        </tr>
                    ))}
                    {datesData.length === 0 && (
                        <tr>
                            <td colSpan="2" className="p-4 text-sm text-gray-500 text-center">
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
                    <ChevronLeft className="w-5 h-5" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-4 py-2 border-2 border-black rounded-lg min-w-[44px] ${
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
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};