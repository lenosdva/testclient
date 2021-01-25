import { Layout, Footer, ClientDashboard, ClientMyOrders, FAQ } from "../component";

export default function Category() {
  return (
    <Layout>
      <div className="products">
        <div className="about-section-padding">
          <ClientDashboard />
        </div>
        <div className="section-padding">
          <ClientMyOrders />
        </div>
        <div className="about-section-padding">
          <FAQ />
        </div>
        <Footer />
      </div>
    </Layout>
  );
}
