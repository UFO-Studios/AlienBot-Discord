var firebase = require('firebase')
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getPerformance } from "firebase/performance";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDtpDw-JPwDGAAeQkWQyUxXib1LqrLxqho",
  authDomain: "alienbot-562fc.firebaseapp.com",
  databaseURL: "https://alienbot-562fc-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "alienbot-562fc",
  storageBucket: "alienbot-562fc.appspot.com",
  messagingSenderId: "171214822383",
  appId: "1:171214822383:web:1e02dd4a389200f25d741a",
  measurementId: "G-JB571GL50L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const perf = getPerformance(app);

// how to write to the database

database.ref("customPath").set(obj, function(error) {
    if (error) {
      // The write failed...
      console.log("Failed with error: " + error)
    } else {
      // The write was successful...
      console.log("success")
    }
})