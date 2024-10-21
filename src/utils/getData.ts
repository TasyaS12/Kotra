import { collection, getDoc, getDocs, doc } from 'firebase/firestore';

import { db } from './firebase'; // Make sure you have your Firebase config imported



// Function to retrieve a specific document from Firestore by ID
export const getDataById = async (id: string) => {
  try {
    const docRef = doc(db, 'eventRegistrations', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data());

      return docSnap.data(); // Return the document data
    } else {
      console.log('No such document!');

      return null; // Document does not exist
    }
  } catch (e) {
    console.error('Error fetching document:', e);
    throw e;
  }
};

// Function to retrieve all documents from the eventRegistrations collection
export const getAllData = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'eventRegistrations'));
    const dataList: any[] = [];

    querySnapshot.forEach((doc) => {
      dataList.push({ id: doc.id, ...doc.data() });
    });

    console.log('All document data:', dataList);

    return dataList; // Return the list of all documents
  } catch (e) {
    console.error('Error fetching documents:', e);
    throw e;
  }
};
