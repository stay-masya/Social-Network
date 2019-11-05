import React from "react";
import {Field, reduxForm} from "redux-form";
import {Input} from "../../Addition/FormsType/FormsType";
import {minLength, required} from "../../Addition/FormsType/Validator";
import {connect} from "react-redux";
import {login} from "../../redux/Auth-reduser";
import {Redirect} from "react-router-dom";
import s from "./Login.module.css"

/*
Для входа использовать след данные:
Email:free@samuraijs.com
Password:free
*/

const minLength3 = minLength(3)
const LoginForm = (props) => {
    return (
        <div className={s.content}>
            <div className={s.title}>Sing In</div>
            <form onSubmit={props.handleSubmit} className={s.form}>


                <div className={s.label}>
                    Email:
                </div>
                <Field placeholder={"Email"} name={"login"} component={Input}
                       validate={[required, minLength3]} className={s.field}/>


                <div className={s.label}>
                    Password:
                </div>
                <Field placeholder={"Password"} name={"password"} component={Input}
                       type={"password"} validate={[required, minLength3]} className={s.field}/>

                {props.error && <div className={s.error}>{props.error}</div>}
                <div className={s.control}>
                    <div>
                        <Field type={"checkbox"} name={"rememberMe"} component={"input"}/>Remember me
                    </div>
                    <div>
                        <button>Sing In</button>
                    </div>
                </div>
            </form>
        </div>
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
    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }
    return (
        <div>
            <h2 className={s.breadcrumbs}>Войти на сайт</h2>
            <ReduxFormContainer onSubmit={onSubmit}/>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
};

export default connect(mapStateToProps, {login})(Login)
const ReduxFormContainer = reduxForm({form: "login"})(LoginForm)