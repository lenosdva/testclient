import { useEffect, useState, useCallback } from "react"
import Image from "next/image";
import Link from "next/link";
import { withTranslation } from "../../constent/i18n/i18n"
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { get } from "lodash";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { StyledEngineProvider } from '@mui/material/styles';
import { useDropzone } from 'react-dropzone';
import Select from 'react-select'
import {CodeOptions as options} from '../../utils/codes'
import {CityOptions as cityOptions} from '../../utils/codes'

function AddGig(props) {
  const [value, setValue] = useState('1');
  const [title, setTitle] = useState("");
  const [error, setError] = useState({});
  const [category, setCategory] = useState("");
  const [workingArea, setWorkingArea] = useState(null);
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [about, setAbout] = useState("");
  const [picture1, setPicture1] = useState("");
  const [picture2, setPicture2] = useState("");
  const [picture3, setPicture3] = useState("");
  const [confirmation, setConfirmation] = useState(false);


  const dispatch = useDispatch();
  const router = useRouter();




  const [queryId, setQueryId] = useState(get(router, 'query.id', ''));

  const { uploadDoc, gigLoading, gigData, addGigLoading,  } = useSelector(state => ({
    uploadDoc: state.handyman.uploadData,
    gigLoading: state.handyman.gigLoading,
    gigData: state.handyman.gig,
    addGigLoading: state.handyman.addGigLoading,
    addGigData: state.handyman.addGigData,
  }));

  useEffect(() => {
    if(queryId != '') {
      const data = {}
      data.id = queryId
      dispatch({ type: "GET_GIG", payload: data })
    }
  }, [])

  useEffect(() => {
    console.log("pincode:", pincode)
    console.log("city:", city)
  }
  ,[pincode, city])

  useEffect(() => {
    setTitle(get(gigData, 'title', ''))
    setCategory(get(gigData, 'serivce.name', ''))
    setWorkingArea(get(gigData, 'workingArea'))
    setPincode(get(gigData, 'pincode', ''))
    setCity(get(gigData, 'city', ''))
    setMinPrice(get(gigData, 'minPrice'))
    setMaxPrice(get(gigData, 'maxPrice'))
    setAbout(get(gigData, 'description', ''))
    setPicture1(get(gigData, 'gallery[0].document', ''))
    setPicture2(get(gigData, 'gallery[1].document', ''))
    setPicture3(get(gigData, 'gallery[2].document', ''))
    setConfirmation(true)

  }, [gigLoading])



  const onDrop1 = useCallback(acceptedFiles => {
    const image = acceptedFiles[0]
    image.url = URL.createObjectURL(image)
    var formData = new FormData();
    formData.append('files', image)
    dispatch({ type: 'UPLOAD_REQUEST', payload: {files: formData, key: 'picture1' } })
    setPicture1(image)
  }, [])
  const { getRootProps:getRootProps1, getInputProps:getInputProps1, isDragActive:isDragActive1 } = useDropzone({ onDrop:onDrop1 })

  const onDrop2 = useCallback(acceptedFiles => {
    const image = acceptedFiles[0]
    image.url = URL.createObjectURL(image)
    var formData = new FormData();
    formData.append('files', image)
    dispatch({ type: 'UPLOAD_REQUEST', payload: {files: formData, key: 'picture2' } })
    setPicture2(image)
  }, [])
  const { getRootProps:getRootProps2, getInputProps:getInputProps2, isDragActive:isDragActive2 } = useDropzone({ onDrop:onDrop2 })

  const onDrop3 = useCallback(acceptedFiles => {
    const image = acceptedFiles[0]
    image.url = URL.createObjectURL(image)
    var formData = new FormData();
    formData.append('files', image)
    dispatch({ type: 'UPLOAD_REQUEST', payload: {files: formData, key: 'picture3' } })
    setPicture3(image)
  }, [])
  const { getRootProps:getRootProps3, getInputProps:getInputProps3, isDragActive:isDragActive3 } = useDropzone({ onDrop:onDrop3 })



  function uploadPic1(file){
    const formData = new FormData();
    formData.append('files', file)
    dispatch({ type: "UPLOAD_REQUEST", payload: {files: formData, key: 'picture1' }})
    setPicture1(file)
  }

  useEffect(() => {
    if(get(uploadDoc, 'data[0].key', '')=== "picture1"){
      setPicture1(uploadDoc.data[0])
      //dispatch({ type: "RESET_HANDYMAN" })
    }
    if(get(uploadDoc, 'data[0].key', '')=== "picture2"){
      setPicture2(uploadDoc.data[0])
      //dispatch({ type: "RESET_HANDYMAN" })
    }
    if(get(uploadDoc, 'data[0].key', '')=== "picture3"){
      setPicture3(uploadDoc.data[0])
      //dispatch({ type: "RESET_HANDYMAN" })
    }

  }, [uploadDoc])
  


  function GetServices() {
    let services = [];
    if(props.services.length > 0) {
      services = props.services.map((data) => <option>{data.name}</option>);
    }
    return services;
  }

  function getServiceID(service) {
    let ans = "";
    let myServices = props.services;
    for(let i=0; myServices.length; i++){
      if(myServices[i].name == service) {
        ans = myServices[i].id;
        return ans;
      }
    }
  }
  

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onSubmitContinue = (event) => {
    let error = {}
    if(city == 'Select a City') {
      setCity('')
    }
    if(pincode == 'Select a pincode') {
      setPincode('')
    }
    
    if (city == '' && (pincode == "" || workingArea == "")) {
      error.address = 'Choose city or pincode && area'
    }
    if (city != '' && (pincode != "" || workingArea != "")) {
      error.address = 'Choose city OR pincode && area'
    }
    if (title == '') {
      error.title = 'Write title'
    }
    if (category == '') {
      error.category = 'Choose category'
    }
    if (minPrice == '') {
      error.price = 'Required'
    }
    if (about == '') {
      error.about = 'Write decription'
    }
    
    setError(error)
    if (!Object.keys(error).length) {
      setValue("2");
    }
  };


  function onSubmit(e) {    
    e.preventDefault()
    let error = {}    
    if(city == 'Select a City') {
      setCity('')
    }
    if(pincode == 'Select a pincode') {
      setPincode('')
    }

    if (city == '' && (pincode == "" || workingArea == "")) {
      error.address = 'Choose city or pincode && area'
    }
    if (city != '' && (pincode != "" || workingArea != "")) {
      error.address = 'Choose city OR pincode && area'
    }
    if (title == '') {
      error.title = 'Write title'
    }
    if (category == '') {
      error.category = 'Choose category'
    }
    if (minPrice == '') {
      error.price = 'Required'
    }
    if (about == '') {
      error.about = 'Write decription'
    }

    if (picture1 == "") {
      error.picture = 'Required'
    }
    
    if (confirmation == false && picture1 != "") {
      error.confirmation = 'Confirmation required'
    }
    setError(error)

    console.log("PROPS: ", props)

    if (!Object.keys(error).length) {
      const data = {gallery: []}
      data.user = get(props, 'user.id', '')
      //data.id = get(props, 'gigs.id', '')
      data.title = title
      data.serivce = getServiceID(category)
      data.workingArea = workingArea
      data.pincode = pincode
      data.city = city
      data.minPrice = minPrice
      data.maxPrice = maxPrice
      data.description = about      
      data.online = true
      data.gallery.push({"name": "Pic1", document: picture1 })
      data.gallery.push({"name": "Pic2", document: picture2 })
      data.gallery.push({"name": "Pic3", document: picture3 })
      console.log("GIG DATA TO SEND: ", data)
      console.log("STATUS: ", get(props, 'handyman.status', ''))
      if(queryId == '') {
        if(get(props, 'handyman.status', 'inReview') == 'approved') {
          data.status = "active"
        } else {
          data.status = "paused"
        }        
        dispatch({ type: "ADD_GIG", payload: data })
        if(Object.keys(error).length === 0 && error.constructor === Object) {          
          router.push('/add-gig-complete')
        }
      } else {
        data.id = queryId
        dispatch({ type: "UPDATE_GIG", payload: data })
        if(Object.keys(error).length === 0 && error.constructor === Object) {
          router.push('/my-services')
        }
      }
    }    

  }

  return (
    <div className="add-gig-wrapper">
      <div className="client-dashboard-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-12">
              <h1 className="heading">{queryId == '' ? props.t("profileGig.addGig") : props.t("profileGig.editGig")}</h1>
              
            </div>            
          </div>
          <div className="row">
              <div className="col-lg-12 col-md-12 mt-10">
                <StyledEngineProvider injectFirst>
                  <TabContext value={value}>
                      <Tabs
                        value={value}
                        onChange={handleChange}
                        textColor="secondary"
                        indicatorColor="secondary"
                        aria-label="secondary tabs example"
                      >
                        <Tab className="Tabdash" value="1" label="OVERVIEW" />
                        <Tab className="Tabdash" value="2" label="GALLERY" />
                      </Tabs>
                      <TabPanel value="1"> 
                            <div className="row">
                              <div className="col-lg-12 col-md-12">

                                <div className="names">              
                                    <div className="d-flex justify-content-between"><h4 className="label">{props.t("profileGig.serviceTitle")} *</h4><span>100 Words Max</span></div>
                                      <input
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        type="text"
                                        name="title"
                                        className="input"
                                        placeholder="Moving Out Service"
                                        //disabled={ editButton? "disabled" : "" }
                                      // onBlur={submitData}
                                      />
                                      {get(error, 'title', false) &&
                                        <span className="errormsg"> {get(error, 'title', false)}</span>
                                      } 
                                </div>
                                <div className="names d-flex flex-wrap">
                                    <div className="category">              
                                        <h4 className="label">{props.t("profileGig.category")} *</h4>
                                          <select
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                            type="text"
                                            name="category"
                                            className="select"
                                            placeholder="Pick a Category"
                                            //disabled={ editButton? "disabled" : "" }
                                          // onBlur={submitData}
                                          >
                                          <option>Pick a Category</option>
                                          <GetServices />
                                          </select>
                                          {get(error, 'category', false) &&
                                            <span className="errormsg"> {get(error, 'category', false)}</span>
                                          } 
                                    </div>
                                    <div className="workingarea">      
                                          <h4 className="label">{props.t("profileGig.area")} *</h4>
                                          <input
                                            value={workingArea}
                                            onChange={(e) => setWorkingArea(Number(e.target.value))}
                                            type="text"
                                            name="workingarea"
                                            className="input"
                                            placeholder="Radius (in kms)"
                                            //disabled={ editButton? "disabled" : "" }
                                          // onBlur={submitData}
                                          />
                                          {get(error, 'address', false) &&
                                            <span className="errormsg"> {get(error, 'address', false)}</span>
                                          }
                                    </div>
                                    <div className="around">    
                                          <h4 className="label"> </h4>          
                                          <p>around</p>
                                    </div>
                                    <div className="workingarea mt-4"> 
                                                  <h4 className="label"></h4>
                                                  <p></p>
                                                  <Select 
                                                    options={options}
                                                    placeholder="Select a pincode"
                                                    //value={pincode}
                                                    onChange={(pincode) => (pincode != null) ? setPincode(pincode.value) : setPincode('')}
                                                    isClearable={true}
                                                    isSearchable={true}
                                                    //type="text"
                                                    //name="pincode"
                                                    //className="select"
                                                    className="react-select1"
                                                    classNamePrefix="react-select1"
                                                    
                                                    
                                                  />          
                                                  {/*<select
                                                    value={pincode}
                                                    onChange={(e) => setPincode(e.target.value)}
                                                    type="text"
                                                    name="pincode"
                                                    className="select"
                                                    placeholder="Select a pincode"
                                                    //disabled={ editButton? "disabled" : "" }
                                                  // onBlur={submitData}
                                                  >
                                                  <option>Select a pincode</option>
                                                  <option>12345</option>
                                                  </select>    */}                                              
                                    </div>
                                </div>
                                <div className="namesor">
                                  <div className="city">
                                    <p className="label">or</p>
                                                  <Select 
                                                    options={cityOptions}
                                                    placeholder="Select a City"
                                                    onChange={(city) => (city != null) ? setCity(city.value) : setCity('')}
                                                    isClearable={true}
                                                    isSearchable={true}
                                                    className="react-select1"
                                                    classNamePrefix="react-select1"
                                                    
                                                  />
                                            {/*<select
                                                    value={city}
                                                    onChange={(e) => setCity(e.target.value)}
                                                    type="text"
                                                    name="category"
                                                    className="select"
                                                    placeholder="Select a pincode"
                                                    //disabled={ editButton? "disabled" : "" }
                                                  // onBlur={submitData}
                                                  >
                                                  <option>Select a City</option>
                                                  <option>Berlin</option>
                                                  <option>Munhen</option>
                                                  </select> */}                                     
                                  </div> 
                              </div>
                                <div className="names">
                                     
                                          <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d643787.16186685!2d13.31220601214094!3d52.23970859504211!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2sru!4v1679800511984!5m2!1sru!2sru" 
                                              width="100%" 
                                              height="297" 
                                              style={{ border:0 }}
                                              allowfullscreen="" 
                                              className="map"
                                              loading="lazy" 
                                              referrerpolicy="no-referrer-when-downgrade">
                                          </iframe>
                                  
                                </div>
                                <div className="names mt-5">              
                                    <h4 className="label">{props.t("profileGig.priceRange")} *</h4>
                                    <div className="d-flex pr flex-nowrap">
                                      <input
                                        value={minPrice}
                                        onChange={(e) => setMinPrice(Number(e.target.value))}
                                        type="text"
                                        name="price"
                                        className="input price"
                                        placeholder="Amount in Euros"
                                        //disabled={ editButton? "disabled" : "" }
                                      // onBlur={submitData}
                                      />                                      
                                      <p>to</p>
                                      <input
                                        value={maxPrice}
                                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                                        type="text"
                                        name="title"
                                        className="input price"
                                        placeholder="Amount in Euros"
                                        //disabled={ editButton? "disabled" : "" }
                                      // onBlur={submitData}
                                      />
                                    </div>
                                    {get(error, 'price', false) &&
                                        <span className="errormsg"> {get(error, 'price', false)}</span>
                                      }
                                </div>
                                <div className="names mt-4">              
                                <div className="d-flex justify-content-between"><h4 className="label">{props.t("profileGig.description")} *</h4><span>100 Words Max</span></div>
                                    <textarea name="about" type="text" value={about} onChange={(e) => setAbout(e.target.value)} className="input large mr-2" placeholder="Add a description about your service here" />
                                        {get(error, 'about', false) &&
                                          <span className="errormsg"> {get(error, 'about', false)}</span>
                                        } 
                                </div>
                                <div className="names">
                                    <button onClick={onSubmitContinue} className="btn primary-submit" >
                                        Save & Continue
                                    </button>
                                </div>
                                

                        </div>
                    </div>
                      
                      </TabPanel>
                      <TabPanel value="2">
                      <div className="row">
                        <div className="col-lg-12 col-md-12">
                                  <div className="names">              
                                    <h4 className="label test">{props.t("profileGig.photo")}</h4>
                                    <p className="test">Upload photos that describe or are related to your service.</p>                                                   
                                  </div>

                                  <div className="d-flex flex-wrap justify-content-between">
                                      <div {...getRootProps1()} className="drag" >
                                        <input {...getInputProps1()} className="input" placeholder="Drag a Photo or Browse" />
                                        {picture1 === '' ?
                                            <img
                                              src='/assets/images/draganddropicon.png'
                                              alt=""
                                              layout="responsive"
                                              className="pic"
                                              //style={{ width: 80, height: 69 }}
                                            />
                                            :
                                            <img
                                              src={get(picture1, 'url', '')}
                                              alt=""
                                              layout="responsive"
                                              className="img-wrap"
                                              //style={{ width: 200, height: 200, borderRadius: 75 }}
                                            />                  
                                          }
                                      {picture1 === '' &&
                                        <div className="dragtext">
                                            <p>Drag a Photo or</p>
                                            <a>Browse</a>
                                        </div>
                                      }                                      
                                      </div>
                                      <div {...getRootProps2()} className="drag" >
                                        <input {...getInputProps2()} className="input" placeholder="Drag a Photo or Browse" />
                                          {picture2 === '' ?
                                            (picture1 != '' &&
                                                <img
                                                  src='/assets/images/draganddropicon.png'
                                                  alt=""
                                                  layout="responsive"
                                                  className="pic"
                                                  //style={{ width: 80, height: 69 }}
                                                />
                                            )
                                            :
                                            <img
                                              src={get(picture2, 'url', '')}
                                              alt=""
                                              layout="responsive"
                                              //style={{ width: 200, height: 200, borderRadius: 75 }}
                                            />                  
                                          }
                                          {picture2 === '' &&
                                              (picture1 != '' &&
                                              <div className="dragtext">
                                                  <p>Drag a Photo or</p>
                                                  <a>Browse</a>
                                              </div>)
                                            }
                                      </div>
                                      <div {...getRootProps3()} className="drag" >
                                        <input {...getInputProps3()} className="input" placeholder="Drag a Photo or Browse" />
                                          {picture3 === '' ?
                                              (picture2 != '' &&
                                                    <img
                                                      src='/assets/images/draganddropicon.png'
                                                      alt=""
                                                      layout="responsive"
                                                      className="pic"
                                                      //style={{ width: 80, height: 69 }}
                                                    />
                                                )
                                            :
                                            <img
                                              src={get(picture3, 'url', '')}
                                              alt=""
                                              layout="responsive"
                                              //style={{ width: 200, height: 200, borderRadius: 75 }}
                                            />                  
                                          }
                                            {picture3 === '' &&
                                                (picture2 != '' &&
                                                <div className="dragtext">
                                                    <p>Drag a Photo or</p>
                                                    <a>Browse</a>
                                                </div>)
                                            }
                                      </div>
                                      
                                </div>
                                {get(error, 'picture', false) &&
                                          <span className="errormsg"> {get(error, 'picture', false)}</span>
                                        }
                                <br />
                                <input className="input-check" type="checkbox" checked={confirmation} onChange={() => setConfirmation(!confirmation)} /><span className="agreement">I declare that these materials were created by myself or by my team and do not infringe on any 3rd party rights. I understand that the
illegal use of digital assets is against Dein Hausman’s Terms of Service and may result in blocking of my seller account. </span>
                                        {get(error, 'confirmation', false) &&
                                          <span className="errormsg"> {get(error, 'confirmation', false)}</span>
                                        }

                        </div>
                        <div className="names">
                            <button onClick={onSubmit} className="btn primary-submit1" >
                                Save
                            </button>
                        </div>
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

export default withTranslation('common')(AddGig)
