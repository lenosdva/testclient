import { useEffect, useState }from "react"
import { Layout, Footer, PaymentCard } from "../component";
import { Elements, CardElement } from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
const { NEXT_PUBLIC_STRIP_KEY } = process.env
const stripePromise = loadStripe(NEXT_PUBLIC_STRIP_KEY);
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'


export default function Category(props) {
  const router = useRouter()
  const [ nextButton, setStatus] = useState(false)
  const { cardLoding, cardData } = useSelector(state => ({
    cardLoding: state.user.cardLoding,
    cardData: state.user.cardData,
  }));

  useEffect(()=>{
    console.log("cardData========>", cardData)
  }, [cardData])
  return (
    <Layout setWebSoket={props.setWebSoket}>
      <div className="category">
        <div className="container">
          <div className="row">
            <div className="col-lg-9 col-md-12">
              <div className="continue-section">
                <h3 className="label">Select A Payment Method</h3>
                <Elements stripe={stripePromise}>
                  <PaymentCard type={'user'} />
                </Elements>
              </div>
            </div>
            <div className="col-lg-3 col-md-12 continue-section-padding">
              <button onClick={()=> router.push('/paymentgateway-order')} className="btn btn-primary-rd mb-4">Continue Your Payment</button>
              <p>You will be able to review your order beforeyou are taken to the  payment gateway.</p>
            </div>
          </div>
        </div>
        <div className="home-section-padding">
          <Footer />
        </div>
      </div>
    </Layout>
  );
}
