export default function PaymentCard() {
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
          Total: <span></span>
        </li>
        <li>
          Promotion Applied: <span></span>
        </li>
      </ul>
      <div className="seperater"></div>
      <h4>Order Total: <span></span></h4>

      <button className="btn btnprimary-fill">Place Order</button>
    </div>
  );
}
