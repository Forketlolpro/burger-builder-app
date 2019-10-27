import React from 'react';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import Aux from '../../hoc/Auxx';

import styles from './Layout.module.scss';

const Layout = (props) => (
    <Aux>
        <Toolbar/>
        <main className={styles.Content}>
            {props.children}
        </main>
    </Aux>
)


export default Layout;