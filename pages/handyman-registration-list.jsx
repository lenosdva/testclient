import { useEffect } from 'react';
import { Layout, Footer, ClientDashboard } from "../component";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Image from "next/image";
import { useDispatch, useSelector } from 'react-redux';
import { get } from "lodash"
// import 'react-tabs/style/react-tabs.css';

export default function Category(props) {
  const dispatch = useDispatch()
  useEffect(() => {
    console.log("call earn")
    dispatch({ type: 'GET_EARNING', payload: {month: "2" } })
  }, [])
  const {getEarnings  } = useSelector(state => ({
    
    getEarnings:state.services.earning,
  }));
 console.log("getEarnings", getEarnings)
  const renderActive = () => (
    get(getEarnings, 'results', []) && get(getEarnings, 'results', []).map((data, key) => (
 <li key={key}>
      <div className="imgbox">
        <Image
          src="/assets/images/regislist.png"
          alt="testimonial2"
          // layout="responsive"
          width={98}
          height={98}
        />
      </div>
      <div className="anchor-box">
        <a href="">One Line Service Title Goes Here</a>
        {/* <h4>{get(data,'userId','')}</h4>
          <p>{get(JSON.parse(get(data,'description', {})), 'msg', '')}</p> */}

      </div>
      <div className="btn-box">


        <button>Edit</button>
        <button>Pause</button>
        <button>Share</button>
        <button>Delete</button>

      </div>
    </li>
))
)
const renderPause = () => (
  get(getEarnings, 'results', []) && get(getEarnings, 'results', []).map((data, key) => (
<li key={key}>
    <div className="imgbox">
      <Image
        src="/assets/images/regislist.png"
        alt="testimonial2"
        // layout="responsive"
        width={98}
        height={98}
      />
    </div>
    <div className="anchor-box">
    {/* <h4>{get(data,'userId','')}</h4>
          <p>{get(JSON.parse(get(data,'description', {})), 'msg', '')}</p> */}

      <a href="">One Line Service Title Goes Here</a>
    </div>
    <div className="btn-box">


      <button>Edit</button>
      <button>Pause</button>
      <button>Share</button>
      <button>Delete</button>

    </div>
  </li>
))
)

  return (
    <Layout setWebSoket={props.setWebSoket}>
      <div className="category">
        <div className="container">
          <div className="home-section-padding">
            <ClientDashboard />
          </div>
        </div>

        <div>
          <div className="container">
            <div className="row">
              <div className="col-lg-12 registration-tabs">
                <Tabs>
                  <TabList>
                    <Tab>Active</Tab>
                    <Tab>Paused</Tab>
                  </TabList>

                  <TabPanel>
                    <h5>SERVICES</h5>
                    <ul className="regis-list">
                     
             {renderActive()}
                {/* <li>
                  <div className="imgbox">
                    <Image
                      src="/assets/images/regislist.png"
                      alt="testimonial2"
                      // layout="responsive"
                      width={98}
                      height={98}
                    />
                  </div>
                  <div className="anchor-box">
                    <a href="">One Line Service Title Goes Here</a>
                  </div>
                  <div className="btn-box">
                  

                    <button>Edit</button>
                    <button>Pause</button>
                    <button>Share</button>
                    <button>Delete</button>
                    
                  </div>
                </li>
                <li>
                  <div className="imgbox">
                    <Image
                      src="/assets/images/regislist2.png"
                      alt="testimonial2"
                      // layout="responsive"
                      width={98}
                      height={98}
                    />
                  </div>
                  <div className="anchor-box">
                    <a href="">One Line Service Title Goes Here</a>
                  </div>
                  <div className="btn-box">
                    <button>Edit</button>
                    <button>Pause</button>
                    <button>Share</button>
                    <button>Delete</button>
                  </div>
                </li>
                <li>
                  <div className="imgbox">
                    <Image
                      src="/assets/images/regislist3.png"
                      alt="testimonial2"
                      // layout="responsive"
                      width={98}
                      height={98}
                    />
                  </div>
                  <div className="anchor-box">
                    <a href="">One Line Service Title Goes Here</a>
                  </div>
                  <div className="btn-box">
                    <button>Edit</button>
                    <button>Pause</button>
                    <button>Share</button>
                    <button>Delete</button>
                  </div>
                </li> */}
                    </ul>
                  </TabPanel>
                  <TabPanel>
                    <h5>SERVICES</h5>
                    <ul className="regis-list">
                      {renderPause()}
                      {/* <li>
                        <div className="imgbox">
                          <Image
                            src="/assets/images/regislist3.png"
                            alt="testimonial2"
                            // layout="responsive"
                            width={98}
                            height={98}
                          />
                        </div>
                        <div className="anchor-box">
                          <a href="">One Line Service Title Goes Here</a>
                        </div>
                        <div className="btn-box">
                          <button>Edit</button>
                          <button>Pause</button>
                          <button>Share</button>
                          <button>Delete</button>
                        </div>
                      </li>
                      <li>
                        <div className="imgbox">
                          <Image
                            src="/assets/images/regislist.png"
                            alt="testimonial2"
                            // layout="responsive"
                            width={98}
                            height={98}
                          />
                        </div>
                        <div className="anchor-box">
                          <a href="">One Line Service Title Goes Here</a>
                        </div>
                        <div className="btn-box">
                          <button>Edit</button>
                          <button>Pause</button>
                          <button>Share</button>
                          <button>Delete</button>
                        </div>
                      </li>
                      <li>
                        <div className="imgbox">
                          <Image
                            src="/assets/images/regislist2.png"
                            alt="testimonial2"
                            // layout="responsive"
                            width={98}
                            height={98}
                          />
                        </div>
                        <div className="anchor-box">
                          <a href="">One Line Service Title Goes Here</a>
                        </div>
                        <div className="btn-box">
                          <button>Edit</button>
                          <button>Pause</button>
                          <button>Share</button>
                          <button>Delete</button>
                        </div>
                      </li> */}
                    </ul>
                  </TabPanel>
                </Tabs>

              </div>
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
