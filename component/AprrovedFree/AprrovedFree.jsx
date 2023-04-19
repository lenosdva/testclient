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

export function AprrovedFree (approvedFree, setApprovedFree) {
  const dispatch = useDispatch()
  const { handymanData, handymanLoading } = useSelector(state => ({
    handymanData: state.handyman.hyndyman,
    handymanLoading: state.handyman.hyndymanLoading,
  }));

  const router = useRouter()

  function pause(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


  function activate() { 
    setApprovedFree(false)

  }

  


  

  return (
        <div className="paysubmodule">          
          <div className="modal-wrapper" onClick={activate}>
            <Modal
              isOpen={approvedFree}
              //onRequestClose={close}
              ariaHideApp={false}
              // style={customStyles}
              contentLabel="Example Modal"
              className="modal-wrapper-sm4"
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
                <img
                    src="/assets/images/thumbup.png"
                    alt=""
                    //width={24}
                    //height={24}
                  />
              </header>
              <div className="modalbody4">
                  <div className="d-flex justify-content-center">
                      <p>You have successfully activated free 30 days trial</p>
                  </div>
                
                
                
            </div>

            </Modal>
          </div>
    </div>
  );
}

