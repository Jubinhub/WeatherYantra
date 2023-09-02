import React from 'react'
function HomeTables({curr__location}) {
  return (
      <div className='row-tables'>
        <div className='inner_row_tables'>
          <div className='humidity__Info'>
              <h3>Temperatures</h3>
              <div className='humidity__Info__percentage'>
                  <br></br>
                  <hr></hr>
                  <h3>Feels like {(curr__location.main.feels_like - 273.15).toFixed(2)}°c</h3>
                  <h3>Min Temp {(curr__location.main.temp_min - 273.15).toFixed(2)}°c</h3>
                  <h3>Max Temperature {(curr__location.main.temp_max - 273.15).toFixed(2)}°c</h3>
              </div>
          </div>
          <div className='humidity__Info'>
              <h3>Pressure/Humidity</h3>
              <div className='humidity__Info__percentage'>
                  <br></br>
                  <hr></hr>
                  <h3>Pressure {curr__location.main.pressure} hPa</h3>
                  <h3>Humidity {curr__location.main.humidity}%</h3>
                  <h3>Wind Speed {curr__location.wind.deg } meter/sec</h3>
                  <h3>Wind direction {curr__location.wind.deg}°</h3>
              </div>
          </div>
          <div className='humidity__Info'>
              <h3>Cordinates</h3>
              <div className = 'humidity__Info__percentage'>
                  <br></br>
                  <hr></hr>
                  <h3>Longitude {curr__location.coord.lon}</h3>
                  <h3>Latitude {curr__location.coord.lat}</h3>
              </div>
          </div>
          <div className='humidity__Info'>
              <h3>Sun Rise/ Set</h3>
              <div className = 'humidity__Info__percentage'>
                  <br></br>
                  <hr></hr>
                  <h3>Sun Rise {new Date(curr__location.sys.sunrise*1000).toLocaleTimeString()} </h3>
                  <h3>Sun Set {new Date(curr__location.sys.sunset * 1000).toLocaleTimeString()}</h3>
              </div>
          </div>
        </div>
      </div>
  )
}

export default HomeTables