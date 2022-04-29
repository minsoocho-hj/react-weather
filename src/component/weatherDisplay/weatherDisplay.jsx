import React from 'react';
import styles from './weatherDisplay.module.css';

const WeatherDisplay = ({ weather }) => {
	return (
		<div className={styles.display}>
			<h1 className={styles.city}>{weather?.name}</h1>
			<h2 className={styles.temperature}>{weather?.main.temp}°C</h2>
			<div className={styles.weathers}>
				<img
					src={`http://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}
					alt=''
					className={styles.icon}
				/>
				<h2 className={styles.weather}>{weather?.weather[0].description}</h2>
			</div>
		</div>
	);
};

export default WeatherDisplay;
