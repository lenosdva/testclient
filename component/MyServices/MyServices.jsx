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

import { ClientDashboardCompleted, ClientDashboardActive, ClientDashboardCancelled, GigCard} from "../../component";

function MyServices(props) {
  const dispatch = useDispatch()
  const { userData } = useSelector(state => ({
    userData: state.user.user,
  }));
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

 const [sorting, setSorting] = useState('Most recently')
 const [sortingStyle, setSortingStyle] = useState(false)
  

  function RenderGigsActive() {
    let gigs = <div></div>;
    if(get(props, 'gigs', []).length > 0) {
      if(sorting == 'Most recently' || sorting == 'Most popular' || sorting == 'The best') {
        gigs = (get(props, 'gigs', [])).filter(card => card.status == 'active').sort((a, b) => (new Date(b.createdAt) - new Date(a.createdAt))).map((data, key) => (
          <>
            <div className="render-gigs d-flex flex-wrap">
              <GigCard data={data} />
            </div>
          </>
        ));
      }
      if(sorting == 'Most expensive') {
        gigs = (get(props, 'gigs', [])).filter(card => card.status == 'active').sort((a, b) => b.minPrice - a.minPrice).map((data, key) => (
          <>
            <div className="render-gigs d-flex flex-wrap">
              <GigCard data={data} />
            </div>
          </>
        ));
      }          

    }
    return gigs
  }

  function RenderGigsPaused() {
    let gigs = <div></div>;
    if(get(props, 'gigs', []).length > 0) {
      if(sorting == 'Most recently' || sorting == 'Most popular' || sorting == 'The best') {
        gigs = (get(props, 'gigs', [])).filter(card => card.status == 'paused').sort((a, b) => (new Date(b.createdAt) - new Date(a.createdAt))).map((data, key) => (
          <>
            <div className="render-gigs d-flex flex-wrap">
              <GigCard data={data} />
            </div>
          </>
        ));
      }
      if(sorting == 'Most expensive') {
        gigs = (get(props, 'gigs', [])).filter(card => card.status == 'paused').sort((a, b) => b.minPrice - a.minPrice).map((data, key) => (
          <>
            <div className="render-gigs d-flex flex-wrap">
              <GigCard data={data} />
            </div>
          </>
        ));
      }          

    }
    return gigs
  }





  return (
    <div className="handyman-gigs-wrapper">
      <div className="client-dashboard-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-12">
              <h1 className="heading">{props.t("clientDash.hello")} <span>{get(userData, 'fname', '')} {get(userData, 'lname', '')}</span></h1>
              <p className="sub-heading">{props.t("clientDash.text")}</p>
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
              <div className="col-lg-12 col-md-12 mt-10">
                <StyledEngineProvider injectFirst>
                  <TabContext value={value}>
                  <div className="d-flex justify-content-between options">
                    <div className="d-flex">
                      <Tabs
                        value={value}
                        onChange={handleChange}
                        textColor="secondary"
                        indicatorColor="secondary"
                        aria-label="secondary tabs example"
                        
                      >
                        <Tab className="Tabdash" value="1" label="Active" />
                        <Tab className="Tabdash" value="2" label="Paused" />
                      </Tabs>
                    </div>
                              <div className="d-flex">
                              
                                            <img
                                                  src="/assets/images/sort.png"
                                                  alt="handyman1"
                                                  layout="responsive"
                                                  width="20"
                                                  height="20"
                                                  onClick={() => setSortingStyle(!sortingStyle)}
                                                />
                              
                                            <p>Sort By:</p>
                                            <select onChange={(e) => setSorting(e.target.value)}>
                                                  <option>Most recently</option>
                                                  <option>Most popular</option>
                                                  <option>Most expensive</option>
                                                  <option>The best</option>
                                            </select>
                                            
                                            
                              </div>                                            
                      
                  </div>
                                            {sortingStyle &&
                                              <div className="d-flex justify-content-end vis">
                                                <select onChange={(e) => setSorting(e.target.value)}>
                                                    <option>Most recently</option>
                                                    <option>Most popular</option>
                                                    <option>Most expensive</option>
                                                    <option>The best</option>
                                                </select>
                                              </div>
                                            }
                      <TabPanel value="1" className="">

                        <div className="d-flex flex-wrap tt">
                          <RenderGigsActive />
                        </div>
                        
                      
                      
                      
                      </TabPanel>
                      <TabPanel value="2">
                      
                        <div className="d-flex flex-wrap tt">
                          <RenderGigsPaused />
                        </div>

                      </TabPanel>
                  </TabContext>
                </StyledEngineProvider>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withTranslation('common')(MyServices)
