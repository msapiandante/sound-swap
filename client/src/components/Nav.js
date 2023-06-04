import React from 'react';
import Auth from '../utils/auth';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRecordVinyl } from '@fortawesome/free-solid-svg-icons'

function Nav() {

    function showNav() {
        if (Auth.loggedIn()) {
            return (
                <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                    <li className='nav-item'>
                        <Link to='/profile' className='nav-link'>Profile</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/cart' className='nav-link'>Cart</Link>
                    </li>
                    <li className='nav-item'>
                        <a href='/' onClick={() => Auth.logout()} className='nav-link'>Logout</a>
                    </li>
                </ul>
            );
        } else {
            return (
                <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                    <li className='nav-item'>
                        <Link to='/signup' className='nav-link'>Signup</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/login' className='nav-link'>Login</Link>
                    </li>
                </ul>
            );
        };
    };

    return (
        <header className='container-fluid header-cont'>
            <div className='header-left'>
            <h1>
                <Link to='/' className='navbar-brand'>Sound Swap <span><FontAwesomeIcon icon={faRecordVinyl} /></span></Link>
            </h1>
            </div>
            <div className='header-right'>
            <nav className='nav-cont'>
                {showNav()}
            </nav>
            </div>
        </header>
    );
};

export default Nav;