import Image from "next/image";
import React, { useEffect, useState } from "react";
import Modal from 'react-modal';
import InputMask from 'react-input-mask';
import { useDispatch, useSelector } from 'react-redux'
import { get } from "lodash";

export default function loginModal(loginModel, closeModal, setSignUpModel, serverError, setForgetModel) {
    const dispatch = useDispatch()
    const { forgetPassword, forgetPasswordLoading, resetPasswordLoading, resetPassword } = useSelector(state => ({
        forgetPasswordLoading: state.user.forgetPasswordLoading,
        forgetPassword: state.user.forgetPassword,
        resetPasswordLoading: state.user.resetPasswordLoading,
        resetPassword: state.user.resetPassword,
    }));
    const [password, setPassword] = useState('')
    const [error, setError] = useState({})
    const [newpassword, setnewpassword] = useState('')
    const [confirmpassword, setconfirmpassword] = useState('')
    const [pwd, setPwd] = useState('')

    function openSignup() {
        close()
        setSignUpModel(true)
    }

    function openForgot() {
        close()
        setForgetModel(true)
    }

    function close() {
        // closeModal()
        // setPhone('')
        // setCountry('')
    }

    function onLogin(e) {
        e.preventDefault()
        let error = {}

        if (password === '') {
            error.password = 'please enter password'
        } else if (password.length < 6) {
            error.password = 'minimum password length should 6 characters'
        }
        if (pwd === '') {
            error.resetPassword = 'please enter password once again'
        }
        else if (password !== pwd) {
            error.resetPassword = 'Password does not match '
        }
        setError(error)
        if (!Object.keys(error).length) {
            dispatch({ type: 'RESET_PASSWORD', payload: { password: 'newPassword', authKey: '1234' } })
        }
        console.log("error======>", error)
    }
return (
        <div>
            <div className="modal-wrapper">
                <Modal
                    isOpen={loginModel}
                    onRequestClose={close}
                    ariaHideApp={false}
                    contentLabel="Example Modal"
                    className="modal-wrapper-sm middle-modal"
                >
                    <header>
                        <button onClick={close} className="close-btn">
                            <Image
                                src="/assets/svg/close-modal.svg"
                                alt=""
                                width={24}
                                height={24}
                            />
                        </button>
                        <h4>Reset Password</h4>
                    </header>
                    <div className="modalbody">
                         <form onSubmit={onLogin}>
                            <div className="box">
                                <div className="form-group">
                                    <div className="p-lr">
                                        <div className="labels">New Password</div>
                                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="field-input" />
                                    </div>
                                </div>
                                <div className="form-divider"></div>
                                <div className="form-group">
                                    <div className="p-lr">
                                        <div className="labels">Confirm Password</div>
                                        <input value={pwd} onChange={(e) => setPwd(e.target.value)} type="password" className="field-input" />

                                    </div>
                                </div>
                            </div>
                            {get(error, 'password', '') &&
                                <span className="errormsg">{get(error, 'password', '')}</span>
                            }{get(serverError, 'serverError', '') &&
                                <span className="errormsg">{get(serverError, 'serverError', '')}</span>
                            }
                             <button className="btn btn-continue" onClick={onLogin}>Submit</button>
                        </form>
                    </div>
                </Modal>
            </div>
        </div>
    );
}