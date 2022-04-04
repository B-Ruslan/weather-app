const API_key = 'e47851098af3179c1a8ee53df6ee4a93';
const url = `https://api.openweathermap.org/data/2.5/forecast/daily?`;

const fetchWeatherData = async (city: string) => {
    const result = await fetch(`${url}q=${city}&cnt=5&appid=${API_key}&units=metric`).then((res) => {
        if (res.ok) {
            return res.json();
        }

        throw new Error("Server error, please update the page!")
    });
    return result;
}

export default fetchWeatherData;
