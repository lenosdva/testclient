import { Layout, Footer, PaymentSuccessful } from "../component";

export default function Category() {
  return (
    <Layout>
      <div className="revieworder">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <PaymentSuccessful />
            </div>
          </div>
        </div>
      </div>
        <div className="home-section-padding">
          <Footer />
        </div>
      
    </Layout>
  );
}
