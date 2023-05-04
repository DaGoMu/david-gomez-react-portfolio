import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from "react-router"
import { NavLink } from 'react-router-dom';

const NavigationComponent = (props) => { // Transformamos de Class a Functional
    // constructor(){
    //     super();
    // }

    // render(){


        const dynamicLink = (route, linkText) => {
            return (
                <div className='nav-link-wrapper'>
                <NavLink to={route} activeClassName="nav-link-active">{linkText}</NavLink>
                </div>
            )
        }

        const handleSignOut = () => {
            axios.delete("https://api.devcamp.space/logout", 
            { withCredentials:true 
            }).then(response => {
                if (response.status === 200 ){
                    props.history.push("/");
                    props.handleSuccessfulLogout();
                }
                return response.data;
            }).catch(error => {
                console.log("Error Signin Out", error)
            })
        }

        return(
            <div className='nav-wrapper'>
                <div className='left-side'>
                    <div className='nav-link-wrapper'>
                        {/* Si se desea sobreescrivir la clase activa: 
                        activeClassName="nav-link-active */}
                        <NavLink exact to="/" activeClassName="nav-link-active" >Home</NavLink>
                    </div>
                    <div className='nav-link-wrapper'>
                    <NavLink to="/about-me" activeClassName="nav-link-active" >About</NavLink>
                    </div>
                    <div className='nav-link-wrapper'>
                    <NavLink to="/contact" activeClassName="nav-link-active">Contact</NavLink>
                    </div>

                    <div className='nav-link-wrapper'>
                    <NavLink to="/blog" activeClassName="nav-link-active">Blog</NavLink>
                    </div>

                    {props.loggedInStatus === "LOGGED_IN" ? (dynamicLink("/portfolio-manager", "Portfolio Manager")) : null}

                    

                    {/* For Admin */}
                    {/* {false ? <button>Add Blog</button> : null }  */}
                </div>
                <div>
                    DAVID GÓMEZ

                    {props.loggedInStatus === "LOGGED_IN" ? <a onClick={handleSignOut}>Sign Out</a> : null}
                </div>
            </div>
        )
    };
// }

export default withRouter(NavigationComponent); // Es un Higher Order Component