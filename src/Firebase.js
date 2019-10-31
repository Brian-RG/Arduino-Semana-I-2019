import firebase from 'firebase';

/*const firebaseConfig={
    apiKey: "AIzaSyDVX9ImM3umSAbZTt0T6kptGt_9NIGxdJc",
    authDomain: "reactsemanai.firebaseapp.com",
    databaseURL: "https://reactsemanai.firebaseio.com",
    projectId: "reactsemanai",
    storageBucket: "reactsemanai.appspot.com",
    messagingSenderId: "452457009471",
    appId: "1:452457009471:web:d6385c2ce8988a5897438a",
    measurementId: "G-61E7QJ6D3D"
};*/

const firebaseConfig = {
    apiKey: "AIzaSyCx8CtkUnJRmXRStCWtrQguPFd3Qp2kr2Y",
    authDomain: "semana-i-2019.firebaseapp.com",
    databaseURL: "https://semana-i-2019.firebaseio.com",
    projectId: "semana-i-2019",
    storageBucket: "semana-i-2019.appspot.com",
    messagingSenderId: "703867554397",
    appId: "1:703867554397:web:aca9ea2da44bb420c29bb4",
    measurementId: "G-BB6LJD9SZK"
  };

const fire = firebase.initializeApp(firebaseConfig);

export default fire;