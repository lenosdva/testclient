import Image from "next/image";
import Link from "next/link"
import { withTranslation } from "../../constent/i18n/i18n"
import { useRouter } from 'next/router'
import { useEffect, useState, useCallback } from "react"
import { get } from "lodash";
import Clipboard from 'react-clipboard.js';

function ShareGig({t}) {
  const router = useRouter();
  const [queryId, setQueryId] = useState(get(router, 'query.id', ''));
  let link = 'https://deinhausmann.com/products/' + queryId
  return (
      <div className="waiting-sharegig">
        <div className="waiting-wrapper">
          <div className="waiting-text">
          <div>
            <p className="text-center">{t("profileGig.shareGig")}</p>
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
export default withTranslation('common')(ShareGig)