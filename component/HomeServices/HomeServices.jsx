import { useEffect } from "react"
import Image from "next/image";
import { withTranslation } from "../../constent/i18n/i18n"
import Services from "../../constent/services"
import Link from "next/link"
import { get } from "lodash"
import { useDispatch, useSelector } from 'react-redux'

const renderService = (searchByIdData) => (
  searchByIdData && searchByIdData.length && (searchByIdData.slice(0, 6)).map((data, key) => (
    <Link key={key} href={`/category?id=${get(data, '_id', '')}&name=${get(data, 'name', '')}`}>
      <li key={key}>
        <img
          src={get(data, 'image.url', "/assets/svg/ic-clean-service.svg")}
          alt={data.name}
          style={{ width: 80, height: 80 }}
        />
        <h4>{get(data, 'name', '')}</h4>
      </li>
    </Link>
  ))
)
const renderServiceMob = (searchByIdData) => (
  searchByIdData && searchByIdData.length && (searchByIdData.slice(0, 3)).map((data, key) => (
    <Link key={key} href={`/category?id=${get(data, '_id', '')}&name=${get(data, 'name', '')}`}>
      <li key={key}>
        <img
          src={get(data, 'image.url', "/assets/svg/ic-clean-service.svg")}
          alt={data.name}
          style={{ width: 80, height: 80 }}
        />
        <h4>{get(data, 'name', '')}</h4>
      </li>
    </Link>
  ))
)
function HomeServices({ t }) {
  const dispatch = useDispatch()
  const { searchByIdData, searchByIdLoading } = useSelector(state => ({
    searchByIdData: state.services.searchByIdData,
    searchByIdLoading: state.services.searchByIdLoading,
  }));

  useEffect(() => {
    dispatch({ type: 'GET_SERVICE' })
  }, [])
  return (
    <div className="home-services-list">
      <div className="row">
        <div className="col-lg-3 col-md-12 service-txt">
          <h5 className="desc">
            WE GIVE <br /> OUR BEST SERVICES <br /> FOR YOU
          </h5>
          <h5 className="mob">
            WE GIVE OUR BEST SERVICES FOR YOU
          </h5>
          <p>
            {t("services.title")}
          </p>
          <Link href='/category-services'><button className="btn btnprimary osn">{t("services.moreButton")}</button></Link>
        </div>
        <div className="col-lg-9 col-md-12">
          <ul className="service-list">
            {renderService(searchByIdData)}
          </ul>
          <ul className="service-list-mob">
            {renderServiceMob(searchByIdData)}
          </ul>
          <Link href='/category-services'><button className="btn btnprimary mob">{t("services.moreButton")}</button></Link>
        </div>
      </div>
    </div>
  );
}

export default withTranslation('common')(HomeServices)