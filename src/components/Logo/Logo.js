import React from 'react';
import burgerLogo from '../../assets/burger-logo.png';
import styles from './Logo.module.scss';

const logo = (props) => {
    return (
    <div className={styles.Logo}>
        <img src={burgerLogo} alt='Burger'/>
    </div>)
}

export default logo;