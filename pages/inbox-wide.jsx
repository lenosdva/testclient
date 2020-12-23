import { Layout, Footer } from "../component";
import { Timeline, Chat } from "../component";

export default function InboxWidePage() {
  return (
    <Layout>
      <div className="inbox-wide-page">
        <div className="container mb-4">
          <div className="d-flex justify-content-between">
            <div className="d-flex">
              <h2 className="mb-0 mr-2">Solar Panel Installation</h2>
              <button className="status-btn">Completed</button>
            </div>
            <div className="d-flex align-items-center">
              <svg
                className="mr-2"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none">
                <path d="M18 18H0V0H8V2H2V16H16V10H18V18Z" fill="black" />
                <path d="M18 8H16V2H10V0H18V8Z" fill="black" />
                <path
                  d="M16.3081 0.27759L5.27734 11.3083L6.69154 12.7225L17.7223 1.69179L16.3081 0.27759Z"
                  fill="black"
                />
              </svg>
              <p className="h5">Download Invoice</p>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <Timeline />
            </div>
            <div className="col-md-8">
              <Chat />
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
