import { Layout, Footer, HandymanRegistration } from "../component";

export default function Category() {
  return (
    <Layout>
      <div className="category">
        <div className="container">
          <div className="home-section-padding">
            <HandymanRegistration />
          </div>
        </div>
        <div className="home-section-padding">
          <Footer />
        </div>
      </div>
    </Layout>
  );
}
