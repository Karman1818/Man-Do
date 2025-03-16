"use client"

import React from "react";
import { BarChart } from '@mui/x-charts/BarChart';

export const PointsCharts = ({ datesData, date }) => {
    const today = date || new Date();
    const oneMonthAgo = new Date(today);
    oneMonthAgo.setMonth(today.getMonth() - 1);

    const todayData = datesData.find(entry => {
        const entryDate = entry.date;
        return entryDate && entryDate.toISOString().split('T')[0] === today.toISOString().split('T')[0];
    });

    const oneMonthAgoData = datesData.find(entry => {
        const entryDate = entry.date;
        if (!entryDate) return false;
        const timeDifference = Math.abs(entryDate - oneMonthAgo);
        const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
        return daysDifference <= 3; // max 3 days difference
    });

    return (
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
    );
};