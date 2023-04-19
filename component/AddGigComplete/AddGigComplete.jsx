import Image from "next/image";
import Link from "next/link"
import { withTranslation } from "../../constent/i18n/i18n"
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux'
import Clipboard from 'react-clipboard.js';
import { get } from "lodash";

function AddGigComplete({t}) {

  const [queryId, setQueryId] = useState("")

  const { addGigData, addGigLoading } = useSelector(state => ({
    addGigLoading: state.handyman.addGigLoading,
    addGigData: state.handyman.addGigData,
  }));

  useEffect(() => {
    setQueryId(get(addGigData, 'id', ''))
  }, [addGigLoading])

  useEffect(() => {
    setQueryId(get(addGigData, 'id', ''))
  }, [])

  let link = 'https://deinhausmann.com/products/' + queryId

  return (
      <div className="waiting-addgig">
        <div className="waiting-wrapper">
          <div className="waiting-text">
          <div>
            <p className="text-center">{t("profileGig.addgigcomplete")}</p>
          </div>

            <Clipboard className="clipboard" data-clipboard-text={link}>
                      <input
                            value={link}
                            type="text"
                            name="fullName"
                            className="input"
                            placeholder="https://deinhausmann.com/products"
                            disabled="disabled"
                          // onBlur={submitData}
                          />
                          <div>
                            <Link href="/handyman-dashboard"><button className="btn primarybtn-fill1">Return to Dashboard</button></Link>
                          </div>
          </Clipboard>


          </div>
        </div>
      </div>
  );
}
export default withTranslation('common')(AddGigComplete)