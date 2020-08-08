export const convertKelvinToCelsius = (kelvin: number): number | string => {
  if (kelvin < 0) {
    return "below absolute zero (0 K)";
  } else {
    return kelvin - 273.15;
  }
};

export const convertMS = (milliseconds: number): string => {
  var hour, minute, seconds;
  seconds = Math.floor(milliseconds / 1000);
  minute = Math.floor(seconds / 60);
  seconds = seconds % 60;
  hour = Math.floor(minute / 60);
  minute = minute % 60;
  hour = hour % 24;
  return hour + ":" + minute + ":" + seconds;
};

export const timeConverter = (UNIX_timestamp: number) => {
  let a = new Date(UNIX_timestamp * 1000);
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let year = a.getFullYear();
  let month = months[a.getMonth()];
  let date = a.getDate();

  let time = date + " " + month + " " + year;
  return time;
};
