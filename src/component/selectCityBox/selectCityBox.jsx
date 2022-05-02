import React from 'react';
import styles from './selectCityBox.module.css';

const SelectCityBox = ({ city, setSelectedCity }) => (
	<button className={styles.btn} onClick={() => setSelectedCity(city)}>
		{city}
	</button>
);

export default SelectCityBox;
