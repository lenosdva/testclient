import { Layout, Footer, HandymanRegistrationComplete } from "../component";

export default function Category() {
  return (
    <Layout>
      <div className="category">
        <div className="container">
          <HandymanRegistrationComplete />
        </div>
        <div className="home-section-padding">
          <Footer />
        </div>
      </div>
    </Layout>
  );
}
