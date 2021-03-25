import Image from "next/image";
import React, { useEffect, useState } from "react";
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux'
import OtpInput from 'react-otp-input';
import { get } from 'lodash'

export function otp(otpModel, closeModal, mobile) {
  const dispatch = useDispatch()
  const [sotp, setOtp] = useState('')
  const [error, setError] = useState({})
  const { otpData, resendOtpData } = useSelector(state => ({
    otpData: state.user.otpData,
    resendOtpData: state.user.resendOtpData,
  }));

  function onChangeOtp(e) {
    setOtp(e)
    setError({})
    if (e.length === 6) {
      dispatch({ type: 'VERIFY_OTP', payload: { otp: e, mobile } })
    }
  }

  useEffect(() => {
    // 
    if (get(otpData, 'result.error', false)) {
      dispatch({ type: 'RESET_LOG' })
      const error = {}
      error.serverError = get(otpData, 'result.message', 'Please try again')
      setError(error)
      // NotificationManager.error('Error message', get(otpData, 'result.message', 'Please try again'))
    }
    if (get(resendOtpData, 'result.error', false)) {
      dispatch({ type: 'RESET_LOG' })
      const error = {}
      error.serverError = get(resendOtpData, 'result.message', 'Please try again')
      setError(error)
      // NotificationManager.error('Error message', get(resendOtpData, 'result.message', 'Please try again'))
    }
    if (get(resendOtpData, 'result.success', false)) {
      dispatch({ type: 'RESET_LOG' })
      // NotificationManager.success('Success message', get(resendOtpData, 'result.message', 'OTP sent to given number'));
    }

  }, [otpData, resendOtpData])

  return (
    <div className="modal-wrapper">
      <Modal
        isOpen={otpModel}
        onRequestClose={closeModal}
        ariaHideApp={false}
        // style={customStyles}
        contentLabel="Example Modal"
        className="modal-wrapper-sm otp-modal"
      >
        <header>
          <button onClick={closeModal} className="close-btn">
            <Image
              src="/assets/svg/close-modal.svg"
              alt=""
              width={24}
              height={24}
            />
          </button>
          <h4>Confirm your number</h4>
        </header>
        <div className="modalbody">
          {/* <div className="otp-wrapper"> */}
          <div>
            <OtpInput
              value={sotp}
              containerStyle="otp-wrapper"
              onChange={onChangeOtp}
              numInputs={6}
              className="otp-inp"
            // separator={<span>-</span>}
            />
            {get(error, 'serverError', '') &&
              <span className="errormsg">{get(error, 'serverError', '')}</span>
            }
            {/* <input type="text" className="otp-inp" />
          <input type="text" className="otp-inp" />
          <input type="text" className="otp-inp"/>
          <input type="text" className="otp-inp" /> */}
          </div>
          <p className="last-para">Didn’t got the code?  <span onClick={() => dispatch({ type: 'RESEND_OTP', payload: { mobile } })}>Resend</span></p>
        </div>
      </Modal>
    </div>
  );
}