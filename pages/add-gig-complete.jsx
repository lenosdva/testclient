import { Layout, Footer, AddGigComplete } from "../component";
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux'

export default function Category(props) {
  const { addGigLoading, updateGigLoading } = useSelector(state => ({
    addGigLoading: state.handyman.addGigLoading,
    updateGigLoading: state.handyman.updateGigLoading
  }));
  return (
    <Layout setWebSoket={props.setWebSoket}>
    {(addGigLoading || updateGigLoading) &&
        <div className="loading-wrapper">
          <div className="loader"></div>
        </div>
    }
      <div className="category">
        <div className="container">
          <AddGigComplete />
        </div>
        <div className="home-section-padding">
          <Footer ws={props.ws}/>
        </div>
      </div>
    </Layout>
  );
}
