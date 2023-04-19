import { Layout, Footer, ShareGig } from "../component";
import { useRouter } from 'next/router';

export default function Category(props) {
  return (
    <Layout setWebSoket={props.setWebSoket}>
      <div className="category">
        <div className="container">
          <ShareGig />
        </div>
        <div className="home-section-padding">
          <Footer ws={props.ws}/>
        </div>
      </div>
    </Layout>
  );
}
