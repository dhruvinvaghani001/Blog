import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/authSlice';
import authservice from '../../appwrite/auth';
import { useNavigate } from 'react-router-dom';

const LogoutButton = (props) => {
    const { className } = props;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = () => {
        authservice.logout().then(() => {
            dispatch(logout())
            navigate("/login");
        });
    }

    return (
        <>
            <button className={`${className}`} onClick={logoutHandler}>Logout</button>
        </>
    )
}

export default LogoutButton