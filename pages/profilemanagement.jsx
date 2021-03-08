import { Layout, Footer, ProfileManagement } from "../component";
import { useDispatch, useSelector } from 'react-redux'

export default function Category() {

  const dispatch = useDispatch()
  const { userLoading, user } = useSelector(state => ({
    userLoading: state.user.userLoading,
    user: state.user.user
  }));
  return (
    <Layout>
      {userLoading ?
        <div className="loading-wrapper">
          <div className="loader"></div>
        </div>
        :
        <div className="category">
          <div className="container">
            <div className="home-section-padding">
              <ProfileManagement user={user}/>
            </div>
          </div>
          <div className="home-section-padding">
            <Footer />
          </div>
        </div>
      }
    </Layout>
  );
}
