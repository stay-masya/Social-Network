import React from "react";
import {Field, reduxForm} from "redux-form";
import {Input} from "../../Addition/FormsType/FormsType";
import {minLength, required} from "../../Addition/FormsType/Validator";
import {connect} from "react-redux";
import {login} from "../../redux/Auth-reduser";
import {Redirect} from "react-router-dom";
import s from "./Login.module.css"


const minLength3 = minLength(3)
const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={"Email"} name={"login"} component={Input}
                       validate={[required, minLength3]}/>
            </div>
            <div>
                <Field placeholder={"Password"} name={"password"} component={Input}
                       type={"password"}
                       validate={[required, minLength3]}/>
            </div>
            {
                props.error && <div className={s.error}>{props.error}</div>
            }
            <div>
                <Field type={"checkbox"} name={"rememberMe"} component={"input"}/>remember me
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
    )
};

const Login = (props) => {
    const onSubmit = (formData) => {
        return (
            props.login(formData.login,
                formData.password,
                formData.rememberMe)
        )
    };

    if(props.isAuth){
        return <Redirect to={'/profile'}/>
    }
    return (
        <div>
            <h2>Login</h2>
            <ReduxFormContainer onSubmit={onSubmit}/>
        </div>
    );
};

const mapStateToProps = (state)=>{
    return{
        isAuth : state.auth.isAuth
    }
};

export default connect(mapStateToProps, {login}) (Login)
const ReduxFormContainer = reduxForm({form: "login"})(LoginForm)