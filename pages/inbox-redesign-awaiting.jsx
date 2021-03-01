import { useEffect } from "react";
import { Layout, Footer } from "../component";
import { Inbox, TimelineOrder, Chat } from "../component";
import { useDispatch, useSelector } from 'react-redux'
import { get } from "lodash"

export default function InboxWidePage() {
  const dispatch = useDispatch()
  const { inbox, inboxLoading, chatLoading, chat } = useSelector(state => ({
    inbox: state.user.inbox,
    inboxLoading: state.user.inboxLoading,
    chatLoading: state.user.chatLoading,
    chat: state.user.chat,
  }));

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
                <Inbox inbox={inbox} />
              </div>
              <div className="col-lg-4 col-md-12">
                <TimelineOrder />
              </div>
              <div className="col-lg-4 col-md-12">
                {get(chat, 'id', false) ?
                  <Chat chat={chat} />
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
