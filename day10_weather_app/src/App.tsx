import React, { Component } from "react";
import "./App.css";
import Map from "./components/Map";
import MyLocationData from "./components/MyLocationData";
import { Container, Row, Col } from "react-bootstrap";
import { Data } from "./types/type";
import { Welcome } from "./types/weekDay";
import WeekDays from "./components/WeekDays";
import Search from "./components/Search";

const locationApi = process.env.REACT_APP_IP_LOCATION_API || "";
const weatherApiHost = process.env.REACT_APP_RAPIDAPI_WEATHER_HOST;
const weatherApiKey = process.env.REACT_APP_RAPIDAPI_WEATHER_KEY;
const weatherApi = process.env.REACT_APP_RAPIDAPI_WEATHER_API || "";
const weatherApiWeekDays =
  process.env.REACT_APP_RAPIDAPI_WEATHER_API_WEEK_DAYS || "";

const requestHeaders: any = new Headers();
requestHeaders.set("x-rapidapi-host", weatherApiHost);
requestHeaders.set("x-rapidapi-key", weatherApiKey);
requestHeaders.set("useQueryString", true);

interface State {
  lat: number;
  lng: number;
  locationName: string;
  info: Data;
  showWeekDays: boolean;
  weekDays: Welcome;
  showDays: boolean;
  showSearch: boolean;
}

class App extends Component<any, State> {
  state = {
    lat: 0,
    lng: 0,
    locationName: "",
    info: {
      coord: {
        lon: 0,
        lat: 0,
      },
      weather: [
        {
          id: 0,
          main: "",
          description: "",
          icon: "",
        },
      ],
      base: "",
      main: {
        temp: 0,
        feels_like: 0,
        temp_min: 0,
        temp_max: 0,
        pressure: 0,
        humidity: 0,
      },
      visibility: 0,
      wind: {
        speed: 0,
        deg: 0,
      },
      clouds: {
        all: 0,
      },
      dt: 0,
      sys: {
        type: 0,
        id: 0,
        country: "",
        sunrise: 0,
        sunset: 0,
      },
      timezone: 0,
      id: 0,
      name: "",
      cod: 0,
    },
    showWeekDays: false,
    weekDays: {
      list: [
        {
          dt: 0,
          sunrise: 0,
          sunset: 0,
          temp: {
            day: 0,
            min: 0,
            max: 0,
            night: 0,
            eve: 0,
            morn: 0,
          },
          feels_like: {
            day: 0,
            night: 0,
            eve: 0,
            morn: 0,
          },
          pressure: 0,
          humidity: 0,
          weather: [
            {
              id: 0,
              main: "",
              description: "",
              icon: "",
            },
          ],
          speed: 0,
          deg: 0,
          clouds: 0,
          pop: 0,
        },
      ],
    },
    showDays: false,
    showSearch: false,
  };

  componentDidMount = async () => {
    let resp = await fetch(locationApi);
    if (resp.ok) {
      const data = await resp.json();
      this.setState({
        lat: data.latitude,
        lng: data.longitude,
        locationName: data.city,
      });
    }
  };

  componentDidUpdate = async (
    prevProps: any,
    prevState: State
  ): Promise<void> => {
    if (prevState.locationName !== this.state.locationName) {
      let resp = await fetch(weatherApi + this.state.locationName, {
        headers: requestHeaders,
      });
      if (resp.ok) {
        const data = await resp.json();
        this.setState({
          info: data,
          lat: data.coord.lat,
          lng: data.coord.lon,
          showWeekDays: false,
          showSearch: false,
        });
      }
    } else if (
      prevState.lat !== this.state.lat ||
      prevState.lng !== this.state.lng
    ) {
      const resp2 = await fetch(weatherApi + this.state.locationName, {
        headers: requestHeaders,
      });
      if (resp2.ok) {
        const data = await resp2.json();
        this.setState({ info: data, showDays: false, showSearch: false });
      }
    }
  };

  getWeekDays = async (name: string): Promise<void> => {
    let resp = await fetch(weatherApiWeekDays + this.state.locationName, {
      headers: requestHeaders,
    });
    if (resp.ok) {
      const data = await resp.json();
      let weekDays = this.state.weekDays;
      weekDays.list = data.list;
      this.setState({ weekDays, showDays: true });
    }
  };

  setLat = (e: number): any => {
    this.setState({ lat: e });
  };
  setLng = (e: number): any => {
    this.setState({ lng: e });
  };

  searchState = (e: any): void => {
    this.setState({ locationName: e });
  };

  showSearch = () => {
    this.setState({ showSearch: true });
  };

  render() {
    return (
      <div
        className={
          this.state.info.weather[0].description === "few clouds" ||
          this.state.info.weather[0].description === "overcast clouds"
            ? "App few_clouds"
            : this.state.info.weather[0].description === "Clouds"
            ? "App clouds"
            : this.state.info.weather[0].description === "Clear" ||
              this.state.info.weather[0].description === "clear sky"
            ? "App sunnyBG"
            : this.state.info.weather[0].description.includes("rain")
            ? "App rainy"
            : "App"
        }
      >
        <Container>
          <Row>
            {this.state.showSearch ? (
              <Col sm={12} md={12}>
                <Search setSearch={this.searchState} />
              </Col>
            ) : null}
            <Col className='mt-4' sm={12} md={6}>
              <MyLocationData
                info={this.state.info}
                searchState={this.searchState}
                getWeekDays={this.getWeekDays}
                showSearch={this.showSearch}
              />
            </Col>
            <Col
              style={{ borderRadius: "3%", overflow: "hidden" }}
              className='mt-4 p-0'
              sm={12}
              md={6}
            >
              <Map lat={this.state.lat} lng={this.state.lng} />
            </Col>
            <Col style={{ overflowX: "auto" }} sm={12} md={12}>
              <WeekDays show={this.state.showDays} days={this.state.weekDays} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
