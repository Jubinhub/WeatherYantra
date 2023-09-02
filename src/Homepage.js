import React, { useEffect, useState } from 'react';
import { desh } from './country';
import './Homepage.css'
import { useStateValue } from './StateProvider';
import FavList from './FavList';
import HomeTables from './HomeTables';
import option_icon from './img_loader/menu_2976215.png';
function Homepage() {
    const [{ curr_Location, marked_fav }, dispatch] = useStateValue();
    const { latitude, longitude } = JSON.parse(localStorage.getItem("curr_location"));
    const [weather, setWeather] = useState(null);
    const [name, setname] = useState(null);
    const [temp, setTemp] = useState(null);
    const [country, setCountry] = useState("");
    const [locationInfo, setlocation] = useState();
    const [inputText, setInputText] = useState("");
    const [searchFound, setSearchFound] = useState(true);
    const [dropbtnOpened, setdropbtnOpened] = useState(false);

    const dropbtnClicked = ()=>{
        setdropbtnOpened(!dropbtnOpened);
    }


    const fetchData = async () => {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputText}&appid=8045a96438fd1e40cbd6ce2478c69622`)
        let data = await response.json();
        return data
    }
    const response = async () => {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=8045a96438fd1e40cbd6ce2478c69622`)
        let data = await response.json();
        return data;
    }

    useEffect(() => {
        async function fetchData() {
            const data = await response();
            setlocation(data);
            setWeather(data.weather);
            setname(data.name);
            setTemp(data.main);
            for (let i = 0; i < desh.length; i++) {
                if (desh[i].abbreviation === data.sys.country) {
                    setCountry(desh[i].country);
                    break;
                }
            }
            setSearchFound(true)
        }
        fetchData();
    }, [curr_Location]);


    function searchLocation(e) {
        e.preventDefault();
        async function response() {
            const data = await fetchData();
            if (data.cod !== '404') {
                let lon = data.coord.lon
                let lat = data?.coord.lat
                setSearchFound(true)
                setlocation(data);
                setWeather(data.weather);
                setname(data.name);
                setTemp(data.main);
                for (let i = 0; i < desh.length; i++) {
                    if (desh[i].abbreviation === data.sys.country) {
                        setCountry(desh[i].country);
                        break;
                    }
                }
                if (lon && lat) {
                    dispatch({
                        type: "ADD_CURR_LOCATION",
                        values: { latitude: lat, longitude :lon },
                    });
                }
            } else {
                console.log("entered");
                setSearchFound(false)
            }
        }
        response();
    }

    function addtoFav() {
        dispatch({
            type: "FAV_LOCATION",
            values: locationInfo
        })
    }

    return (
        <>
            {weather !== null &&
                <>
                    <div className='homepage__styling'>

                        {/* Navigation bar */}
                        <div id='navbar'>
                            <h3 className='markFav' onClick={() => addtoFav()}>+</h3>
                            <h3 id='place_name'>{name}, {country}</h3>
                            <div className="dropdown">
                                <p className="dropbtn" onClick={dropbtnClicked}><img src={option_icon}/></p>
                                <div className= {dropbtnOpened ? "show_dropdown_content" : "hide_dropdown"} >
                                    <form className='navbar__inputField' onSubmit={(e) => searchLocation(e)}>
                                        <input placeholder='cities, country, state' value={inputText} onChange={(e) => setInputText(e.target.value)} />
                                        <button>search</button>
                                    </form>
                                    {searchFound === false && <p style={{ color: "red" }}>Search Not Found!!!</p>}
                                    <br></br>
                                    <hr></hr>
                                    {marked_fav.length === 0 ? <p>Press on "+" to Add Locations</p> : <p>Marked Locations</p>}
                                    <div className='favLocationList'>
                                        {marked_fav.map((places) => {
                                            return <FavList key={places.id} place={places} />
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Show temparature */}
                        <div className='show_Temp'>
                            <h1>{Math.round(temp.temp - 273.15)}</h1>
                            <h2>°c</h2>
                        </div>

                        {/* Description about weather */}
                        <div className='show_Sky'>
                            <h3>{weather[0].description}</h3>
                            <img src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`} />
                        </div>
                        {/* Extra info about the current location */}
                        <HomeTables curr__location={locationInfo} />
                    </div>
                </>
            }
        </>
    )
}

export default Homepage