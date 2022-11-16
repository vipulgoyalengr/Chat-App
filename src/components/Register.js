import React, { useState } from 'react'
import {  createUserWithEmailAndPassword ,updateProfile} from "firebase/auth";
import {  auth , storage,db} from "../firebase";
import {ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc} from 'firebase/firestore';
import { useNavigate,Link } from 'react-router-dom';
const Register = () => {
  const [err,setErr]=useState();
  const navigate=useNavigate();
  const handleSubmit= async(e)=>{
    e.preventDefault();
    const displayName=e.target[0].value;
    const email=e.target[1].value;
    const password=e.target[2].value;
    const file=e.target[3].files[0];
    console.log(file)
    try{
      const res=await createUserWithEmailAndPassword(auth, email, password)

const storageRef = ref(storage, displayName);

 await uploadBytesResumable(storageRef, file).then(()=>{
  getDownloadURL(storageRef).then(async(downloadURL) => {
    await updateProfile(res.user,{
      displayName,
      photoURL:downloadURL
    });
    await setDoc(doc(db,"users",res.user.uid),{
      uid:res.user.uid,displayName,email,photoURL:downloadURL
    });
    await setDoc(doc(db,"userChats",res.user.uid),{})
    navigate("/")
  });
});

// Register three observers:
// 1. 'state_changed' observer, called any time the state changes
// 2. Error observer, called on failure
// 3. Completion observer, called on successful completion
// uploadTask.on(
//   (error) => {
//     // Handle unsuccessful uploads
//     setErr(true)
//   }, 
//   () => {
//     // Handle successful uploads on complete
//     // For instance, get the download URL: https://firebasestorage.googleapis.com/...

//   }
// );

    }
    catch{
      setErr(true)
    }
// const auth = getAuth();
  // .then((userCredential) => {
  //   // Signed in 
  //   const user = userCredential.user;
  //   console.log(user)

  //   // ...
  // })
  // .catch((error) => {
  //   const errorCode = error.code;
  //   const errorMessage = error.message;
  //   // ..
  // });
  }



  return (
    <div>
          <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Lama Chat</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input required type="text" placeholder="display name" />
          <input required type="email" placeholder="email" />
          <input required type="password" placeholder="password" />
          <input  style={{ display: "none" }} type="file" id="file" name="file"/>
          <label htmlFor="file" >
            {/* <img src={Add} alt="" /> */}
            <i class="bi bi-card-image"></i>
            <span>Add an avatar</span>
          </label>
          <button>Sign up</button>
          {err && <span>Something went wrong</span>}
          {/* {loading && "Uploading and compressing the image please wait..."}
          {err && <span>Something went wrong</span>} */}
        </form>
        <p>
          You do have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
    </div>
  )
}

export default Register
