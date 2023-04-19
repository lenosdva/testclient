import { useEffect, useState } from "react"
import Image from "next/image";
import Link from "next/link";
import { withTranslation } from "../../constent/i18n/i18n"
import { useDispatch, useSelector } from 'react-redux'
import { get } from "lodash";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { StyledEngineProvider } from '@mui/material/styles';

import { PaymentsCleared, PaymentsPendingClearance, } from "../../component";

function ClientDashboard({t}) {
  const dispatch = useDispatch()
  const { userData } = useSelector(state => ({
    userData: state.user.user,
  }));
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="client-dashboard-wrapper">
      <div className="client-dashboard-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-12">
              <h1 className="heading">{t("clientDash.hello")} <span>{get(userData, 'fname', '')} {get(userData, 'lname', '')}</span></h1>
              <p className="sub-heading">{t("clientDash.text")}</p>
            </div>
            <div className="col-lg-4 col-md-12">
              <div className="d-flex align-items-center flex-end cursur-pointer">
                <div>
                  <Link href={get(userData, 'role','') === "handyman" ? "/handyman-registration-withdrawn" : "/category-services"}>
                  <Image
                    src="/assets/svg/ic-add.svg"
                    alt="add"
                    width={50}
                    height={50}
                    className="hover-effect2"
                  />
                  </Link>
                </div>
                <div>
                  <h4>{get(userData, 'role', '') !== "handyman" ? t("clientDash.oTitle") : "Add A New Gig"}</h4>
                  <h6>{t("clientDash.oText")}</h6>
                </div>
                                  
              </div>
            </div>
          </div>
          <div className="row">
              <div className="col-lg-8 col-md-12 mt-10">
                <StyledEngineProvider injectFirst>
                  <TabContext value={value}>
                      <Tabs
                        value={value}
                        onChange={handleChange}
                        textColor="secondary"
                        indicatorColor="secondary"
                        aria-label="secondary tabs example"
                      >
                        <Tab className="Tab" value="1" label="CLEARED" />
                        <Tab className="Tab" value="2" label="PENDING CLEARANCE" />
                      </Tabs>
                      <TabPanel value="1"><PaymentsCleared /></TabPanel>
                      <TabPanel value="2"><PaymentsPendingClearance /></TabPanel>
                  </TabContext>
                </StyledEngineProvider>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withTranslation('common')(ClientDashboard)
