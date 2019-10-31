import React from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxx';

const withArrorHandler = (WrappContainer, axios) => {
    return class extends React.Component {

        constructor (props) {
            super(props);
            this.state = {
                error: false
            }

            this.reqInterceptors = axios.interceptors.request.use((req)=> {
                this.setState({error: null});
                return req;
            })

            this.resInterceptors =axios.interceptors.response.use(res => res, (error)=> {
                this.setState({error: error.toString()});
            })
        }

        componentWillUnmount () {
            axios.interceptors.request.eject(this.reqInterceptors);
            axios.interceptors.response.eject(this.resInterceptors);
        }

        errorConfirmedHandler = () => {
             this.setState({error: null})
        }

        render () {        
            return (
                <Aux>
                    <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error : null}
                    </Modal>
                    <WrappContainer {...this.props}/>
                </Aux>
            )
        };
    }
}

export default withArrorHandler;