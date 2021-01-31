import { Layout, Footer } from "../component";
import { Inbox, TimelineOrder, Chat } from "../component";

export default function InboxWidePage() {
  return (
    <Layout>
      <div className="inbox-wide-page">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-12">
              <Inbox />
            </div>
            <div className="col-lg-4 col-md-12">
              <TimelineOrder />
            </div>
            <div className="col-lg-4 col-md-12">
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
