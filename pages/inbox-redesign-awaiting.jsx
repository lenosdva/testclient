import { useEffect, useState } from "react";
import { Layout, Footer } from "../component";
import { Inbox, Chat, Timeline, TimelineItem, TimelineOrder } from "../component";
import { useDispatch, useSelector } from 'react-redux'
import { get } from "lodash"

export default function InboxWidePage(props) {
  const [user, setUser] = useState({})
  const [selectedChatId, setId] = useState('')
  const dispatch = useDispatch()
  const { inbox, inboxLoading, chatLoading, quotations, chat, messageLoading, messages } = useSelector(state => ({
    inbox: state.user.inbox,
    inboxLoading: state.user.inboxLoading,
    chatLoading: state.user.chatLoading,
    chat: state.user.chat,
    messageLoading: state.user.messageLoading,
    messages: state.user.messages,
    quotations: state.user.quotations,
    quotationsLoading: state.user.quotationsLoading,
  }));

  // useEffect(()=>{
  //   if(get(chat, 'chatRoom.chatRoom', false)){
  //     dispatch({ type: "GET_MESSAGES", payload:  chat.chatRoom.chatRoom})
  //   }
  // }, [chat])

  function onSelectChat(id, mainID, chatUser) {
    setId(mainID)
    setUser(chatUser)
    if ('addEventListener' in props.ws) {
      props.ws.addEventListener('message', function (event) {
        let message = JSON.parse(event.data);
        if (event.request === "notificationReceived") {
          dispatch({ type: "GET_INBOX" })
        }
      })
    }
  }

  function getOrderStatus() {
    if (selectedChatId !== '') {
      console.log("selectedChatId", selectedChatId)
      const index = inbox.findIndex(x => x._id === selectedChatId)
      return inbox[index]
    }
    return false
  }

  useEffect(() => {
    dispatch({ type: "GET_INBOX" })
  }, [])

  // console.log("message=========>", messages)
  console.log("quotations========>", quotations)
  return (
    <Layout setWebSoket={props.setWebSoket}>
      { (inboxLoading) &&
        <div className="loading-wrapper">
          <div className="loader"></div>
        </div>
      }
      <div className="inbox-wide-page">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-12">
              <Inbox onSelectChat={onSelectChat} ws={props.ws} inbox={inbox} />
            </div>
            <div className="col-lg-4 col-md-12">
              {get(quotations, 'conversation', false) ?
                <Timeline orderStatus={get(quotations, 'conversation', [])} roomId={chat.roomID} ws={props.ws} />
                :
                <TimelineOrder ws={props.ws} />
              }
            </div>
            <div className="col-lg-4 col-md-12">
              {get(chat, 'conversation', false) ?
                <Chat onSelectChat={onSelectChat} roomId={chat.roomID} chat={get(chat, 'conversation', [])} ws={props.ws} user={user} />
                : <></>
              }
            </div>
          </div>
        </div>
        <div className="home-section-padding">
          <Footer ws={props.ws} />
        </div>
      </div>
    </Layout>
  );
}
