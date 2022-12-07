import React from 'react'

import useSignal from '../../hooks/useSignal'
import ChatInput from '../ChatInput'
import ChatMessages from '../ChatMessages'
import styles from './styles'

const Chat = ({ room, listOfMessages }) => {
  const { sendSignal } = useSignal({ room })

  const sendMessage = (text) => {
    if (room) sendSignal(text, "text")
  }

  const classes = styles()

  return (
    <div className={classes.chatContainer}>
      <ChatMessages
        chatClass={classes.chatMessages}
        chatMessages={listOfMessages}
      ></ChatMessages>
      <div className={classes.chatInput}>
        <ChatInput sendMessage={sendMessage}></ChatInput>
      </div>
    </div>
  )
}

export default Chat
