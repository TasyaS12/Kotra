'use client'

// Next Imports
import { useEffect, useState } from 'react';

import dynamic from 'next/dynamic';

// MUI Imports
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

// Third-party Imports
import type { ApexOptions } from 'apexcharts';

// Firebase Imports
import { getMeetingDates } from '@/utils/getMeetingDate'; // Adjust the path as needed

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'));

const DateBarChart = () => {
  // State to hold meeting data
  const [meetingData, setMeetingData] = useState<{ meetingDate: string; count: number }[]>([]);
  const [whenMeeting, setWhenMeeting] = useState('Jakarta, 13 Nov 2024')

  // Function to fetch meeting dates from Firestore
  const fetchMeetingDates = async () => {
    const meetingDates = await getMeetingDates();

    // Process data to count occurrences of meeting dates
    const dateCount: Record<string, number> = {};

    meetingDates.forEach(item => {
      const date = item.meetingDate;

      dateCount[date] = (dateCount[date] || 0) + 1; // Count occurrences
    });

    // Convert the dateCount object into an array for charting
    const formattedData = Object.entries(dateCount).map(([date, count]) => ({
      meetingDate: date,
      count
    }));

    setMeetingData(formattedData);
  };

  useEffect(() => {
    fetchMeetingDates();
  }, []);

  useEffect(() => {
    const targetDateJakarta = '2024-11-13'; // The date you want to check
    const targetCountJakarta = meetingData.find(item => item.meetingDate === targetDateJakarta)?.count || 0;

    const targetDateBandung = '2024-11-14'; // The date you want to check
    const targetCountBandung = meetingData.find(item => item.meetingDate === targetDateBandung)?.count || 0;

    if (targetCountJakarta > targetCountBandung) {
      setWhenMeeting('Jakarta, 13 Nov 2024'); // Set whenMeeting to Jakarta if there are meetings
    } else {
      setWhenMeeting('Bandung, 14 Nov 2024'); // Set to another message if no meetings are scheduled
    }
  }, [meetingData]); // Depend on meetingData

  // Vars
  const divider = 'var(--mui-palette-divider)';
  const disabledText = 'var(--mui-palette-text-disabled)';

  const options: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false },
    },
    colors: ['#00cfe8'],
    dataLabels: { enabled: false },
    plotOptions: {
      bar: {
        borderRadius: 8,
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'all',
        barHeight: '30%',
        horizontal: true,
      },
    },
    grid: {
      borderColor: divider,
      xaxis: {
        lines: { show: false },
      },
      padding: {
        top: -10,
      },
    },
    yaxis: {
      labels: {
        style: { colors: disabledText, fontSize: '13px' },
      },
    },
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { color: divider },
      categories: meetingData.map(item => item.meetingDate), // Dynamic categories based on fetched data
      labels: {
        style: { colors: disabledText, fontSize: '13px' },
      },
    },
  };

  return (
    <Card>
      <CardHeader
        title='Date Meeting Preferred'
        subheader={whenMeeting}
        sx={{
          flexDirection: ['column', 'row'],
          alignItems: ['flex-start', 'center'],
          '& .MuiCardHeader-action': { mb: 0 },
          '& .MuiCardHeader-content': { mb: [2, 0] },
        }}
      />
      <CardContent>
        <AppReactApexCharts
          type='bar'
          width='100%'
          height={400}
          options={options}
          series={[{ data: meetingData.map(item => item.count) }]} // Use the counts for the series data
        />
      </CardContent>
    </Card>
  );
};

export default DateBarChart;
