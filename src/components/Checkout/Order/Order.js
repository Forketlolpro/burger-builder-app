import React from 'react';
import styles from './Order.module.scss'

const order = (props) => {
    return (
        <div className={styles.Orders}>
            <p>Ingredients: Salad (1)</p>
            <p>Price: 1</p>
        </div>
    )
}

export default order;