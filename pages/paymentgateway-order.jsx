import { Layout, Footer, ReviewYourOrder, OrderSummary } from "../component";

export default function Category() {
  return (
    <Layout>
      <div className="revieworder">
        <div className="container">
          <div className="row">
            <div className="col-lg-9 col-md-12">
                <ReviewYourOrder />
            </div>
            <div className="col-lg-3 col-md-12">
              <OrderSummary />
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
