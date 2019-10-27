import React from 'react';
import styles from './Modal.module.scss';
import Aux from '../../../hoc/Aux';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => {
    return (
        <Aux>
            <Backdrop show={props.show} clicked = {props.modalClosed}/>
            <div className={props.show ? styles.ModalShow: styles.Modal}>
                {props.children}
            </div>
        </Aux>
    )
}

export default modal;