import Image from "next/image";
import Link from "next/link";
import { withTranslation } from "../../constent/i18n/i18n"
import { useDispatch, useSelector } from 'react-redux'
import { get } from "lodash";

function ClientDashboard({t}) {
  const dispatch = useDispatch()
  const { userData } = useSelector(state => ({
    userData: state.user.user,
  }));
  return (
    <div className="client-dashboard-wrapper">
      <div className="client-dashboard-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-12">
              
              
            </div>
            <div className="col-lg-4 col-md-12">
              <div className="d-flex align-items-center flex-end cursur-pointer">
                <div>
                  
                  
                </div>
                <div>
                  
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withTranslation('common')(ClientDashboard)
