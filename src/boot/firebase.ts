// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { boot } from 'quasar/wrappers';
import { VueFire, VueFireAuth } from 'vuefire';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyARNKbzVs8Z8Pb0Vj1LWBbNZdZiOJaBnC0',
  authDomain: 'chatboot-gemini.firebaseapp.com',
  projectId: 'chatboot-gemini',
  storageBucket: 'chatboot-gemini.appspot.com',
  messagingSenderId: '444677045077',
  appId: '1:444677045077:web:6cc4a77f866bfc28750ddc',
  measurementId: 'G-RP4PY7VNX0'
};

// Initialize Firebase
const appFire = initializeApp(firebaseConfig);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const analytics = getAnalytics(appFire);

export default boot(({ app }) => {
  app.use(VueFire, {
    firebaseApp: appFire,
    modules: [
      // ... other modules
      VueFireAuth(),
    ],
  })
});
