import Image from 'next/image';

import SearchSection from '../SearchSection/SearchSection';

export default function HomeBanner() {
  return (
    <div className="banner">
      <Image
        className="banner-image"
        src="/assets/images/banner.jpeg"
        alt="company logo"
        layout="responsive"
        width={1440}
        height={543}
      />
      {/* <SearchSection /> */}
    </div>
  )
}