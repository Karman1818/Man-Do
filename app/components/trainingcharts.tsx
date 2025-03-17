"use client"

import React from "react";
import { BarChart } from '@mui/x-charts/BarChart';

export const TrainingCharts = ({ datesData, date }) => {
    const today = date || new Date();

    // Calculate start of current week (Sunday)
    const startOfCurrentWeek = new Date(today);
    startOfCurrentWeek.setDate(today.getDate() - today.getDay());
    startOfCurrentWeek.setHours(0, 0, 0, 0);

    // Calculate end of current week (Saturday)
    const endOfCurrentWeek = new Date(startOfCurrentWeek);
    endOfCurrentWeek.setDate(startOfCurrentWeek.getDate() + 6);
    endOfCurrentWeek.setHours(23, 59, 59, 999);

    // Calculate start of week one month ago
    const startOfPreviousWeek = new Date(startOfCurrentWeek);
    startOfPreviousWeek.setMonth(startOfPreviousWeek.getMonth() - 1);

    // Calculate end of week one month ago
    const endOfPreviousWeek = new Date(startOfPreviousWeek);
    endOfPreviousWeek.setDate(startOfPreviousWeek.getDate() + 6);
    endOfPreviousWeek.setHours(23, 59, 59, 999);

    // Count days trained in current week
    const daysTrainedCurrentWeek = datesData.filter(entry => {
        const entryDate = entry.date;
        return entryDate &&
            entryDate >= startOfCurrentWeek &&
            entryDate <= endOfCurrentWeek;
    }).length;

    // Count days trained in week one month ago
    const daysTrainedPreviousWeek = datesData.filter(entry => {
        const entryDate = entry.date;
        return entryDate &&
            entryDate >= startOfPreviousWeek &&
            entryDate <= endOfPreviousWeek;
    }).length;

    // Format date ranges for display
    const formatDateRange = (start, end) => {
        const options = { month: 'short', day: 'numeric' };
        return `${start.toLocaleDateString('pl-PL', options)} - ${end.toLocaleDateString('pl-PL', options)}`;
    };

    const currentWeekLabel = formatDateRange(startOfCurrentWeek, endOfCurrentWeek);
    const previousWeekLabel = formatDateRange(startOfPreviousWeek, endOfPreviousWeek);

    return (
        <div className="max-w-4xl mx-auto m-16 p-8 sm:px-16 md:px-24 bg-white">
            <div className="flex justify-center mb-8">
                <h3 className="text-3xl sm:text-2xl md:text-3xl font-lexend drop-shadow-xl text-center">
                    Comparison of trainings in a week
                </h3>
            </div>

            <div className="flex justify-center">
                <BarChart
                    xAxis={[{
                        data: [
                            currentWeekLabel,
                            previousWeekLabel
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
                        },
                        max: 7, // Maximum 7 days in a week
                        step: 1  // Step by 1 day
                    }]}
                    series={[
                        {
                            data: [
                                daysTrainedCurrentWeek,
                                daysTrainedPreviousWeek
                            ],
                            color: '#1E3A8A', // Dark blue
                            label: 'Trainings'
                        },
                        {
                            data: [
                                7, // Maximum days in a week
                                7
                            ],
                            color: '#E5E7EB', // Light gray for total days
                            label: 'Days in week'
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
    );
};