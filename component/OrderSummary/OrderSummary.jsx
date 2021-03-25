import { Router } from "../../constent/i18n/i18n";
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { get } from "lodash"

export default function PaymentCard() {
  const router = useRouter()
  const dispatch = useDispatch()
  const { getCardLoading, getCardData } = useSelector(state => ({
    getCardLoading: state.user.getCardLoading,
    getCardData: state.user.getCardData,
    paymentData: state.user.paymentData,
    getCardLoading: state.user.getCardLoading,
  }));

  function checkout(){
    dispatch({type: 'CHECKOUT', payload: {cardId: get(getCardData, `cards.data[${get(getCardData, 'cards.data', []).length - 1}].id`, 'Credit') }})
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

      <button className="btn btnprimary-fill" onClick={checkout}>Place Order</button>
    </div>
  );
}
