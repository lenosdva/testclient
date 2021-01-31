import { Layout, Footer, ClientDashboard } from "../component";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Image from "next/image";
// import 'react-tabs/style/react-tabs.css';

export default function Category() {
  return (
    <Layout>
      <div className="category">

        <div>
          <div className="container">
            <div className="row">
            <div className="col-lg-12 registration-tabs">
          <Tabs>
            <TabList>
              <Tab>Overview</Tab>
              <Tab>Gallery</Tab>
              <Tab>Publish</Tab>
            </TabList>

            <TabPanel>
            <div className="mb-5">
                <h3 className="label">Service Title</h3>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Professional Moving Out Service"
                />
            </div>

            <div className="d-flex flexwrap margmin15">
   
              <div className="col-md-5">
                <h3 className="label">Category</h3>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Professional Moving Out Service"
                />
              </div>

              <div className="col-md-3">
                <h3 className="label">Working Area</h3>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Radius (in kms)"
                />
              </div>

              <div className="col-md-1"><span className="aroundlabel">around</span></div>

              <div className="col-md-3">
                <h3 className="label">Category</h3>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Select a pincode"
                />
              </div>
            </div>



              <div className="d-flex flexwrap margmin15 mt-3 mb-3">

                      <div className="col-md-5">
                      </div>

                      <div className="col-md-7">or</div>
                    </div>


                    <div className="d-flex flexwrap margmin15">

                      <div className="col-md-5">
                      </div>

                      <div className="col-md-7">
                        <input
                          type="text"
                          className="input-field"
                          placeholder="Select A City"
                        />
                      </div>

                    </div>

                    <div className="mapimg">
                      <Image
                        src="/assets/images/mapimg.png"
                        alt="testimonial2"
                        layout="responsive"
                        width={1098}
                        height={297}
                      />
                    </div>










                    <div className="d-flex flexwrap margmin15">

                      <div className="col-md-4">
                        <h3 className="label">Set Your Price Range</h3>
                        <input
                          type="text"
                          className="input-field"
                          placeholder="Amount In Euros"
                        />
                      </div>

                      <div className="col-md-1"><span className="aroundlabel">to</span></div>

                      <div className="col-md-4">
                      <h3 className="label ht42"></h3>
                        <input
                          type="text"
                          className="input-field"
                          placeholder="Amount in Euros"
                        />
                      </div>

                      

                    </div>


                      <div className="col-md-12 margmin15 mt-5">
                    <h3 className="label">Service Descriptione</h3>
                      <textarea type="text" className="textarea" placeholder="Add a description about your service here" />
                    </div>
               
                    <div className="col-md-12 text-center margmin15 mt-5">
                    <button className="btn primarybtn-fill">Save & Continue</button>
                    </div>
            </TabPanel>
            <TabPanel>
             <div className="img-section">
             <div className="servicephotos">
                <div className="servicephotos-head">
                  <h5>Service Photos</h5>
                  <h6>(0/3)</h6>
                </div>
                <p>Upload photos that describe or are related to your service.</p>
              </div>

              <ul className="servicephotos-listing">
                <li>
                  <Image
                    src="/assets/svg/photo-img.svg"
                    alt="testimonial2"
                    width={111}
                    height={129}
                  />
                </li>
                <li></li>
                <li></li>
              </ul>

              <div className="form-group mt-5 mb-5 checkbox-wrapper">
                <input type="checkbox" id="html" />
                <label for="html">
                  I declare that these materials were created by myself or by my team and do not infringe on any 3rd party rights. I understand that the
                  illegal use of digital assets is against Dein Hausman’s Terms of Service and may result in blocking of my seller account. 
                </label>
              </div>
              

              <div className="col-md-12 text-center mt-5">
                <button className="btn primarybtn-fill">Publish</button>
              </div>
              </div>
            </TabPanel>

            <TabPanel>
              <div className="publish-section">
                <h5>Congratulations! Your service is now live for buyers to view.</h5>
                <div className="linkinput">
                  <Image
                    src="/assets/svg/ic-link.svg"
                    alt="testimonial2"
                    width={36}
                    height={36}
                  />
                  <input type="text" placeholder="https://www.deinhausm ..." />
                </div>
                <div className="col-md-12 text-center mt-5">
                  <button className="btn primarybtn-fill">Return to Dashboard</button>
                </div>
              </div>
            </TabPanel>
          </Tabs>

              </div>
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
