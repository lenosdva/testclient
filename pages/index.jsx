import { useEffect } from 'react';
import {
  Layout,
  HomeBanner,
  HomeServices,
  HowItWorks,
  WhyChooseUs,
  ServicesInSpotlight,
  Testimonial,
  AboutUs,
  FAQ,
  Footer,
} from "../component";
import { useDispatch, useSelector } from 'react-redux'

export default function Home() {
  const dispatch = useDispatch()
  const { isLoading, userData } = useSelector(state => ({
    isLoading: state.user.isLoading,
    userData: state.user.data
  }));
  // useEffect(()=>{
  //   dispatch({ type: 'GET_USER',  payload: {}})
  // }, [])
  // console.log("userData======>", userData)
  return (
    <Layout>
      <div className="home">
        <div className="container-fluid">
          <HomeBanner />
        </div>
        <div className="container">
          <div className="home-section-padding">
            <HomeServices />
          </div>
          <div className="home-section-padding">
            <HowItWorks />
          </div>
          <div className="home-section-padding">
            <WhyChooseUs />
          </div>
          <div className="home-section-padding">
            <ServicesInSpotlight />
          </div>
          <div className="home-section-padding">
            <Testimonial />
          </div>
        </div>
        <div className="home-section-padding">
          <AboutUs />
        </div>
        <div className="home-section-padding">
          <FAQ />
        </div>
        <div className="home-section-padding">
          <Footer />
        </div>
      </div>
    </Layout>
  );
}
