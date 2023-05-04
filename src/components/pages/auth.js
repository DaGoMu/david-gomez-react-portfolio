import React, { Component } from 'react';
import Login from '../auth/login';

import loginImg from "../../../static/assets/images/auth/login.jpg";

export default class Auth extends Component {
    constructor(props){
        super(props);

        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
        this.handleUnSuccessfulAuth = this.handleUnSuccessfulAuth.bind(this);
    }

    handleSuccessfulAuth(){
        this.props.handleSuccessfulLogin(); //Obtenemos el metodo desde app.js
        this.props.history.push("/"); //Redirecciona al usuario a la ruta raiz
    }
    handleUnSuccessfulAuth(){
        this.props.handleUnSuccessfulLogin();
    }

    render() {
        return (
            <div className='auth-page-wrapper'>
                <div 
                className='left-column' 
                style={{
                    backgroundImage: `url(${loginImg})`
                }}
                />

                <div className='right-column'>
                    <Login 
                        handleSuccessfulAuth={this.handleSuccessfulAuth}
                        handleUnSuccessfulAuth={this.handleUnSuccessfulAuth}
                    />
                </div>
            </div>
        );
    }
}