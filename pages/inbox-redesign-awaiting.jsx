import { useEffect, useState } from "react";
import { Layout, Footer } from "../component";
import { Inbox, Chat, Timeline, TimelineItem, TimelineOrder } from "../component";
import { useDispatch, useSelector } from 'react-redux'
import { get } from "lodash"

export default function InboxWidePage(props) {
  const [request, setRequest] = useState({})
  const [selectedChatId, setId] = useState('')
  const dispatch = useDispatch()
  const { inbox, inboxLoading, chatLoading, chat } = useSelector(state => ({
    inbox: state.user.inbox,
    inboxLoading: state.user.inboxLoading,
    chatLoading: state.user.chatLoading,
    chat: state.user.chat,
  }));

  function onSelectChat(id, mainID) {
    setId(mainID)
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
              {getOrderStatus() ?
                <Timeline orderStatus={getOrderStatus()} ws={props.ws} />
                :
                <TimelineOrder ws={props.ws} />
              }
            </div>
            <div className="col-lg-4 col-md-12">
              {get(chat, 'id', false) ?
                <Chat onSelectChat={onSelectChat} chat={chat} ws={props.ws} />
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
