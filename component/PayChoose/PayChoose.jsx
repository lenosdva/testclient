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

export function PayChoose (payChooseModel, setChooseModel) {
  const dispatch = useDispatch()
  const { handymanData, handymanLoading } = useSelector(state => ({
    handymanData: state.handyman.hyndyman,
    handymanLoading: state.handyman.hyndymanLoading,
  }));

  const router = useRouter()


  function activate() {    
    setChooseModel(false)
    const data = {}
    data.id = get(handymanData, 'id', '')
    let time = new Date();
    time.setDate(time.getDate() + 30);
    data.freeTrial = time.toISOString();
    dispatch({ type: 'UPDATE_HYNDYMAN', payload: data })
    router.push('/handyman-registration')
  }

  function payNow() {    
    setChooseModel(false)    
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
          {(handymanLoading) &&
              <div className="loading-wrapper">
                <div className="loader"></div>
              </div>
            }
          <div className="modal-wrapper">
            <Modal
              isOpen={payChooseModel}
              //onRequestClose={close}
              ariaHideApp={false}
              // style={customStyles}
              contentLabel="Example Modal"
              className="modal-wrapper-sm3"
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
                <div className="d-flex flex-wrap justify-content-around">
                    <div className="flex-column">
                      <div className="box d-flex">
                        <div className="flex-column">
                          <img
                            src="/assets/images/standart.png"
                            alt=""
                            width={76}
                            height={54}
                            className="img"
                          />
                          <h4 className="align-self-center">Standart</h4>
                          <div className="tik"><p>Texttextexttexttexttext</p></div>
                          <div className="tik"><p>Texttextexttexttexttext</p></div>
                          <div className="tik"><p>Texttextexttexttexttext</p></div>
                          <div className="tik"><p>Texttextexttexttexttext</p></div>
                        </div>

                      </div>

                      <div className="box1 justify-content-center">
                        <div className="">                          
                          <h4 className="align-self-center">Monthly</h4>
                          <div className="df"><p>€ 50</p></div>
                          <div className="dk"><p>per month</p></div>
                          
                        </div>
                      </div>

                      <div className="box2 justify-content-center">
                        <div className="">                          
                          <h4 className="align-self-center">Annual</h4>
                          <div className="df"><p><span className="toth">€ 600</span> € 520</p></div>
                          <div className="dk"><p>per month</p></div>
                          
                        </div>
                      </div>
                    </div>

                    <div className="flex-column">
                      <div className="box d-flex">
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

                      <div className="box1 justify-content-center">
                        <div className="">                          
                          <h4 className="align-self-center">Monthly</h4>
                          <div className="df"><p>€ 80</p></div>
                          <div className="dk"><p>per month</p></div>
                          
                        </div>

                      </div>
                      <div className="box2 justify-content-center">
                        <div className="">                          
                          <h4 className="align-self-center">Annual</h4>
                          <div className="df"><p><span className="toth">€ 960</span> € 900</p></div>
                          <div className="dk"><p>per month</p></div>
                          
                        </div>
                      </div>                     

                    </div>                    
                      
                </div>
                
                  <div className="d-flex justify-content-center butpay">
                            <button className="btn bt" onClick={payNow}>Pay</button>
                  </div>

                
            </div>

            </Modal>
          </div>
    </div>
  );
}

