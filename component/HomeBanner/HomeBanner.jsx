import Image from "next/image";

import SearchBar from "../SearchBar/SearchBar";

export default function HomeBanner() {
  return (
    <>
    <div className="banner hidemobile">
      <Image
        className="banner-image"
        src="/assets/images/banner.jpeg"
        alt="company logo"
        layout="responsive"
        width={1440}
        height={543}
      />
      <div className="home-search">
        <SearchBar />
      </div>
    </div>
    <div className="banner showmobile">
      <Image
        className="banner-image"
        src="/assets/images/banner-mob.jpg"
        alt="company logo"
        layout="responsive"
        width={360}
        height={230}
      />
      <div className="home-search">
        <SearchBar />
      </div>
    </div>
    </>
  );
}
