import Image from "next/image";
import Link from "next/link"
import { get } from "lodash";
export default function ServiceCard(props) {
  return (
    <Link href={`/products?id=${get(props, 'data._id', '')}`}>
    <div className="service-card">
      <div className="image-area">
        <Image
          src="/assets/images/spotlight1.jpg"
          alt="handyman1"
          layout="responsive"
          width="100%"
          height="100%"
        />
      </div>
      <div className="details">
        <h5>
          {get(props, 'data.title', '')} | {get(props, 'data.rating', '5')} <span>(110 Reviews)</span>
        </h5>
        <h5 className="name">
          <span>Handyman: </span>Erika Hans
        </h5>
        <h5>
          <span>Price Range: </span> {get(props, 'data.priceRange', '$250 - $450')}
        </h5>
      </div>
      <div className="booking-section">
        <button className="btn btn-primary">Book Service</button>
      </div>
    </div>
    </Link>
  );
}
