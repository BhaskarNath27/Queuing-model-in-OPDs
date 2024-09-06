
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
  import { getAuth,createUserWithEmailandPassword,signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyD8LZhxjrXGmIU4v8_ObDdk4v2tmm3vSck",
    authDomain: "myfisrtproject-93b7d.firebaseapp.com",
    projectId: "myfisrtproject-93b7d",
    storageBucket: "myfisrtproject-93b7d.appspot.com",
    messagingSenderId: "906043362619",
    appId: "1:906043362619:web:070771b84de43d0593bb1e"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth=getAuth(app);

  function SignUpUser()
  {
    const email=document.getElementById("email").value;
    const password=document.getElementById("password").value;

    createUserWithEmailandPassword(auth,email,password).then((userCredential)=>{
        console.log(userCredential.user.uid);

    })
}
const signup=document.getElementById("signup")
signup.addEventListener('click',SignUpUser)

function SignInUser()
  {
    const email=document.getElementById("email").value;
    const password=document.getElementById("password").value;

    signInWithEmailAndPassword(auth,email,password).then((userCredential)=>{
        console.log(userCredential.user.uid);

    })
}
const signin=document.getElementById("signin")
signin.addEventListener('click',SignInUser)

