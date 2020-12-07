import Image from 'next/image';


export default function WhyChooseUs() {
  return(
    <div className="why-choose-us text-center">
      <h3>
        Why Choose Us?
      </h3>
      <p className="heading-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce bibendum nunc eu urna pulvinar vehicula. Donec molestie quam leo, eget tempus odio mollis in.</p>
      <div className="row mt-5">
        <div className="col-md-4">
          <div className="choose-us-box">
            <Image
              src="/assets/svg/trust.svg"
              alt="trust"
              // layout="responsive"
              width={80}
              height={80}
            />
            <h3 className="mt-2">Trustworthy Handymen</h3>
            <p>Our handymen are not only skillful, but also very trustworthy and commited to a good customer experience.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="choose-us-box">
            <Image
              src="/assets/svg/trust.svg"
              alt="trust"
              // layout="responsive"
              width={80}
              height={80}
            />
            <h3 className="mt-2">Trustworthy Handymen</h3>
            <p>Our handymen are not only skillful, but also very trustworthy and commited to a good customer experience.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="choose-us-box">
            <Image
              src="/assets/svg/trust.svg"
              alt="trust"
              // layout="responsive"
              width={80}
              height={80}
            />
            <h3 className="mt-2">Trustworthy Handymen</h3>
            <p>Our handymen are not only skillful, but also very trustworthy and commited to a good customer experience.</p>
          </div>
        </div>
      </div>
    </div>
  )
}