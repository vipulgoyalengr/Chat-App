import React, { useEffect, useState,useContext } from 'react'
import {arrayUnion, doc, onSnapshot ,updateDoc,serverTimestamp,Timestamp} from "firebase/firestore";
import { AuthContext } from '../context/AuthContext';
import { db,storage} from "../firebase";
import { ChatContext } from '../context/ChatContext';
import {v4 as uuid} from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Input = () => {
    const {currentUser}=useContext(AuthContext);
    const {data}=useContext(ChatContext);
    const [text,setText]=useState("")
    const [img,setImg]=useState(null)
    const handleSend=async()=>{
        if (img){
            const storageRef = ref(storage, uuid());

            await uploadBytesResumable(storageRef, img).then(()=>{
                getDownloadURL(storageRef).then(async(downloadURL) => {
                    await updateDoc(doc(db,"chats",data.chatId),{
                        messages: arrayUnion({
                            id:uuid(),
                            text,
                            senderId:currentUser.uid,
                            date:Timestamp.now(),
                            img:downloadURL
                        })
                    })

                });
              });
        }
        else{
            await updateDoc(doc(db,"chats",data.chatId),{
                messages: arrayUnion({
                    id:uuid(),
                    text,
                    senderId:currentUser.uid,
                    date:Timestamp.now(),
                })
            })
        }
        await updateDoc(doc(db,"userChats",currentUser.uid),{
            [data.chatId + ".lastMessage"]:{
                text
            },
            [data.chatId+".date"]:serverTimestamp()
        })
        await updateDoc(doc(db,"userChats",data.user.uid),{
            [data.chatId + ".lastMessage"]:{
                text
            },
            [data.chatId+".date"]:serverTimestamp()
        })
        setText("")
        setImg(null)
    }
  return (
    <div className='input'>
      <input type="text" placeholder="Type Something..." onChange={e=>setText(e.target.value)} value={text}/>
      <div className='send'>
      <i class="bi bi-paperclip"></i>
    {/* <img src="" alt=""/> */}
    <input type="file" style={{display:"none"}} id="file" onChange={e=>setImg(e.target.files[0])}/>
    <label htmlFor='file'>
    <i class="bi bi-card-image"></i>
        {/* <img src="" alt=""/> */}
    </label>
    <button onClick={handleSend}>Send</button>
      </div>
    </div>
  )
}

export default Input
