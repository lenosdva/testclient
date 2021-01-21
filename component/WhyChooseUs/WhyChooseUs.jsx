import Image from "next/image";

export default function WhyChooseUs() {
  return (
        
    <div className="why-choose-us">
      <h2>Why Choose Us?</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce bibendum
        nunc eu urna pulvinar vehicula. Donec molestie quam leo, eget tempus
        odio mollis in.
      </p>
      <div className="row">
        <div className="col-md-12">
          <ul className="choose-list">
            <li>
              <Image
                src="/assets/svg/choose-trust.svg"
                alt="trust"
                width={80}
                height={80}
              />
              <h3>Trustworthy Handymen</h3>
              <p>Our handymen are not only skillful, but also very trustworthy and commited to a good 
              customer experience.
              </p>
            </li>
            <li>
              <Image
                src="/assets/svg/choose-customer.svg"
                alt="customer"
                width={80}
                height={80}
              />
              <h3>Customer First Business Model</h3>
              <p>We value our customers and ensure that they have a good experience with our premium 
              handymen services!
              </p>
            </li>
            <li>
              <Image
                src="/assets/svg/choose-quick.svg"
                alt="quick"
                width={80}
                height={80}
              />
              <h3>Quick Turnarounds</h3>
              <p>Get quick turnaround with regards to quotations, sharing requirements and getting your work done.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
