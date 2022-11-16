import React, { useState,useContext } from 'react'
import {doc, collection, query, where,getDocs,setDoc, updateDoc, serverTimestamp, getDoc } from "firebase/firestore";
import { db} from "../firebase";
import { AuthContext } from '../context/AuthContext';
const Search = () => {
    const [username,setUsername]=useState("");
    const [user,setUser]=useState(null);
    const [err,setErr]=useState(null);
    const {currentUser}=useContext(AuthContext);

    const handleSearch=async()=>{
        const citiesRef = collection(db, "users");
        const q = query(citiesRef, where("displayName", "==", username));
        try{
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
            //   console.log(doc.id, " => ", doc.data());
            setUser(doc.data())
            });
        }
        catch(e){
            setErr(true)
        }

    }


    const handleKey=(e)=>{
        e.code==="Enter" && handleSearch();
    }

    const handleSelect=async()=>{
        //check whether the group(chats in firestore) exists, if not create
        const combinedId=currentUser.uid>user.uid ? currentUser.uid+user.uid :user.uid+currentUser.uid;
     try{
        console.log(1)
        const res= await getDoc(doc(db,"chats",combinedId));
        console.log(2,res)
        if(!res.exists()){
            console.log(3)
            await setDoc(doc(db,"chats",combinedId),{messages:[]})
            await updateDoc(doc(db,"userChats",currentUser.uid),{
                [combinedId+".userInfo"]:{
                    uid:user.uid,
                    displayName:user.displayName,
                    photoURL:user.photoURL
                },
                [combinedId+".date"]:serverTimestamp()
            });
            await updateDoc(doc(db,"userChats",user.uid),{
                [combinedId+".userInfo"]:{
                    uid:currentUser.uid,
                    displayName:currentUser.displayName,
                    photoURL:currentUser.photoURL
                },
                [combinedId+".date"]:serverTimestamp()
            });
           
        }
     }
     catch(e){
        console.log(e)
     }
     setUser(null)
     setUsername("")
        //create user chats
    }

  return (
    <div className='search'>
        <div className='searchForm'>
            <input type="text" placeholder='Search here' onKeyDown={handleKey} onChange={e=>setUsername(e.target.value)} value={username}/>
        </div>
        {err && <span>User not Found</span>}

        {user && <div className='userChat' onClick={handleSelect}>
    <img src={user.photoURL}/>
    <div className='userChatInfo'>
    <span>{user.displayName}</span>
    </div>
            </div>}
    </div>
  )
}

export default Search
