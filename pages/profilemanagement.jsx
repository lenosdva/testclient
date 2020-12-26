import { Layout, Footer, ProfileManagement } from "../component";

export default function Category() {
  return (
    <Layout>
      <div className="category">
        <div className="container">
          <div className="home-section-padding">
            <ProfileManagement />
          </div>
        </div>
        <div className="home-section-padding">
          <Footer />
        </div>
      </div>
    </Layout>
  );
}
