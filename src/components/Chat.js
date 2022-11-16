import React,{useContext} from 'react'
import Input from './Input'
import Messages from './Messages'
import { ChatContext } from '../context/ChatContext';

const Chat = () => {
  const {data}=useContext(ChatContext);

  return (
    <div className='chat'>
      <div className='chatInfo'>
    <span>{data.user?.displayName}</span>
    <div className='chatIcons'>
    <i class="bi bi-camera-video-fill"></i>
    <i class="bi bi-person"></i>
    <i class="bi bi-three-dots"></i>
    </div>
      </div>
      <Messages/>
      <Input/>
    </div>
  )
}

export default Chat
