import { useEffect, useState } from "react";
import { Layout, Footer } from "../component";
import { Inbox, Chat, Timeline, TimelineItem, TimelineOrder } from "../component";
import { useDispatch, useSelector } from 'react-redux'
import { get } from "lodash"

export default function InboxWidePage(props) {
  const [request, setRequest] =useState({})
  const dispatch = useDispatch()
  const { inbox, inboxLoading, chatLoading, chat } = useSelector(state => ({
    inbox: state.user.inbox,
    inboxLoading: state.user.inboxLoading,
    chatLoading: state.user.chatLoading,
    chat: state.user.chat,
  }));

  function onSelectChat(id){
    if('addEventListener' in  props.ws){
      // send data
      //p
      props.ws.addEventListener('message', function (event) {
        let message = JSON.parse(event.data);
        if(event.request === "notificationReceived"){
          dispatch({ type: "GET_INBOX" })
        }
      })
    }
  }

  useEffect(() => {
    dispatch({ type: "GET_INBOX" })
   
  }, [])

  return (
    (inboxLoading) ?
      <div className="loading-wrapper">
        <div className="loader"></div>
      </div>
      :
      <Layout>
        <div className="inbox-wide-page">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-12">
                <Inbox  onSelectChat={onSelectChat} ws={props.ws} inbox={inbox} />
              </div>
              <div className="col-lg-4 col-md-12">

                {/* <TimelineOrder ws={props.ws}/> */}
                {/* <Timeline /> */}
              </div>
              <div className="col-lg-4 col-md-12">
                {get(chat, 'id', false) ?
                  <Chat onSelectChat={onSelectChat} chat={chat} ws={props.ws}/>
                  : <></>
                }
              </div>
            </div>
          </div>
          <div className="home-section-padding">
            <Footer />
          </div>
        </div>
      </Layout>
  );
}
