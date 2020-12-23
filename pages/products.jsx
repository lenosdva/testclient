import { Layout, Footer, SearchBar, PackingService } from "../component";

export default function Category() {
  return (
    <Layout>
      <div className="products">
        <div className="container">
          <div className="home-section-padding text-center">
            <SearchBar />
          </div>
          <div className="home-section-padding">
            <PackingService />
          </div>
        </div>
        <div className="home-section-padding">
          <Footer />
        </div>
      </div>
    </Layout>
  );
}
