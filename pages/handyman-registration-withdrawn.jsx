import { useState, useEffect, useCallback } from "react"
import { Layout, Footer } from "../component";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Image from "next/image";
import PostalCode from "../constent/postal"
import { useDispatch, useSelector } from 'react-redux'
import { get, toPath } from "lodash";
import Select from 'react-select';
import { useDropzone } from 'react-dropzone'
import { useRouter } from 'next/router'
// import { route } from "next/dist/next-server/server/router";
// import {get} from "lodash";


export default function Category(props) {
  const route = useDropzone()
  const [pincode, setPincode] = useState([])
  const [city, setCity] = useState([])
  const [radius, setRedius] = useState('')
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState({})
  const [code, setCode] = useState([])
  const [allCity, setAllCity] = useState([])
  const [tabIndex, setTabIndex] = useState(0);
  const [mainIndex, setMainIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [aggrement, setAggrement] = useState(false);
  const [mainError, setMainError] = useState(false);

  const dispatch = useDispatch()
  const router = useRouter()
  const { searchByIdData, addGigData, gig, update } = useSelector(state => ({
    searchByIdData: state.services.searchByIdData,
    searchByIdLoading: state.services.searchByIdLoading,
    addGigLoading: state.handyman.addGigLoading,
    addGigData: state.handyman.addGigData,
    gigLoading: state.handyman.gigLoading,
    gig: state.handyman.gig,
    update: state.handyman.update,
  }));

  useEffect(() => {
    if (get(router, 'query.id', false)) {
      setTitle(get(gig, 'title', ''))
      setCategory(get(gig, 'service', ''))
      setDescription(get(gig, 'description', ''))
      setPincode(get, (gig, 'pincode', ''))
      setRedius(get, (gig, 'radius', ''))
      setFrom(get, (gig, 'from', ''))
      setTo(get, (gig, 'to', ''))
    }


  }, [gig])

  useEffect(() => {
    console.log("addGigData", addGigData)
    if (get(addGigData, 'data.success', false) || get(addGigData, 'data.success', false)) {
      router.push('/handyman-registration-services')
      dispatch({ type: 'RESET_GIG' })
    }
  }, [addGigData, update])

  useEffect(() => {
    dispatch({ type: 'GET_SERVICE' })
    if (get(router, 'query.id', false)) {
      dispatch({ type: 'GET_GIG', payload: get(router, 'query.id', '') })
    }
    const pin = []
    const pinCity = []
    PostalCode.map((data) => {
      pin.push({ value: data.code, label: data.code })
      pinCity.push({ value: data.city, label: data.city })
    })
    setCode([...pin])
    setAllCity([...pinCity])
  }, [])


  function onChange(e) {
    const re = /^[0-9,\b]+$/;
    if (e.target.name === 'radius') {
      if (e.target.value === '' || re.test(e.target.value)) {
        setRedius(e.target.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
      }
    } else if (e.target.name === 'to') {
      if (e.target.value === '' || re.test(e.target.value)) {
        setTo(e.target.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
      }
    } else if (e.target.name === 'form') {
      if (e.target.value === '' || re.test(e.target.value)) {
        setFrom(e.target.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
      }
    }
  }

  function nextStep() {
    const Terror = {}
    if (title === '') {
      Terror.title = "Please enter title"
    } if (category === '') {
      Terror.category = "Please select a category"
    } if (radius === '' && !city.length) {
      Terror.radius = "Please enter radius or select a city"
    } if (!pincode) {
      Terror.pincode = "Please select pincode"
    } if (from === '') {
      Terror.from = "Please enter start price"
    } if (to === '') {
      Terror.to = "Please enter end price"
    } if (description === '') {
      Terror.description = "Please enter description"
    }
    setError(Terror)
    if (!Object.keys(Terror).length) {
      setTabIndex(1)
      if (mainIndex < 1) {
        setMainIndex(1)
      }
      window.scroll({
        top: 1,
      })
    }
  }

  function submitForm() {
    const Terror = {}
    const mainError = {}
    if (title === '') {
      Terror.title = "Please enter title"
    } if (category === '') {
      Terror.category = "Please select a category"
    } if (radius === '' && !city.length) {
      Terror.radius = "Please enter radius or select a city"
    } //if (!pincode.length) {
      //Terror.pincode = "Please select pincode"
    //} 
    if (from === '') {
      Terror.from = "Please enter start price"
    } if (to === '') {
      Terror.to = "Please enter end price"
    } if (description === '') {
      Terror.description = "Please enter description"
    } if (!aggrement) {
      mainError.aggrement = "Please accept term and conditions"
    } if (images.length != 3) {
      mainError.images = "Please upload all three images"
    }

    setError(Terror)
    setMainError(mainError)
    console.log("Terror", Terror, mainError)
    if (!Object.keys(Terror).length && !Object.keys(mainError).length) {
      const data = new FormData()
      data.append('title', title);
      data.append('service', category);
      data.append('radius', radius);
      pincode.map((pin)=>{
        data.append('pincode[]', pin.value);
      })
      
      data.append('from', from);
      data.append('to', to);
      data.append('description', description);
      // data.append('description', description);
      images.map((img) => {
        data.append('images[]', img);
      })
      pincode.map((code) => {
        data.append('pincode[]', code.value)
      })
      city.map((cit) => {
        data.append('city[]', cit.value)
      })
      if (get(router, 'query.id', false)) {
        data.append('gigId', get(router, 'query.id', ''))
        dispatch({ type: 'UPDATE_REQUEST', payload: data })
      }
      else {
        dispatch({ type: 'ADD_GIG', payload: data })
      }
    }
  }

  const onDrop = useCallback(acceptedFiles => {
    console.log("acceptedFiles", acceptedFiles)
    const file = images
    const image = acceptedFiles[0]
    // const blob = new Blob([image], {type: 'image/png'})
    image.url =  URL.createObjectURL(image)
    var reader = new FileReader();
    // image.url = reader.readAsDataURL(image);
    console.log("image", image)
    file.push(image)
    setImages([...file])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ maxSize: 26214400, onDrop, multiple: false, accept: "image/*" })
  // console.log(images.length, images[0])
  return (
    <Layout setWebSoket={props.setWebSoket}>
      <div className="category">

        <div>
          <div className="container">
            <div className="row">
              <div className="col-lg-12 registration-tabs">
                <Tabs selectedIndex={tabIndex} onSelect={index => mainIndex == 1 && index <= 1 && setTabIndex(index)} >
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
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="input-field"
                        placeholder="Professional Moving Out Service"
                      />
                      {get(error, 'title', '') &&
                        <span>{get(error, 'title', '')}</span>
                      }
                    </div>

                    <div className="d-flex flexwrap margmin15">

                      <div className="col-md-5">
                        <h3 className="label">Category</h3>
                        {/* <input
                          type="text"
                          className="input-field"
                          placeholder="Professional Moving Out Service"
                        /> */}
                        <select value={category} onChange={(e) => setCategory(e.target.value)} className="input-field">
                          <option value="">Pick a category</option>
                          {searchByIdData && searchByIdData.map((data, key) => (
                            <option key={key} value={get(data, '_id', '')}>{get(data, 'name', '')}</option>
                          ))}
                        </select>
                        {get(error, 'category', '') &&
                          <span>{get(error, 'category', '')}</span>
                        }
                      </div>

                      <div className="col-md-3">
                        <h3 className="label">Working Area</h3>
                        <input
                          type="text"
                          name="radius"
                          onChange={onChange}
                          value={radius}
                          className="input-field"
                          placeholder="Radius (in kms)"
                        />
                        {get(error, 'radius', '') &&
                          <span>{get(error, 'radius', '')}</span>
                        }
                      </div>

                      <div className="col-md-1"><span className="aroundlabel">around</span></div>

                      <div className="col-md-3">
                        <h3 className="label">Pincode</h3>
                        {/* <input
                          type="text"
                          className="input-field"
                          placeholder="Select a pincode"
                        /> */}
                        {/* <select multiple={true} onChange={onChangePincode} value={pincode} className="input-field">
                          <option value="">Select a pincode</option>
                          {PostalCode.map((data, key) => (
                            <option key={key} value={data.code}>{data.code}</option>
                          ))}
                        </select> */}
                        <Select
                          isMulti={true}
                          value={pincode}
                          placeholder="Select a pincode"
                          onChange={(e)=>{
                            setPincode(e)
                            setCity([])
                          }}
                          options={code}
                        />
                        {get(error, 'pincode', '') &&
                          <span>{get(error, 'pincode', '')}</span>
                        }
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
                        {/* <input
                          type="text"
                          className="input-field"
                          placeholder="Select A City"
                        /> */}
                        {/* <select onChange={onChangeCity} value={city} className="input-field">
                          <option value="">Select a City</option>
                          {PostalCode.map((data, key) => (
                            <option key={key} value={data.city}>{data.city}</option>
                          ))}
                        </select> */}
                        <Select
                          isMulti={true}
                          value={city}
                          onChange={(e)=>{
                            setCity(e)
                            setPincode([])
                          }}
                          placeholder="Select A City"
                          // className="input-field"
                          options={allCity}
                        />
                        {get(error, 'city', '') &&
                          <span>{get(error, 'city', '')}</span>
                        }
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
                          name="form"
                          onChange={onChange}
                          value={from}
                          className="input-field"
                          placeholder="Amount In Euros"
                        />
                        {get(error, 'from', '') &&
                          <span>{get(error, 'from', '')}</span>
                        }
                      </div>
                      <div className="col-md-1"><span className="aroundlabel">to</span></div>
                      <div className="col-md-4">
                        <h3 className="label ht42"></h3>
                        <input
                          type="text"
                          name="to"
                          onChange={onChange}
                          value={to}
                          className="input-field"
                          placeholder="Amount in Euros"
                        />
                        {get(error, 'to', '') &&
                          <span>{get(error, 'to', '')}</span>
                        }
                      </div>
                    </div>
                    <div className="col-md-12 margmin15 mt-5">
                      <h3 className="label">Service Description</h3>
                      <textarea onChange={(e) => setDescription(e.target.value)} value={description} type="text" className="textarea" placeholder="Add a description about your service here" />
                      {get(error, 'description', '') &&
                        <span>{get(error, 'description', '')}</span>
                      }
                    </div>

                    <div className="col-md-12 text-center margmin15 mt-5">
                      <button className="btn primarybtn-fill" onClick={nextStep}>Save & Continue</button>
                    </div>
                  </TabPanel>
                  <TabPanel>
                    <div className="img-section">
                      <div className="servicephotos">
                        <div className="servicephotos-head">
                          <h5>Service Photos</h5>
                          <h6>({images.length}/3)</h6>
                        </div>
                        <p>Upload photos that describe or are related to your service.</p>
                      </div>

                      <ul className="servicephotos-listing">
                        {images.length === 0 ?
                          <li>
                            <div accept="image/*" multiple={false} {...getRootProps()}>
                              <input {...getInputProps()} />
                              <Image
                                src="/assets/svg/photo-img.svg"
                                alt="testimonial2"
                                width={111}
                                height={129}
                              />
                            </div>
                          </li>
                          : <li>
                            {get(images[0], 'url', '') &&
                              <img
                                src={`${get(images[0], 'url', '')}`}
                                alt="testimonial2"
                                width={111}
                                height={129}
                              />
                            }
                          </li>
                        }{images.length === 1 ?
                          <li>
                            <div {...getRootProps()}>
                              <input {...getInputProps()} />
                              <img
                                src="/assets/svg/photo-img.svg"
                                alt="testimonial2"
                                width={111}
                                height={129}
                              />
                            </div>
                          </li>
                          : <li>
                            <div>
                            {get(images[1], 'url', '') &&
                              <img
                                src={get(images[1], 'url', '')}
                                alt="testimonial2"
                                width={111}
                                height={129}
                              />
                            
                            }
                              </div>
                          </li>
                        }{images.length === 2 ?
                          <li>
                            <div {...getRootProps()}>
                              <input {...getInputProps()} />
                              <Image
                                src="/assets/svg/photo-img.svg"
                                alt="testimonial2"
                                width={111}
                                height={129}
                              />
                            </div>
                          </li>
                          : <li>
                            {get(images[2], 'url', '') &&
                              <img
                                src={get(images[2], 'url', '')}
                                alt="testimonial2"
                                width={111}
                                height={129}
                              />
                            }
                          </li>
                        }
                        {get(mainError, 'images', '') &&
                          <span>{get(mainError, 'images', '')}</span>
                        }
                      </ul>

                      <div className="form-group mt-5 mb-5 checkbox-wrapper">
                        <input type="checkbox" checked={aggrement} onChange={(e) => setAggrement(e.target.checked)} id="html" />
                        <label for="html">
                          I declare that these materials were created by myself or by my team and do not infringe on any 3rd party rights. I understand that the
                          illegal use of digital assets is against Dein Hausman’s Terms of Service and may result in blocking of my seller account.
                </label>
                        {get(mainError, 'aggrement', '') &&
                          <span>{get(mainError, 'aggrement', '')}</span>
                        }
                      </div>


                      <div className="col-md-12 text-center mt-5">
                        <button onClick={submitForm} className="btn primarybtn-fill">Publish</button>
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
          <Footer ws={props.ws} />
        </div>
      </div>
    </Layout>
  );
}
