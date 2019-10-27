import React from 'react';
import Aux from '../../hoc/Auxx';

import styles from './Layout.module.scss';

const Layout = (props) => (
    <Aux>
        <div>TOLBAR, SIDE BAR</div>
        <main className={styles.Content}>
            {props.children}
        </main>
    </Aux>
)


export default Layout;