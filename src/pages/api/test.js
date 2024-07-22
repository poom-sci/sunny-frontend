// pages/api/firebase-messaging-sw.js
export default function handler(req, res) {
  res.setHeader("Content-Type", "application/javascript");
  res.send(`
      importScripts('https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js');
      importScripts('https://www.gstatic.com/firebasejs/9.17.1/firebase-messaging.js');
  
      const firebaseConfig = {
        apiKey: '${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}',
        authDomain: '${process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN}',
        projectId: '${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}',
        storageBucket: '${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}',
        messagingSenderId: '${process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID}',
        appId: '${process.env.NEXT_PUBLIC_FIREBASE_APP_ID}',
        measurementId: '${process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID}'
      };
  
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
  
      const messaging = firebase.messaging();
  
      messaging.onBackgroundMessage(function (payload) {
        console.log('Received background message ', payload);
        const notificationTitle = payload.notification.title;
        const notificationOptions = {
          body: payload.notification.body,
        };
  
        self.registration.showNotification(notificationTitle, notificationOptions);
      });
    `);
}
