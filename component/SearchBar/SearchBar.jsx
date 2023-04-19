import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import Image from "next/image";
import _, { get } from "lodash"
import PostalCode from "../../constent/postal"
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { useRouter } from 'next/router'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, DropdownButton } from 'reactstrap';
import Select from 'react-select'
import {CodeCityOptions as options} from '../../utils/codes'

export default function SearchBar(props) {
  const router = useRouter()
  const [keyword, setKeyword] = useState('')
  const [filterCode, setFilterCode] = useState([])
  const [code, setCode] = useState('')
  const [id, setId] = useState('')
  const [category, setCategory] = useState('')
  const [link, setLink] = useState('')
  const [showAddress, setAddress] = useState('hide')
  const [showService, setService] = useState('hide')
  const [showMobSearch, setMobSearch] = useState('')
  const [listServices, setListServices] = useState(false)
  const [choosedService, setChoosedService] = useState("What can we assist you with?")

  const toggle = () => setListServices(prevState => !prevState);
  
  const dispatch = useDispatch()
  const { searchData, searchByIdLoading, searchByIdData, mobileSignLoading, mobileSignData } = useSelector(state => ({
    searchData: state.services.searchData,
    searchByIdLoading: state.services.searchByIdLoading,
    searchByIdData: state.services.searchByIdData,
    mobileSignLoading: state.user.mobileSignLoading,
    mobileSignData: state.user.mobileSignData,
  }));

  useEffect(() => {
    const category = get(props, 'category', '')
    setKeyword(category)
  }, [props.category])

  useEffect(() => {
    if (get(searchData, 'error', false)) {
      if (showService !== 'hide') {
        setService('hide')
      }
    } else {
      if (searchData.length) {
        setService('show')
      } else {
        setService('hide')
      }
    }
  }, [searchData])

  useEffect(()=>{
    window.addEventListener('resize', function(){
      var w = window.innerWidth;
      if((w > 768 && showMobSearch === 'show')){
        setMobSearch('')
      }
    });
  },[])

  function onSearch(e) {
    setId('')
    setKeyword(e.target.value)
    dispatch({ type: 'SEARCH_REQUEST', payload: e.target.value })
  }

  function onBlurInput() {
    // setKeyword('')
    // setCode('')
    setTimeout(() => {
      // setMobSearch('')
      dispatch({ type: 'SEARCH_RESET' })
      setAddress('hide')
      setService('hide')
      setFilterCode([])
    }, 200)
  }

  function onSearchService() {
    if (id === '') {
      setChoosedService(<><div className='red-font'>REQUIRED</div></>)
      // NotificationManager.error('Please Pick a Service')
    } else {
      router.push(
        { 
          pathname: '/category', 
          query: 
              { 
                id: id, 
                name: choosedService, 
                code: code.split(',')[0]
              } 
        }
      )
      // window.location.url(link)
      
    }
  }
  function onSelectService(e) {
    setId('')
    setKeyword(e.target.value)
    dispatch({ type: 'REGISTER', payload: e.target.value })
    console.log("mobileSignData", mobileSignData)
  }


  function onSelectSearch(value, id, link) {
    dispatch({ type: 'RESET_SERVICE' })
    setService('hide')
    setKeyword(value)
    setLink(link)
    setId(id)
  }

  const renderSearchResult = () => (
    searchData.length && searchData.map((data, key) => (
      <li key={key} onClick={() => onSelectSearch(get(data, 'name', ''), get(data, '_id', ''), get(data, 'link', ''))}>{get(data, 'name', '')}</li>
    ))
  )

  function onSearchPostalCode(e) {
    setCode(e.target.value)
    const result = _.filter(PostalCode, _.flow(
      _.identity,
      _.values,
      _.join,
      _.toLower,
      _.partialRight(_.includes, e.target.value)
    ));
    setFilterCode([...result])
    if (!result.length) {
      setAddress('show')
    } else {
      if (e.target.value === '') {
        setFilterCode([])
        setAddress('hide')
      } else {
        setAddress('show')
      }
    }
  }

  function onSelctCode(data) {
    setCode(data.code)
    setFilterCode([])
    setAddress('hide')
  }

  const renderPostalCode = () => (
    filterCode.length && filterCode.map((data, key) => (

      key < 4 && <li key={key} onClick={() => onSelctCode(data)}>
        {/* <div className="search-keywords-img">
          <Image
            src="/assets/images/search-img.png"
            alt="search"
            width={50}
            height={50}
          />
        </div> */}
        <div className="search-keywords-txt">
          <h5>{data.code}</h5>
          <h6>{data.city}, Germany</h6>
        </div>
      </li>
    ))
  )

  function services() {
    setListServices(!listServices)
  }
  function setSearchInput(id, name) {
    setId(id);
    setChoosedService(name);
    //router.push(`/category?id=${id}&name=${name}`)
  }




  return (
    <>
      <div className="searchbar d-flex justify-content-between align-items-center">
        <div className="search-area d-flex justify-content-around align-items-center">
          <div className="postal-code">
            <h5 className="">Postal Code</h5>
                                                <Select 
                                                    options={options}
                                                    placeholder="80331,Munich,Germany"
                                                    onChange={(code) => (code != null) ? setCode(code.value) : setCode('')}
                                                    isClearable={true}
                                                    isSearchable={true}
                                                    className="react-select-search"
                                                    classNamePrefix="react-select-search-n"
                                                    
                                                  />
            {/*
            <input type="search" value={code} onChange={onSearchPostalCode} onBlur={onBlurInput} className="input-search" placeholder="Munich, Germany 80331" />
            {filterCode.length ?
              <div className={showAddress === 'hide' ? "searching-keywords search-lg" : "searching-keywords search-lg searching-keywords-show"}>
                  <ul>
                    {renderPostalCode()}
                  </ul>
              </div>
              : <></>
            } */}
            {/* <h5 className="postal-value">Munich, Germany 80331</h5> */}
          </div>
          <div className="vertical-bar mr-2"></div>
          <div className="divi showmobile mt-2 mb-2"></div>
          <div className="service pl-4 ml-4">
            <h5 className="mb-0">Pick a Service</h5>
            {/* <h5 className="service-value">What can we assist you with ?</h5> */}
            {/*<input type="text" onChange={onSearch} onClick={services} value={keyword} onBlur={() => onBlurInput()} className="input-search input-search-lg" placeholder="What can we assist you?" /> */}
                  <div onClick={services} className="togglewrapper-search">
                    <Dropdown isOpen={listServices} toggle={services} autoClose="outside" >
                        <DropdownToggle  tag="span" className="input-search input-search-lg">{choosedService}</DropdownToggle>
                          <DropdownMenu>
                              <ul className="dd-menu-services">
                                <li>                            
                                    <h6 onClick={() => setSearchInput("63ec415e1e567d9347d0b8ab", "Roof Services")}>Roof Services</h6>
                                    <h6 onClick={() => setSearchInput("63ec42321e567d9347d0b8ae", "Cleaning Services")}>Cleaning Services</h6>
                                    <h6 onClick={() => setSearchInput("63ec424c1e567d9347d0b8b1", "Bathroom Installation")}>Bathroom Installation & Repair</h6>
                                    <h6 onClick={() => setSearchInput("63ec42751e567d9347d0b8b4", "Computer Setup")}>Computer Setup & Repair</h6>
                                    <h6 onClick={() => setSearchInput("63ec42a11e567d9347d0b8b7", "Restoration Services")}>Restoration Services</h6>
                                    <h6 onClick={() => setSearchInput("63ec42cf1e567d9347d0b8ba", "Electronic Installation")}>Electronic Installation & Repair</h6>
                                    <h6 onClick={() => setSearchInput("63ec42ee1e567d9347d0b8bd", "Painting Services")}>Painting & Wallpapering Services</h6>
                                    <h6 onClick={() => setSearchInput("63ec43151e567d9347d0b8c0", "Transportation Services")}>Transportation Services</h6>
                                    <h6 onClick={() => setSearchInput("63ec434c1e567d9347d0b8c3", "Garden & Outdoor Services")}>Garden & Outdoor Services</h6>
                                    <h6 onClick={() => setSearchInput("63ec43671e567d9347d0b8c6", "Building Services")}>Building & Renovating Services</h6>
                                    <h6 onClick={() => setSearchInput("63ec43811e567d9347d0b8c9", "Plumbing Services")}>Plumbing Services</h6>
                                    <h6 onClick={() => setSearchInput("63ec439c1e567d9347d0b8cc", "Electrical Services")}>Electrical Services</h6>
                                    <h6 onClick={() => setSearchInput("63ec43b91e567d9347d0b8cf", "Kitchen Installation")}>Kitchen Installation & Repair</h6>
                                    <h6 onClick={() => setSearchInput("63ec43d01e567d9347d0b8d2", "Carpentry Services")}>Carpentry Services</h6>
                                    <h6 onClick={() => setSearchInput("63ec43ec1e567d9347d0b8d5", "Floor & Tile Services")}>Floor & Tile Services</h6>                
                                </li>
                              </ul>
                          </DropdownMenu>                 
                    </Dropdown>
                  </div>
                        
                
              {/*
              <div className={showService === 'hide' ? "searching-keywords search-xl" : "searching-keywords search-xl searching-keywords-show"}>
                {searchData.length ?
                  <ul>
                    {renderSearchResult()}
                  </ul>
                  :
                  <></>
                }
              </div>
              */}
            
          </div>
        </div>
        
        {/* code of mobile */}
        <div className="icon-area">
          <button onClick={onSearchService} className="btn btn-primary">
            <span className="hidemobile iconsearch">
              <Image
                src="/assets/svg/ic-search.svg"
                alt="search"
                width={26}
                height={26}
              />
            </span>
            <span className="showmobile">Search mobile</span>
          </button>
        </div>

        <NotificationContainer />
      </div>
      <div className="icon-area-mob showmobile">
          <button onClick={onSearchService} className="btn">
            <span className="showmobile">Search</span>
          </button>
      </div>

    </>
  );
}
