import Image from "next/image";

export default function PaymentCard() {
  return (
    <div className="payment-successful-wrapper">
      <span className="successful-circle">
        <Image
          src="/assets/svg/ic-successful.svg"
          alt="successful"
          width={94}
          height={82}
        />
      </span>
      <h4>Payment Sucessful</h4>
      <h6>ORDER ID: 12345678910</h6>
      <p>Your order has been placed, you many now contact the handyman through the messages or the my bookings tab</p>
      <button className="btn btnprimary-fill">View Your Booking</button>
      <button className="btn btnprimary-fill">Download Your Invoice</button>
    </div>
  );
}
