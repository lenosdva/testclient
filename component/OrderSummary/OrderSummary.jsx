import { Router } from "../../constent/i18n/i18n";
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { get } from "lodash"
import { useEffect } from "react";

export default function PaymentCard() {
  const router = useRouter()
  const dispatch = useDispatch()
  const { paymentLoding, getCardData, paymentData } = useSelector(state => ({
    getCardLoading: state.user.getCardLoading,
    getCardData: state.user.getCardData,
    paymentLoding: state.user.paymentLoding,
    paymentData: state.user.paymentData,
    getCardLoading: state.user.getCardLoading,
  }));

  useEffect(()=>{
    if(get(paymentData, 'paid', false)){
      router.push(`/paymentgateway-successful?id=${get(router, 'query.id', '')}`)
      dispatch({ type: 'RESET_PAYMENT'})
    }
  }, [paymentData])

  function checkout(){
    dispatch({type: 'CHECKOUT', payload: {orderId: get(router, 'query.id', '') ,cardId: get(getCardData, `cards.data[${get(getCardData, 'cards.data', []).length - 1}].id`, 'Credit') }})
    // router.push("/paymentgateway-successful")
  }
  return (
    <div>
      <h4 className="mt-order">Order Summary</h4>
      <ul className="summary-details">
        <li>
          Service: <span></span>
        </li>
        <li>
          Assigned Handyman: <span></span>
        </li>
        <li>
          Total: <span>{get(getCardData, 'orderSummary.price', '')}</span>
        </li>
        <li>
          Promotion Applied: <span></span>
        </li>
      </ul>
      <div className="seperater"></div>
      <h4>Order Total: <span>{get(getCardData, 'orderSummary.total', '')}</span></h4>

      <button className="btn btnprimary-fill" disabled={paymentLoding} onClick={checkout}>Place Order</button>
    </div>
  );
}
