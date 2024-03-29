import React from 'react';
import styles from './Button.module.scss';

const button = (props) => (
    <button disabled={props.disabled} className={[styles.Button, styles[props.type]].join(' ')} onClick={props.clicked}>{props.children}</button>
);

export default button;
