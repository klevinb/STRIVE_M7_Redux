import React from "react";
import { Spinner, Button } from "react-bootstrap";
import { Data } from "../types/type";
import { IoMdSunny } from "react-icons/io";
import { WiDayCloudyWindy } from "react-icons/wi";
import { FaSearchLocation } from "react-icons/fa";
import { convertKelvinToCelsius, convertMS } from "../utilities";

interface Props {
  info: Data;
  searchState: any;
  getWeekDays: any;
  showSearch: any;
}

function MyLocation({ info, getWeekDays, showSearch }: Props) {
  return (
    <>
      {info.name && info.name.length > 0 ? (
        <div className='weatherInfo'>
          <div className='d-flex justify-content-between titles'>
            <span>{info.name}</span>
            <FaSearchLocation onClick={() => showSearch()} />
          </div>

          <p>Country : {info.sys.country}</p>
          <p>Sunrise : {convertMS(info.sys.sunrise)}</p>
          <p>Sunset : {convertMS(info.sys.sunset)}</p>
          <div className='weather'>
            <div className='d-flex flex-column'>
              Weather today :{" "}
              {info.weather[0].description === "clear sky" ? (
                <>
                  <span>{info.weather[0].description}</span>
                  <IoMdSunny className='sunny' />
                </>
              ) : (
                <>
                  <span>{info.weather[0].description}</span>
                  <WiDayCloudyWindy className='cloudy' />
                </>
              )}
            </div>
            <ul>
              <li>
                Temp :{" "}
                {convertKelvinToCelsius(info.main.temp).toString().slice(0, 4)}
                <span> &#8451;</span>
              </li>
              <li>
                Temp Max :{" "}
                {convertKelvinToCelsius(info.main.temp_max)
                  .toString()
                  .slice(0, 4)}
                <span> &#8451;</span>
              </li>
              <li>
                Temp Min :{" "}
                {convertKelvinToCelsius(info.main.temp_min)
                  .toString()
                  .slice(0, 4)}
                <span> &#8451;</span>
              </li>
            </ul>
          </div>
          <div className='d-flex justify-content-between'>
            <p>Wind speed : {info.wind.speed}</p>
            <Button id='weekButton' onClick={() => getWeekDays(info.name)}>
              Check Week Days
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <Spinner animation='border' variant='warning' />
        </div>
      )}
    </>
  );
}

export default MyLocation;
