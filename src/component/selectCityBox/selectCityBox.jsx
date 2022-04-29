import React from 'react';

import styles from './selectCityBox.module.css';

const SelectCityBox = ({ cities, setSelectedCity }) => {
	return (
		<div className={styles.box}>
			<button className={styles.btn} onClick={() => setSelectedCity('')}>
				Current Location
			</button>

			{cities.map((city, index) => (
				<button
					key={index}
					className={styles.btn}
					onClick={() => setSelectedCity(city)}
				>
					{city}
				</button>
			))}
		</div>
	);
};

export default SelectCityBox;
