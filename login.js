// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATdLPT9FResHcVR5txmIHhwIjKXbsF0og",
  authDomain: "first-project-5e9a3.firebaseapp.com",
  databaseURL: "https://first-project-5e9a3-default-rtdb.firebaseio.com",
  projectId: "first-project-5e9a3",
  storageBucket: "first-project-5e9a3.appspot.com",
  messagingSenderId: "795890594127",
  appId: "1:795890594127:web:d5066cb2ccb5515c26953a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Handle sign-in
function SignInUser(event) {
  event.preventDefault(); // Prevent form submission and page reload

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
          console.log("Login successful, UID:", userCredential.user.uid);
          // Redirect to the desired page after login
          window.location.href = "dashboard.html"; // Replace with the actual page you want to redirect to
      })
      .catch((error) => {
          console.error("Login failed:", error.message);
          alert("Login failed: " + error.message); // Show an error message to the user
      });
}

// Attach event listener to the form
document.getElementById('loginForm').addEventListener('submit', SignInUser);
