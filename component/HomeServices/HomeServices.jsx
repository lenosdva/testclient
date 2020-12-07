import Image from 'next/image';

export default function HomeServices() {
  return(
    <div className="home-services-list">
      <div className="row">
        <div className="col-md-3">
          <h4 className="ml-2 mb-5">WE GIVE OUR BEST SERVICES FOR YOU</h4>
          <p className="mb-5">Meet your service experts. Regardless of the size of your home, forget about any worries that come with maintaining it.</p>
          <button className="view-more-service">View More Services</button>
        </div>
        <div className="col-md-9">
          <div className="row">
            <div className="col-md-4 text-center">
              <div className="serivce-box">
                <Image
                  src="/assets/svg/clean-service.svg"
                  alt="clean-service"
                  // layout="responsive"
                  width={80}
                  height={80}
                />
                <p>Cleaning Services</p>
              </div>
            </div>
            <div className="col-md-4 text-center">
              <div className="serivce-box">
                <Image
                  src="/assets/svg/clean-service.svg"
                  alt="clean-service"
                  // layout="responsive"
                  width={80}
                  height={80}
                />
                <p>Cleaning Services</p>
              </div>
            </div>
            <div className="col-md-4 text-center">
              <div className="serivce-box">
                <Image
                  src="/assets/svg/clean-service.svg"
                  alt="clean-service"
                  // layout="responsive"
                  width={80}
                  height={80}
                />
                <p>Cleaning Services</p>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-4 text-center">
              <div className="serivce-box">
                <Image
                  src="/assets/svg/clean-service.svg"
                  alt="clean-service"
                  // layout="responsive"
                  width={80}
                  height={80}
                />
                <p>Cleaning Services</p>
              </div>
            </div>
            <div className="col-md-4 text-center">
              <div className="serivce-box">
                <Image
                  src="/assets/svg/clean-service.svg"
                  alt="clean-service"
                  // layout="responsive"
                  width={80}
                  height={80}
                />
                <p>Cleaning Services</p>
              </div>
            </div>
            <div className="col-md-4 text-center">
              <div className="serivce-box">
                <Image
                  src="/assets/svg/clean-service.svg"
                  alt="clean-service"
                  // layout="responsive"
                  width={80}
                  height={80}
                />
                <p>Cleaning Services</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}