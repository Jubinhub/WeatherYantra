import "./LocateUser.css";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "./StateProvider";

function LocateUser() {
  const [, dispatch] = useStateValue();
  const navigate = useNavigate();

  function callGeoLocator() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert("Geolocation is not supported by this browser.");
    }

    function showPosition(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      dispatch({
        type: "ADD_CURR_LOCATION",
        values: { latitude, longitude },
      });
      navigate("./homepage");
    }
  }

  return (
    <>
      <div className="locateUser">
        <div className="locateUser__info">
          <div className="Application__details">
            <h1>WEATHER YANTRA</h1>
            <div className="locateUser__info__clickOperation">
              <p>Detect Your Location</p>
              <img
                src="https://png.pngtree.com/png-vector/20220802/ourmid/pngtree-city-point-map-location-icon-element-png-image_6095802.png"
                alt="map_location"
                onClick={callGeoLocator}
              ></img>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LocateUser;
