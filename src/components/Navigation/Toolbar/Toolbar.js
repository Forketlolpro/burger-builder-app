import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import styles from './Toolbar.module.scss';

const toolbar = (props) => {
    return (
        <header className={styles.Toolbar}>
            <div className={styles.Logo}>
                <Logo/>
            </div>
            <DrawerToggle clicked = {props.drawerToggleClicked}/>
            <nav className={styles.DesktopOnly}>
                <NavigationItems isAuth={props.isAuth}/>
            </nav>
        </header>
    );
}


export default toolbar;