export interface Forecast {
    clouds: number;
    deg: number;
    dt: number;
    feels_like: object;
    gust: number;
    humidity: number;
    pop: number;
    pressure: number;
    rain: number;
    speed: number;
    sunrise: number;
    sunset: number;
    temp: Temperature;
    weather: Weather[];
}

export interface CityWeather extends Forecast {
    date: string;
}

interface Weather {
    description: string;
    icon: string;
    id: number;
    main: string;
}

interface Temperature {
    day: number;
    eve: number;
    max: number;
    min: number;
    morn: number;
    night: number;
}