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

import { ClientDashboardCompleted, ClientDashboardActive, ClientDashboardCancelled, } from "../../component";

function HandymanDashboard({t}) {
  const dispatch = useDispatch()
  const { userData, handyman } = useSelector(state => ({
    userData: state.user.user,
    handyman: state.handyman.hyndyman
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
              <h1 className="heading">{t("clientDash.hello")} <Link href={`/sellerprofile?id=${get(userData, 'id', '')}`}><span>{get(handyman, 'companyName', '')} </span></Link></h1>
              <p className="sub-heading">{t("clientDash.text")}</p>
            </div>
            <div className="col-lg-4 col-md-12">
              <div className="d-flex align-items-center flex-end cursur-pointer">
                <div>
                  <Link href="/add-gig">
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
                  <h4>Add A New Gig</h4>
                  <h6>Tell what services you provide and find your buyer!</h6>
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
                        <Tab className="Tabdash" value="1" label="Active" />
                        <Tab className="Tabdash" value="2" label="Completed" />
                        <Tab className="Tabdash" value="3" label="Cancelled" />
                      </Tabs>
                      <TabPanel value="1"><ClientDashboardActive /></TabPanel>
                      <TabPanel value="2"><ClientDashboardCompleted /></TabPanel>
                      <TabPanel value="3"><ClientDashboardCancelled /></TabPanel>
                  </TabContext>
                </StyledEngineProvider>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withTranslation('common')(HandymanDashboard)
