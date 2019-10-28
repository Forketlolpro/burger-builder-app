import React from 'react';
import styles from './Modal.module.scss';
import Aux from '../../../hoc/Auxx';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends React.Component {
    shouldComponentUpdate(nextProps, nexState) {
        return nextProps.show !== this.props.show;
    }

    render () {
        return (
            <Aux>
            <Backdrop show={this.props.show} clicked = {this.props.modalClosed}/>
            <div className={this.props.show ? styles.ModalShow: styles.Modal}>
                {this.props.children}
            </div>
            </Aux>
        )
    }
}

export default Modal;