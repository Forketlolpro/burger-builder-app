import React from 'react';
import styles from './BuildControl.module.scss'

const buildControl = (props) => (
    <div className={styles.BuildControl}>
        <div className={styles.Label}>{props.lable}</div>
        <button onClick={props.removeIngredient} className={styles.Less} disabled={props.disabled}>Less</button>
        <button onClick={props.addedIngredient} className={styles.More}>More</button>
    </div>
)

export default buildControl;