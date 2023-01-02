import firebase from 'firebase/compat/app';
import { getMessaging, getToken,onMessage  } from "firebase/messaging";
const config = {
    apiKey: "AIzaSyCHSIQ_D4B8g0WGtiDIZnzZvDCrgVyFRmg",
    authDomain: "tradkiya.firebaseapp.com",
    projectId: "tradkiya",
    storageBucket: "tradkiya.appspot.com",
    messagingSenderId: "237805553558",
    appId: "1:237805553558:web:3c1ad19f3a6b3345433fb7",
    measurementId: "G-SSQ2NCCJH3"
  };
firebase.initializeApp(config);
const messaging=getMessaging(); 
console.log("LLLLLLLLLLLL",messaging); 
const  vapikey="BCjV20R7SMKaVbzZaUizOxvkZ6ppri04_aDCwsdr2xarKAaTQMkKmLbWz-gyrgiwqcPNfQXnHkp6HrDWmFsqtVc";
export const requestFirebaseNotificationPermission = () =>
    new Promise((resolve,reject) => {
        getToken(messaging,{vapidKey:vapikey}).then((firebaseToken) => {
                if (firebaseToken) {
                  resolve(firebaseToken);
                    } else {
                      console.log('No registration token available. Request permission to generate one.');
                    }
            }).catch((err) => {
                reject(err);
            });
    });

export const onMessageListener = () =>
    new Promise((resolve) => {
       onMessage((payload) => {
            console.log("bahuthuaa",payload);
            resolve(payload);
        });
    });

    export const requestForToken=()=>{
      return getToken(messaging, { vapidKey: vapikey })
        .then((currentToken) => {
          if (currentToken) {
            console.log('current token for client: ', currentToken);
            // Perform any other neccessary action with the token
          } else {
            // Show permission request UI
            console.log('No registration token available. Request permission to generate one.');
          }
        }).catch((err) => {
          console.log('An error occurred while retrieving token. ', err);
        });
    };

    