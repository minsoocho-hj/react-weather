import './app.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ClipLoader from 'react-spinners/ClipLoader';

import WeatherDisplay from './component/weatherDisplay/weatherDisplay';
import styles from './app.module.css';
import { useState, useEffect } from 'react';
import SelectCityBox from './component/selectCityBox/selectCityBox';

function App() {
	const [weather, setWeather] = useState(null);
	const [selectedCity, setSelectedCity] = useState('Current Location');
	let [loading, setLoading] = useState(true);
	const [apiError, setAPIError] = useState('');
	let [color, setColor] = useState('#ffffff');

	const cities = ['Current Location', 'London', 'New York', 'Seoul', 'Bali'];

	const getLocation = async () => {
		navigator.geolocation.getCurrentPosition((position) => {
			let lat = position.coords.latitude;
			let lon = position.coords.longitude;
			getWeatherByCurrentLocation(lat, lon);
		});
	};

	const getWeatherByCurrentLocation = async (lat, lon) => {
		setLoading(true);
		let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}&units=metric`;
		await fetch(url)
			.then((res) => res.json())
			.then(
				(data) => {
					setWeather(data);
				},
				(error) => {
					console.log(error);
					setAPIError(error);
					setLoading(false);
				}
			);
		setLoading(false);
	};

	const getWeatherByCity = async () => {
		setLoading(true);
		let url = `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${process.env.REACT_APP_API_KEY}&units=metric`;
		await fetch(url)
			.then((res) => res.json())
			.then(
				(data) => {
					setWeather(data);
				},
				(error) => {
					console.log('error ' + error);
					setAPIError(error);
					setLoading(false);
				}
			);
		setLoading(false);
	};

	useEffect(() => {
		if (selectedCity === 'Current Location') {
			getLocation();
		} else {
			getWeatherByCity();
		}
	}, [selectedCity]);

	return (
		<div className={styles.display}>
			{loading ? (
				<ClipLoader color='pink' loading={loading} size={150} />
			) : !apiError ? (
				<>
					<WeatherDisplay weather={weather} />
					<div className={styles.selectBox}>
						{cities.map((city, index) => (
							<SelectCityBox
								key={index}
								city={city}
								setSelectedCity={setSelectedCity}
							/>
						))}
					</div>
				</>
			) : (
				apiError
			)}
		</div>
	);
}

export default App;
