import React from 'react';
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';

function Nav() {

    function showNav() {
        if (Auth.loggedIn()) {
            return (
                <ul>
                    <li>
                        <Link to='/profile'>Profile</Link>
                    </li>
                    <li>
                        <Link to='/cart'>Cart</Link>
                    </li>
                    <li>
                        <a href='/' onClick={() => Auth.logout()}>Logout</a>
                    </li>
                </ul>
            );
        } else {
            return (
                <ul>
                    <li>
                        <Link to='/signup'>Signup</Link>
                    </li>
                    <li>
                        <Link to='/login'>Login</Link>
                    </li>
                </ul>
            );
        };
    };

    return (
        <header>
            <h1>
                <Link to='/'>Sound Swap</Link>
            </h1>
            <nav>
                {showNav()}
            </nav>
        </header>
    );
};

export default Nav;