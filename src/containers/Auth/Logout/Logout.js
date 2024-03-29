import React from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/actions';

class Logout extends React.Component {
    componentDidMount () {
        this.props.onLogout()
    }

    render () {
        return (<Redirect to='/'/>)
    }
}

const mapDispatcToProps = (dispatch) => {
    return {
        onLogout: () => dispatch(actions.logout())
    }
}
export default connect(null, mapDispatcToProps)(Logout);