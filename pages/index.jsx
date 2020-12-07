import Image from 'next/image';

import { Layout, HomeBanner, HomeServices, HowItWorks, WhyChooseUs, ServicesInSpotlight, Testimonial } from '../component';

export default function Home() {
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
      </div>
    </Layout>
  )
}
