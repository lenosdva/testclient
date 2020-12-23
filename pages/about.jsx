import { Layout, Footer, AboutUsAndContact } from "../component";

export default function Category() {
  return (
    <Layout>
      <div className="products">
        <div className="about-section-padding">
          <AboutUsAndContact />
        </div>
        <Footer />
      </div>
    </Layout>
  );
}
