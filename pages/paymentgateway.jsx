import { Layout, Footer, PaymentCard } from "../component";

export default function Category() {
  return (
    <Layout>
      <div className="category">
        <div className="container">
        <div className="row">
          <div className="col-lg-9 col-md-12">
            <div className="continue-section">  
              <h3 className="label">Select A Payment Method</h3>
              <PaymentCard />
            </div>
          </div>
          <div className="col-lg-3 col-md-12 continue-section-padding">
            <button className="btn btn-primary-rd mb-4">Continue Your Payment</button>
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