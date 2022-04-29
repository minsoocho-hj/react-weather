import './app.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ClipLoader from 'react-spinners/ClipLoader';

import WeatherDisplay from './component/weatherDisplay/weatherDisplay';
import styles from './app.module.css';
import { useState, useEffect } from 'react';
import SelectCityBox from './component/selectCityBox/selectCityBox';

function App() {
	const [weather, setWeather] = useState(null);
	const [selectedCity, setSelectedCity] = useState('');
	let [loading, setLoading] = useState(true);
	let [color, setColor] = useState('#ffffff');

	const cities = ['London', 'New york', 'Seoul', 'Bali'];

	const getCurrentLocation = () => {
		navigator.geolocation.getCurrentPosition((position) => {
			let lat = position.coords.latitude;
			let lon = position.coords.longitude;
			getWeatherByCurrentLocation(lat, lon);
		});
	};

	const getWeatherByCurrentLocation = async (lat, lon) => {
		let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=c97f834cfb3a81ae3e08b5747cf37011&=${process.env.REACT_APP_API_KEY}&units=metric`;
		setLoading(true);
		let response = await fetch(url);
		let data = await response.json();
		setWeather(data);
		setLoading(false);
	};

	const getWeatherByCity = async () => {
		let url = `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${process.env.REACT_APP_API_KEY}&units=metric`;
		setLoading(true);
		let response = await fetch(url);
		let data = await response.json();
		setWeather(data);
		setLoading(false);
	};

	useEffect(() => {
		if (selectedCity === '') {
			getCurrentLocation();
		} else {
			getWeatherByCity();
		}
	}, [selectedCity]);

	return (
		<>
			{loading ? (
				<ClipLoader color='pink' loading={loading} size={100} />
			) : (
				<>
					<div className={styles.weather}>
						<WeatherDisplay weather={weather} />
					</div>
					<SelectCityBox
						setSelectedCity={setSelectedCity}
						cities={cities}
						selectedCity={selectedCity}
					/>
				</>
			)}
		</>
	);
}

export default App;
