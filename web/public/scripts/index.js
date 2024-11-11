

function headerSpaceHandler(event) {
  let header = document.getElementById('body-header');
  let headerStyle = window.getComputedStyle(header);
  let height = headerStyle.getPropertyValue('height');

  let body = document.getElementById('body');
  body.style.paddingTop = height;
}
addEventListener("load", headerSpaceHandler);
addEventListener("resize", headerSpaceHandler);

/*
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
const firebaseConfig = {
  apiKey: "AIzaSyA6QwLBu5X5AzgDq81C5L1dXZ9E0xP-9vk",
  authDomain: "matiasdavezac-3d8c8.firebaseapp.com",
  projectId: "matiasdavezac-3d8c8",
  storageBucket: "matiasdavezac-3d8c8.firebasestorage.app",
  messagingSenderId: "72369303819",
  appId: "1:72369303819:web:528377b378f7a80d17f20e",
  measurementId: "G-PTZ5232TNL"
};
const app = initializeApp(firebaseConfig);
*/