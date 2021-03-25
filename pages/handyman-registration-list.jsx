import { useEffect } from 'react';
import { Layout, Footer, ClientDashboard } from "../component";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Image from "next/image";
import { useDispatch, useSelector } from 'react-redux';
import { get } from "lodash";
import Moment from 'react-moment';
import 'moment-timezone';
import moment from "moment-timezone";
// import 'react-tabs/style/react-tabs.css';

export default function Category(props) {
  const dispatch = useDispatch()
  useEffect(() => {
    console.log("call earn")
    dispatch({ type: 'GET_EARNING', payload: { month: "2" } })
  }, [])
  const { getEarnings } = useSelector(state => ({

    getEarnings: state.services.earning,
  }));
  console.log("getEarnings", getEarnings)
  const renderCleared = () => (
    get(getEarnings, 'results', []) && get(getEarnings, 'results', []).map((data, key) => (
      <li key={key}>
        {/* <div className="imgbox">
          <Image
            src="/assets/images/regislist.png"
            alt="testimonial2"
            // layout="responsive"
            width={98}
            height={98}
          />
        </div> */}
        <div className="anchor-box">
          <moment>{moment(get(data, 'clearingDate', null)).format('DD-MM-YYYY')}</moment>
          <a href="">{get(data, 'orderId', '')}</a>
          <div>{get(data, 'price', null)}</div>
          <div>{get(data,'title','')}</div>

          {/* <h4>{get(data,'orderId','')}</h4>
          <p>{get(JSON.parse(get(data,'orderType', {})), '', '')}</p>
          <h6>{moment(get(data, 'clearingDate', null)).format('Do MMMM YYYY, hh:mm:ss a')}</h6> */}
          {/* <h4>{get(data,'results','')}</h4> */}
          {/*<p>{get(JSON.parse(get(data,'description', {})), 'msg', '')}</p> */}

        </div>
        {/* <div className="btn-box">


          <button>Edit</button>
          <button>Pause</button>
          <button>Share</button>
          <button>Delete</button>

        </div> */}
      </li>
    ))
  )
  const renderPendingClearance = () => (
    get(getEarnings, 'results', []) && get(getEarnings, 'results', []).map((data, key) => (
      <li key={key}>
        {/* <div className="imgbox">
          <Image
            src="/assets/images/regislist.png"
            alt="testimonial2"
            // layout="responsive"
            width={98}
            height={98}
          />
        </div> */}
        <div className="anchor-box">
          {/* <h4>{get(data,'userId','')}</h4>
<p>{get(JSON.parse(get(data,'description', {})), 'msg', '')}</p> */}
          <moment>{moment(get(data, 'clearingDate', null)).format('DD-MM-YYYY')}</moment>
          <a href="">{get(data, 'orderId', '',)}</a>
          <div>{get(data, 'price', null)}</div>
          <div>{get(data,'title','')}</div>


          {/* <h4>{get(data,'orderId','')}</h4>
          <p>{get(JSON.parse(get(data,'orderType', {})), '', '')}</p>
          <h6>{moment(get(data, 'clearingDate', null)).format('Do MMMM YYYY, hh:mm:ss a')}</h6> */}

        </div>
        {/* <div className="btn-box">


          <button>Edit</button>
          <button>Pause</button>
          <button>Share</button>
          <button>Delete</button>

        </div> */}
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
                <span className="sort-bg">Sort By: 
                  <select>
                    <option>Most Recent</option>
                  </select>
                </span>
                <Tabs>
                  <TabList>
                    <Tab>Cleared</Tab>
                    <Tab>Pending Clearance</Tab>
                  </TabList>

                  <TabPanel>
                  <table className="table-width">
                    <thead>
                      <tr>
                          <th>DATE</th>
                          <th>FOR</th>
                          <th className="text-right">AMOUNT</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                          <td>14-10-2020</td>
                          <td><a href="" className="purple-color">One Line Service Title Goes Here</a></td>
                          <td className="text-right">€ 650</td>
                      </tr>
                      <tr>
                          <td>15-10-2020</td>
                          <td><a href="" className="purple-color">One Line Service Title Goes Here</a></td>
                          <td className="text-right">€ 650</td>
                      </tr>
                      <tr>
                          <td>16-10-2020</td>
                          <td><a href="" className="purple-color">One Line Service Title Goes Here</a></td>
                          <td className="text-right">€ 650</td>
                      </tr>
                      <tr>
                          <td>17-10-2020</td>
                          <td><a href="" className="purple-color">One Line Service Title Goes Here</a></td>
                          <td className="text-right">€ 650</td>
                      </tr>
                      <tr>
                          <td>18-10-2020</td>
                          <td><a href="" className="purple-color">One Line Service Title Goes Here</a></td>
                          <td className="text-right">€ 650</td>
                      </tr>
                        <tr>
                          <td colSpan="3" className="text-right padt20"><span className="grand-total">€ 3,250</span></td>
                        </tr>
                    </tbody>
                  </table>



                    {/* <h5>SERVICES</h5> */}
                    {/* <div>DATE</div>
                    <div>FOR</div>
                    <div>AMOUNT</div>
                    <ul className="regis-list"> */}

                      {/* {renderCleared()} */}
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
                    {/* </ul> */}
                  </TabPanel>
                  <TabPanel>
                    {/* <h5>SERVICES</h5> */}
                    <div>DATE</div>
                    <div>FOR</div>
                    <div>PRICE</div>
                    <ul className="regis-list">
                      {renderPendingClearance()}
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