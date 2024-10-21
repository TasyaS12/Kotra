// getMeetingDate.ts

import { collection, getDocs } from 'firebase/firestore';

import { db } from './firebase'; // Make sure to adjust the import path for your Firebase setup


export const getMeetingDates = async () => {
  try {
    const meetingDatesRef = collection(db, 'eventRegistrations'); // Replace with your collection name
    const snapshot = await getDocs(meetingDatesRef);

    // Map the data to extract meeting dates
    const meetingDates = snapshot.docs.map(doc => ({
      id: doc.id,
      meetingDate: doc.data().meetingDate // Adjust according to your Firestore document structure
    }));

    return meetingDates;
  } catch (error) {
    console.error('Error fetching meeting dates:', error);

    return [];
  }
};
