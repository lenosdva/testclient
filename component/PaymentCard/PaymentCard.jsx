export default function PaymentCard() {
  return (
    <div className="payment-card p-5 mt-4">
      <div className="d-flex flex-column paymentimg">
        <div className="d-flex align-items-center">
          <input
            type="radio"
            className="card input mr-3"
            name="payment"
            value="Debit/Credit/ATM"
          />
          <h3 className="label">Add Debit/Credit/ATM Card</h3>
        </div>
        <img
          src="https://www.diversifiedpondsupplies.com/images/2020/03/31/payment-methods__1003x131.png"
          className="ml-4"
          height="50px"
          width="450px"
        />
      </div>
      <br />
      <div className="d-flex flex-column">
        <div className="d-flex align-items-center">
          <input
            type="radio"
            className="net-banking input mr-3"
            name="payment"
            value="Net Banking"
          />
          <h3 className="label">Net Banking</h3>
        </div>
        <select name="bank" className="bank ml-4">
          <option value="" selected disabled hidden>
            Choose your Bank
          </option>
          <option value="swiss">Swiss Bank</option>
          <option value="Bank2">Bank2</option>
          <option value="Bank3">Bank3</option>
        </select>
      </div>
      <br />
      <div className="d-flex flex-column">
        <div className="d-flex align-items-center">
          <input
            type="radio"
            className="UPI input mr-3"
            name="payment"
            value="UPI"
          />
          <h3 className="label">UPI</h3>
        </div>
        <input
          type="text"
          className="bank-upi ml-4"
          placeholder="Example: erikahans@okhdfcbank"
        />
      </div>
      <br />
      <div className="d-flex flex-column">
        <div className="d-flex align-items-center">
          <input
            type="radio"
            className="net-banking input mr-3"
            name="payment"
            value="Net Banking"
          />
          <h3 className="label">Net Banking</h3>
        </div>
        <select name="bank" className="bank ml-4">
          <option value="" selected disabled hidden>
            Select Your Card
          </option>
          <option value="swiss">Swiss Bank</option>
          <option value="Bank2">Bank2</option>
          <option value="Bank3">Bank3</option>
        </select>
      </div>
    </div>
  );
}
