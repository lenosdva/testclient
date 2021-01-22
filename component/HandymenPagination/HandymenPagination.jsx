import ServiceCard from "../ServiceCard/ServiceCard";

export default function HandymenPagination() {
  return (
    <div className="handyman-pagination">
      <h4>150+ Handymen found in your area</h4>
      <h1>Handymen Near You</h1>
      <div className="row">
        <button className="btn btn-primary d-flex justify-content-center align-items-center">
          <h4 className="add-icon mr-2">+</h4>
          <h4>Cancellation</h4>
        </button>
        <button className="btn in-active d-flex justify-content-center align-items-center">
          <h4 className="add-icon mr-2">+</h4>
          <h4>Budget</h4>
        </button>
        <button className="btn in-active d-flex justify-content-center align-items-center">
          <h4 className="add-icon mr-2">+</h4>
          <h4>Language</h4>
        </button>
      </div>
      <div className="row">
        <div className="col-md-12">
          <h5>Moving Out Services</h5>
        </div>
      </div>
    </div>
  );
}
