import React from 'react';
import styles from './weatherDisplay.module.css';

const WeatherDisplay = ({ weather }) => {
	return (
		<div className={styles.box}>
			<h1 className={styles.city}>{weather && weather.name}</h1>
			<h2 className={styles.temp}>{weather && weather.main.temp}°C</h2>
			<div className={styles.weather}>
				<img
					className={styles.icon}
					src={
						weather &&
						`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
					}
					alt='weather icon'
				/>
				<p className={styles.desc}>
					{weather && weather.weather[0].description}
				</p>
			</div>
		</div>
	);
};

export default WeatherDisplay;
