import React, { useEffect, useState } from "react";
import Image from "next/image";
import { withTranslation } from "../../constent/i18n/i18n"
import { get } from "lodash"
import { useDispatch, useSelector } from 'react-redux'

const Inbox = (props) => {
  const dispatch = useDispatch()
  const [inboxData, setInbox] = useState([])

  useEffect(() => {
    if (get(props, 'ws.emit', false)) {
      props.ws.emit("getConnectedUsers", {}, (res) => {
        const rooms = res;
        console.log("rooms", rooms)
        setInbox(rooms)
      });
    }
  }, [props.ws])

  function getChat(id) {
    dispatch({ type: "GET_CHAT", payload: { users: [id], type: "customer-to-customer" } })
    // props.onSelectChat(_id, mainId, data)
  }

  const renderInbox = (user) => (
    get(props, 'inbox[0].users', []).map((data, key) => (
      <div key={key} onClick={() => getChat(get(data, 'id', ''))} className="inbox-item">
        <div className="inbox-photo">
          <img
            src={get(data, 'profilePic.url', '') === '' ? "/assets/images/howitwork2.jpg" : data.profilePic.url} 
            alt="profile"
            style={{width:52, height: 52}}
          />
        </div>
        <div className="inbox-info">
          <div className="inbox-info-top">
            <p className="inbox-title text-truncate mb-0">{get(data, 'description', '')}</p>
            <p className="project-status orange-label">
              <span>{props.t("inbox.awaitingQuote")}</span>
            </p>
          </div>
          <p className="project-id mb-0 mt-0">{props.t("projectID")}: {get(data, '_id', '')}</p>
          <p className="inbox-name">{get(data, 'name', '')}</p>
        </div>
      </div>
    ))
  )
    console.log("props========>", props)
  return (
    <div className="inbox">
      <h4 className="text-center mt-4 mb-4">{props.t("inbox.title")}</h4>
      {renderInbox()}
      {/* {renderInbox(get(inboxData, '1', {}))} */}
      {/* <div className="inbox-item">
        <div className="inbox-photo">
          <Image
            src="/assets/images/howitwork2.jpg"
            alt="profile"
            width={52}
            height={52}
          />
        </div>
        <div className="inbox-info">
          <div className="inbox-info-top">
            <p className="inbox-title text-truncate mb-0">Bathroom Repair</p>
            <p className="project-status orange-label">
              <span>{props.t("inbox.awaitingQuote")}</span>
            </p>
          </div>
          <p className="project-id mb-0 mt-0">{props.t("inbox.projectID")}: N/A</p>
          <p className="inbox-name">Heffen Geller</p>
        </div>
      </div>

      <div className="inbox-item">
        <div className="inbox-photo">
          <Image
            src="/assets/images/howitwork2.jpg"
            alt="profile"
            width={52}
            height={52}
          />
        </div>
        <div className="inbox-info">
          <div className="inbox-info-top">
            <p className="inbox-title text-truncate mb-0">Solar Panel Installation</p>
            <p className="project-status green-label">
              <span>{props.t("inbox.compelete")}</span>
            </p>
          </div>
          <p className="project-id mb-0 mt-0">{props.t("inbox.projectID")}: 123456789</p>
          <p className="inbox-name">Monica Gaztambide</p>
        </div>
      </div>

      <div className="inbox-item">
        <div className="inbox-photo">
          <Image
            src="/assets/images/howitwork2.jpg"
            alt="profile"
            width={52}
            height={52}
          />
        </div>
        <div className="inbox-info">
          <div className="inbox-info-top">
            <p className="inbox-title text-truncate mb-0">{props.t("inbox.movingSerller")}</p>
            <p className="project-status red-label">
              <span>Cancelled</span>
            </p>
          </div>
          <p className="project-id mb-0 mt-0">{props.t("inbox.projectID")}: 123456789</p>
          <p className="inbox-name">Erika Hans</p>
        </div>
      </div> */}
    </div>
  );
};

export default withTranslation('common')(Inbox)
