
importScripts('https://www.gstatic.com/firebasejs/9.6.8/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.8/firebase-messaging-compat.js');
const config={
        apiKey: "AIzaSyCHSIQ_D4B8g0WGtiDIZnzZvDCrgVyFRmg",
        authDomain: "tradkiya.firebaseapp.com",
        projectId: "tradkiya",
        storageBucket: "tradkiya.appspot.com",
        messagingSenderId: "237805553558",
        appId: "1:237805553558:web:3c1ad19f3a6b3345433fb7",
        measurementId: "G-SSQ2NCCJH3"
      };
      firebase.initializeApp(config);
// const firebaseApp=initializeApp(config); 
// const messaging = getMessaging(firebaseApp);
const messaging = firebase.messaging();
console.log("hellodfjhdf",messaging); 
// messaging.setBackgroundMessageHandler(function (payload) {
//     //console.log('[firebase-messaging-sw.js] Received background message ', payload);

//     const notificationTitle = payload.data.title;
//     const notificationOptions = {
//         body: payload.data.body,
//         icon: '/firebase-logo.png'
//     };

//     return self.registration.showNotification(notificationTitle,
//         notificationOptions);
// });

// self.addEventListener('notificationclick', event => {
//     //console.log(event)
//     return event;
// });

messaging.onBackgroundMessage(function(payload) {
    console.log('Received background message ', payload);
  
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
    };
  
    self.registration.showNotification(notificationTitle,
      notificationOptions);
  });