import React, { useEffect, useState, useContext } from 'react';
import { IResourceComponentsProps, useList } from "@refinedev/core";
import { Typography, Grid, Card, CardContent, Box } from "@mui/material";
import { useGetIdentity, useGetLocale, useSetLocale } from "@refinedev/core";
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import { ColorModeContext } from "../../contexts/color-mode";

import { LatestActivities } from './components/latestactivities';

type IUser = {
    id: number;
    name: string;
    avatar: string;
  };

export const DashboardPage: React.FC<IResourceComponentsProps> = () => {

    const tasksData = {
        labels: ['In Progress', 'Todo', 'Done'],
        datasets: [
            {
                label: 'Tasks Status',
                data: [5, 10, 15], // Example data
                backgroundColor: [
                    'rgba(255, 206, 86, 0.2)', // In Progress: Yellow
                    'rgba(54, 162, 235, 0.2)', // Todo: Blue
                    'rgba(75, 192, 192, 0.2)'  // Done: Green
                ],
                borderColor: [
                    'rgba(255, 206, 86, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1,
            },
        ],
    };

    // Options for the doughnut chart
    const chartOptions = {
        maintainAspectRatio: true,
        aspectRatio: 3, // Increase this value to make the chart smaller
    };

    const { mode } = useContext(ColorModeContext);
    const { data: user } = useGetIdentity<IUser>();  

    const isDarkMode = mode === 'dark';

    const textStyle = isDarkMode ? {
        // Dark mode styles
        fontWeight: 'bold', 
        fontSize: '2.5rem', 
        color: '#E0E0E0', // Light color for visibility on dark background
        textShadow: '1px 1px 3px black',
        backgroundColor: 'rgba(50, 50, 50, 0.5)', // Darker background highlight
        padding: '10px', 
        borderRadius: '5px', 
        animation: 'fadeIn 2s'
    } : {
        // Light mode styles
        fontWeight: 'bold', 
        fontSize: '2.5rem', 
        color: '#4a90e2', // Choose a color that fits your theme
        textShadow: '1px 1px 2px grey',
        backgroundColor: 'rgba(255, 255, 255, 0.5)', // Optional: background highlight
        padding: '10px', 
        borderRadius: '5px', 
        animation: 'fadeIn 2s'
    };


    return (
        <Box sx={{ flexGrow: 1, padding: '2rem' }}>
             <Typography variant="h4" gutterBottom style={textStyle}>
            Welcome back {user?.name}!
        </Typography>
            <Grid container spacing={2} alignItems="flex-start">
                {/* Task Status */}
                <Grid item xs={8} sm={5}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Task Status
                            </Typography>
                            <Doughnut data={tasksData} />
                        </CardContent>
                    </Card>
                </Grid>

                {/* Latest Activities */}
                <Grid item xs={12} sm={7}>
                    <LatestActivities />
                </Grid>
            </Grid>
        </Box>
    );
};