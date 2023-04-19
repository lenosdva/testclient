import Image from "next/image";
import Link from "next/link"
import { get } from "lodash";
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect, useCallback } from "react";
export default function ServiceCard(props) {
  const router = useRouter();
  const dispatch = useDispatch();


  const [handymanStatus, setHandymanStatus] = useState("inReview")

  const { handyman, handymanLoading } = useSelector(state => ({    
    handyman: state.handyman.hyndyman,    
    handymanLoading: state.handyman.hyndymanLoading,    
  }));

  useEffect(() => {
    setHandymanStatus(get(handyman, 'status', "inReview"))
  }, [handymanLoading])


  function onPause(e) {
    e.preventDefault();
    const data = {}
    const id = get(props, 'data.id', "")
    if(id != "") {
      if(get(props, 'data.status', "") == 'active') {
        data.status = "paused";
      } else {
        data.status = "active";
      }
        
      data.id = id;
      dispatch({ type: 'UPDATE_GIG', payload: data })
    }
    router.push('/my-services')
    
  }

  function onDelete(e) {
    e.preventDefault();
    const data = {}
    const id = get(props, 'data.id', "")
    if(id != "") {        
      data.id = id;
      dispatch({ type: 'DELETE_GIG', payload: data })
    }
    router.push('/my-services')
    
  }

  function onEdit(e) {
    e.preventDefault();
    const id = get(props, 'data.id', "")
    if(id != "") {

      router.push(
        {
          pathname: '/add-gig',
          query: { id: id }
        }
      )
      
    }   
    
  }


  function onShare(e) {
    e.preventDefault();
    const id = get(props, 'data.id', "")
    if(id != "") {

      router.push(
        {
          pathname: '/share-gig',
          query: { id: id }
        }
      )
      
    }   
    
  }
  
  return (
    
    <div className="gig-card">
      <div className="image-area">
        <img
          src={get(props, 'data.gallery[0].document.url', "")}
          alt="pic"
          layout="responsive"
          width="90%"
          height="90%"
        />
      </div>
      <div className="details">
        <h5 className="mb0">
          {get(props, 'data.title', '')}
        </h5>
        <a onClick={onEdit}>Edit</a>
        {handymanStatus == 'approved' &&
        <a onClick={onPause}>{get(props, 'data.status', "") == 'active' ? 'Pause' : 'Active' }</a>
        }
        <a onClick={onShare}>Share</a>
        <a onClick={onDelete}>Delete</a>
      </div>
      
    </div>

  );
}
