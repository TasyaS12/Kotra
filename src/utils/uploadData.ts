import { collection, addDoc } from 'firebase/firestore';

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { db, storage } from './firebase'; // import Firestore and Storage

// Function to upload form data to Firestore
export const uploadData = async (formData: any) => {
  try {
    // Add data to Firestore
    const docRef = await addDoc(collection(db, 'eventRegistrations'), formData);

    console.log('Document written with ID: ', docRef.id);

    return docRef.id; // Return the document ID if needed
  } catch (e) {
    console.error('Error adding document: ', e);
    throw e;
  }
};

// Function to upload file to Firebase Storage
export const uploadFile = async (file: File) => {
  try {
    const storageRef = ref(storage, `files/${file.name}`); // Create a storage reference
    const snapshot = await uploadBytes(storageRef, file); // Upload file to Firebase Storage
    const downloadURL = await getDownloadURL(snapshot.ref); // Get the file's download URL

    console.log('Uploaded file available at: ', downloadURL);

    return downloadURL; // Return the file's URL
  } catch (error) {
    console.error('Error uploading file: ', error);
    throw error;
  }
};
