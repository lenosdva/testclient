import { Layout, Footer, SearchBar, ProfileGigsWithReview } from "../component";

export default function Category() {
  return (
    <Layout>
      <div className="products">
        <div className="container">
          <div className="home-section-padding">
            <SearchBar />
          </div>
          <div className="home-section-padding">
            <ProfileGigsWithReview />
          </div>
        </div>
        <div className="home-section-padding">
          <Footer />
        </div>
      </div>
    </Layout>
  );
}
