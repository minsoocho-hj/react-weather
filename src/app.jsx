import './app.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ClipLoader from 'react-spinners/ClipLoader';

import WeatherDisplay from './component/weatherDisplay/weatherDisplay';
import styles from './app.module.css';
import { useState, useEffect } from 'react';
import SelectCityBox from './component/selectCityBox/selectCityBox';

function App() {
	const [weather, setWeather] = useState(null);

	const getLocation = async () => {
		navigator.geolocation.getCurrentPosition((position) => {
			let lat = position.coords.latitude;
			let lon = position.coords.longitude;
			getWeatherByCurrentLocation(lat, lon);
		});
	};

	const getWeatherByCurrentLocation = async (lat, lon) => {
		let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}&units=metric`;

		await fetch(url)
			.then((res) => res.json())
			.then(
				(data) => {
					setWeather(data);
				},
				// Note: it's important to handle errors here
				// instead of a catch() block so that we don't swallow
				// exceptions from actual bugs in components.
				(error) => {
					console.log('error ' + error);
				}
			);
	};

	useEffect(() => {
		getLocation();
	}, []);

	return (
		<>
			<div className='container'>
				<div className='row'>
					<div className='col-6 col-md-8 col-sm-10'>
						<WeatherDisplay weather={weather} />
					</div>
				</div>
			</div>
			{/* <SelectCityBox /> */}
		</>
	);
}

export default App;
