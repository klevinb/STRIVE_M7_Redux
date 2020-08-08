import React, { Component } from "react";
import { Col, Card } from "react-bootstrap";
import { Welcome } from "../types/weekDay";
import { IoMdSunny } from "react-icons/io";
import { WiDayCloudyWindy } from "react-icons/wi";
import { convertKelvinToCelsius, timeConverter } from "../utilities";

interface Props {
  show: boolean;
  days: Welcome;
}

class WeekDays extends Component<Props, any> {
  render() {
    return (
      <>
        {this.props.show ? (
          <div className='weekDays'>
            {this.props.days.list.map((day, key) => (
              <Col key={key}>
                <Card style={{ width: "15rem" }}>
                  <Card.Body>
                    <Card.Title className='d-flex justify-content-between mb-2 text-muted'>
                      {day.weather[0].description === "clear sky" ? (
                        <>
                          <IoMdSunny className='sunny' />
                          {day.weather[0].description}
                        </>
                      ) : (
                        <>
                          <WiDayCloudyWindy className='cloudy' />
                          {day.weather[0].description}
                        </>
                      )}
                    </Card.Title>
                    <p>{timeConverter(day.dt)}</p>
                    <strong>Temperature</strong>
                    <div
                      className='d-flex justify-content-between'
                      style={{ fontSize: "12px" }}
                    >
                      <div>
                        <ul>
                          <li></li>
                          <li>
                            Day :{" "}
                            {convertKelvinToCelsius(day.temp.day)
                              .toString()
                              .slice(0, 4)}
                            <span> &#8451;</span>
                          </li>
                          <li>
                            Max :{" "}
                            {convertKelvinToCelsius(day.temp.max)
                              .toString()
                              .slice(0, 4)}
                            <span> &#8451;</span>
                          </li>
                          <li>
                            Min :{" "}
                            {convertKelvinToCelsius(day.temp.min)
                              .toString()
                              .slice(0, 4)}
                            <span> &#8451;</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <ul>
                          <li>
                            Night :{" "}
                            {convertKelvinToCelsius(day.temp.night)
                              .toString()
                              .slice(0, 4)}
                            <span> &#8451;</span>
                          </li>
                          <li>
                            Evening :{" "}
                            {convertKelvinToCelsius(day.temp.eve)
                              .toString()
                              .slice(0, 4)}
                            <span> &#8451;</span>
                          </li>
                          <li>
                            Morning :{" "}
                            {convertKelvinToCelsius(day.temp.morn)
                              .toString()
                              .slice(0, 4)}
                            <span> &#8451;</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <p>Wind speed : {day.speed}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </div>
        ) : null}
      </>
    );
  }
}

export default WeekDays;
