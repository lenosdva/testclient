import { Layout, Footer, HandymanRegistration } from "../component";
import { useDispatch, useSelector } from 'react-redux'

export default function Category(props) {
  const dispatch = useDispatch()
  const { userLoading, user } = useSelector(state => ({
    userLoading: state.user.userLoading,
    user: state.user.user
  }));
  const { handymanLoading, handyman, updateFreeStatusLoading, uploadDocLoading } = useSelector(state => ({
    handymanLoading: state.handyman.handymanLoading,
    handyman: state.handyman.hyndyman,
    updateFreeStatusLoading: state.handyman.updateFreeStatusLoading,
    uploadDocLoading: state.handyman.uploadDocLoading,
  }));

  return (
    <Layout setWebSoket={props.setWebSoket}>
      {(updateFreeStatusLoading || uploadDocLoading) &&
          <div className="loading-wrapper">
            <div className="loader"></div>
          </div>
      }
      <div className="category">
        <div className="container">
          <div className="home-section-padding">
            <HandymanRegistration user={user} handyman={handyman} />
          </div>
        </div>
        <div className="home-section-padding">
          <Footer ws={props.ws}/>
        </div>
      </div>
    </Layout>
  );
}
