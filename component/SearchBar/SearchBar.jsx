export default function SearchBar() {
  return (
    <div className="searchbar d-flex justify-content-between align-items-center">
      <div className="search-area pl-4 d-flex justify-content-around align-items-center">
        <div className="postal-code mr-2">
          <h5 className="mb-0">Postal Code</h5>
          <h5 className="postal-value">Munich, Germany 80331</h5>
        </div>
        <div className="vertical-bar mr-2"></div>
        <div className="service mr-2">
          <h5 className="mb-0">Pick a Service</h5>
          <h5 className="service-value">What can we assist you with ?</h5>
        </div>
      </div>
      <div className="icon-area">
        <button className="btn btn-primary ">
          <i className="fa fa-search" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  );
}
