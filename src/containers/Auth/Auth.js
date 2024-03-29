import React from 'react';
import {connect} from 'react-redux';
import  Input from '../../components/UI/Input/Input';
import  Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/actions';
import { Redirect } from 'react-router-dom';
import styles from './Auth.module.scss'

class Auth extends React.Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail' 
                },
                validationKey: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                value: '',
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password' 
                },
                validationKey: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                value: '',
                touched: false
            }
        },
        isSignUp: true
    }

    componentDidMount() {
        if (!this.props.buildingBurger && this.props.authRedirectPath !=='/') {
            this.props.onSetAuthRedirectPath()
        }
    }

    checkValidity(value, rules) {
        let isValid  = true;
        if (rules.required) {
            isValid =  value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                isSignUp: !prevState.isSignUp
            }
        })
    }

    inputChangeHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validationKey),
                touched: true
            }
        };
        this.setState({controls: updatedControls})
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp)
    }

    render() {
        let formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        };

        let form = formElementsArray.map(formElement => (
            <Input 
                key={formElement.id} 
                elementType={formElement.config.elementType} 
                elementConfig={formElement.config.elementConfig} 
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validationKey}
                touched = {formElement.config.touched}
                changed={(event) => this.inputChangeHandler(event, formElement.id)}
                />
        ))

        if (this.props.loading) {
            form = <Spinner/>
        }

        let errorMessage = null;

        if (this.props.error) {
            errorMessage = (<p>{this.props.error.message}</p>)
        }

        if (this.props.isAuth) {
            return <Redirect to={this.props.authRedirectPath}/>
        }

        return (
            <div className={styles.Auth}>
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button type ="Success">Submit</Button>
                </form>
            <Button clicked={this.switchAuthModeHandler} type ="Danger">SWITCH TO {this.state.isSignUp ? 'SIGNIN' : 'SIGNUP'}</Button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token,
        buildingBurger: state.burger.building,
        authRedirectPath :state.auth.authRedirectPath
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath:  () => dispatch(actions.setAuthRedirectPath('/'))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);