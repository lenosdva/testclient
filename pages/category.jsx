import {
  Layout,
  Footer,
  SearchBar,
  OurServices,
  HandymenPagination,
  ServiceCard,
} from "../component";

export default function Category() {
  return (
    <Layout>
      <div className="category">
        <div className="container">
          <div className="home-section-padding text-center">
            <SearchBar />
          </div>
          <div className="home-section-padding">
            <HandymenPagination />
          </div>
          <div className="home-section-padding">
            <div className="row">
              <div className="col-md-4">
                <ServiceCard />
              </div>
              <div className="col-md-4">
                <ServiceCard />
              </div>
              <div className="col-md-4">
                <ServiceCard />
              </div>
            </div>
          </div>
          <div className="home-section-padding">
            <OurServices />
          </div>
        </div>
        <div className="home-section-padding">
          <Footer />
        </div>
      </div>
    </Layout>
  );
}
