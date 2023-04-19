import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Modal from 'react-modal';
import InputMask from 'react-input-mask';
import { useDispatch, useSelector } from 'react-redux'
import { get } from 'lodash'
import { GoogleLogin } from 'react-google-login'
// import FacebookLogin from 'react-facebook-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { useRouter } from 'next/router'

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
const FB_AAP_ID = process.env.NEXT_PUBLIC_FB_AAP_ID

export function PaySubModule (paySubModel, setPaySubModel, approvedFree, setApprovedFree) {
  const dispatch = useDispatch()
  const { handymanData, handymanLoading } = useSelector(state => ({
    handymanData: state.handyman.hyndyman,
    handymanLoading: state.handyman.hyndymanLoading,
  }));

  const router = useRouter()
  const [boxClass, setBoxClass] = useState("box d-flex")
  const [box1Class, setBox1Class] = useState("box1 justify-content-center")
  const [box2Class, setBox2Class] = useState("box2 justify-content-center")
  const [boxClassPrem, setBoxClassPrem] = useState("box d-flex")
  const [box1ClassPrem, setBox1ClassPrem] = useState("box1 justify-content-center")
  const [box2ClassPrem, setBox2ClassPrem] = useState("box2 justify-content-center")
  const [freeClass, setfreeClass] = useState("d-flex justify-content-center bot1")
  const [butClass, setButClass] = useState("d-flex justify-content-center but not-active")
  const [standart, setStandart] = useState(false)
  const [premium, setPremium] = useState(false)
  const [free, setFree] = useState(false)
  const [payReady, setPayReady] = useState(false)


  function setBox() {
    setStandart(true)
    setPremium(false)
    setFree(false)
    setBoxClass("box d-flex active-now")
    setBox1Class("box1 justify-content-center")
    setBox2Class("box2 justify-content-center")
    setBoxClassPrem("box d-flex")
    setBox1ClassPrem("box1 justify-content-center")
    setBox2ClassPrem("box2 justify-content-center")
    setfreeClass("d-flex justify-content-center bot1")
    setButClass("d-flex justify-content-center but not-active")
    setPayReady(false)
  }

  function setBox1() {
    setStandart(true)
    setPremium(false)
    setFree(false)
    setBoxClass("box d-flex active-now")
    setBox1Class("box1 justify-content-center active-now")
    setBox2Class("box2 justify-content-center")
    setBoxClassPrem("box d-flex")
    setBox1ClassPrem("box1 justify-content-center")
    setBox2ClassPrem("box2 justify-content-center")
    setfreeClass("d-flex justify-content-center bot1")
    setButClass("d-flex justify-content-center but")
    setPayReady(true)
  }

  function setBox2() {
    setStandart(true)
    setPremium(false)
    setFree(false)
    setBoxClass("box d-flex active-now")
    setBox1Class("box1 justify-content-center")
    setBox2Class("box2 justify-content-center active-now")
    setBoxClassPrem("box d-flex")
    setBox1ClassPrem("box1 justify-content-center")
    setBox2ClassPrem("box2 justify-content-center")
    setfreeClass("d-flex justify-content-center bot1")
    setButClass("d-flex justify-content-center but")
    setPayReady(true)
  }

  function setBoxPrem() {
    setStandart(false)
    setPremium(true)
    setFree(false)
    setBoxClass("box d-flex")
    setBox1Class("box1 justify-content-center")
    setBox2Class("box2 justify-content-center")
    setBoxClassPrem("box d-flex active-now")
    setBox1ClassPrem("box1 justify-content-center")
    setBox2ClassPrem("box2 justify-content-center")
    setfreeClass("d-flex justify-content-center bot1")
    setButClass("d-flex justify-content-center but not-active")
    setPayReady(false)
  }

  function setBox1Prem() {
    setStandart(false)
    setPremium(true)
    setFree(false)
    setBoxClass("box d-flex")
    setBox1Class("box1 justify-content-center")
    setBox2Class("box2 justify-content-center")
    setBoxClassPrem("box d-flex active-now")
    setBox1ClassPrem("box1 justify-content-center active-now")
    setBox2ClassPrem("box2 justify-content-center")
    setfreeClass("d-flex justify-content-center bot1")
    setButClass("d-flex justify-content-center but")
    setPayReady(true)
  }

  function setBox2Prem() {
    setStandart(false)
    setPremium(true)
    setFree(false)
    setBoxClass("box d-flex")
    setBox1Class("box1 justify-content-center")
    setBox2Class("box2 justify-content-center")
    setBoxClassPrem("box d-flex active-now")
    setBox1ClassPrem("box1 justify-content-center")
    setBox2ClassPrem("box2 justify-content-center active-now")
    setfreeClass("d-flex justify-content-center bot1")
    setButClass("d-flex justify-content-center but")
    setPayReady(true)
  }

  function setBoxFree() {
    setStandart(false)
    setPremium(false)
    setFree(true)
    setBoxClass("box d-flex")
    setBox1Class("box1 justify-content-center")
    setBox2Class("box2 justify-content-center")
    setBoxClassPrem("box d-flex")
    setBox1ClassPrem("box1 justify-content-center")
    setBox2ClassPrem("box2 justify-content-center")
    setfreeClass("d-flex justify-content-center bot1 active-now-free")
    setButClass("d-flex justify-content-center but")
    setPayReady(true)
  }


  function activate() {
    if(payReady) {
      if(free) {
        setPaySubModel(false)
        const data = {}
        data.id = get(handymanData, 'id', '')
        let time = new Date();
        time.setDate(time.getDate() + 30);
        data.freeTrial = time.toISOString();
        data.sendTrail = 'sent'
        dispatch({ type: 'UPDATE_FREE_STATUS', payload: data })
        //router.push('/handyman-registration')
        setApprovedFree(true)
      } else {
        setPaySubModel(false)
      }
    }
  }

  function payNow() {    
    setPaySubModel(false)    
  }

  function onSubmit(e) {
    e.preventDefault()
    const data = {}
    data.id = get(handymanData, 'id', '')
    let time = new Date();
    data.freeTrial = time.toISOString();
    dispatch({ type: 'UPDATE_HYNDYMAN', payload: data })
  }


console.log("HANDY DATA ===> ", handymanData)
  

  return (
        <div className="paysubmodule">

          <div className="modal-wrapper">
            <Modal
              isOpen={paySubModel}
              //onRequestClose={close}
              ariaHideApp={false}
              // style={customStyles}
              contentLabel="Example Modal"
              className="modal-wrapper-sm1"
              >
              <header>
                {/*<button onClick={close} className="close-btn">
                  <Image
                    src="/assets/svg/close-modal.svg"
                    alt=""
                    width={24}
                    height={24}
                  />
                </button>
                */}
                <h4>Choose your plan</h4>
              </header>
              <div className="modalbody1">
                <div className="d-flex justify-content-around">
                    <div className="flex-column">
                      <div className={boxClass} onClick={setBox}>
                        <div className="flex-column">
                          <img
                            src="/assets/images/standart.png"
                            alt=""
                            //width={76}
                            //height={54}
                            className="img"
                          />
                          <h4 className="align-self-center">Standart</h4>
                          <div className="tik"><p>Texttextexttexttexttext</p></div>
                          <div className="tik"><p>Texttextexttexttexttext</p></div>
                          <div className="tik"><p>Texttextexttexttexttext</p></div>
                          <div className="tik"><p>Texttextexttexttexttext</p></div>
                        </div>

                      </div>

                      <div className={box1Class} onClick={setBox1}>
                        <div className="">                          
                          <h4 className="align-self-center">Monthly</h4>
                          <div className="df"><p>€ 50</p></div>
                          <div className="dk"><p>per month</p></div>
                          
                        </div>
                      </div>

                      <div className={box2Class} onClick={setBox2}>
                        <div className="">                          
                          <h4 className="align-self-center">Annual</h4>
                          <div className="df"><p><span className="toth">€ 600</span> € 520</p></div>
                          <div className="dk"><p>per month</p></div>
                          
                        </div>
                      </div>
                    </div>

                    <div className="flex-column">
                      <div className={boxClassPrem} onClick={setBoxPrem}>
                        <div className="flex-column">
                          <img
                            src="/assets/images/vip.png"
                            alt=""
                            width={76}
                            height={54}
                            className="img"
                          />
                          <h4 className="align-self-center">Premium</h4>
                          <div className="tik"><p>Texttextexttexttexttext</p></div>
                          <div className="tik"><p>Texttextexttexttexttext</p></div>
                          <div className="tik"><p>Texttextexttexttexttext</p></div>
                          <div className="tik"><p>Texttextexttexttexttext</p></div>
                        </div>

                      </div>

                      <div className={box1ClassPrem} onClick={setBox1Prem}>
                        <div className="">                          
                          <h4 className="align-self-center">Monthly</h4>
                          <div className="df"><p>€ 80</p></div>
                          <div className="dk"><p>per month</p></div>
                          
                        </div>

                      </div>
                      <div className={box2ClassPrem} onClick={setBox2Prem}>
                        <div className="">                          
                          <h4 className="align-self-center">Annual</h4>
                          <div className="df"><p><span className="toth">€ 960</span> € 900</p></div>
                          <div className="dk"><p>per month</p></div>
                          
                        </div>
                      </div>                     

                    </div>                    
                      
                </div>
                
                    <div className="d-flex justify-content-center bot">
                            <h4></h4><span>or</span><h3></h3>
                    </div>
                    <div className={freeClass} onClick={setBoxFree}>
                            <h4>Try all the fuctions of our platform with free 30 days trial!</h4>
                    </div>
                    <div className={butClass}>
                            <button className="btn bt" onClick={activate}>Activate Now!</button>
                    </div>
                
                
            </div>

            </Modal>
          </div>
    </div>
  );
}

