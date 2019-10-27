import React from 'react';
import styles from './Toolbar.module.scss';

const toolbar = (props) => {
    return (
        <header className={styles.Toolbar}>
            <div>MENU</div>
            <div>LOGO</div>
            <nav>navigaton</nav>
        </header>
    );
}


export default toolbar;