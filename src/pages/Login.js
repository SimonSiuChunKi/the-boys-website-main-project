import React, { useState } from 'react';
import NavBar from '../components/Navbar/NavBar';
import Footer from '../components/Footer';
import {useDocTitle} from '../components/CustomHook';
import axios from 'axios';
// import emailjs from 'emailjs-com';
import Notiflix from 'notiflix';


const Login = (props) => {
    useDocTitle('Sign-Connect - Login');

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        let formErrors = {};
        if (!username) formErrors.username = 'Username is required';
        if (!password) formErrors.password = 'Password is required';
            return formErrors;
    };

    const clearErrors = () => {
        setErrors({});
    };

    const clearInput = () => {
        setUsername('');
        setPassword('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        const formData = {
            username: username,
            password: password
        };

        clearErrors();

        axios({
            method: 'post',
            url: 'https://gznfhnqwr4.execute-api.ap-southeast-2.amazonaws.com/prod/login',
            data: formData,
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(function (response) {
            if (response && response.data) {
                const { accessToken, idToken, refreshToken } = JSON.parse(response.data.body);
                // Token ahndling
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('idToken', idToken);
                localStorage.setItem('refreshToken', refreshToken);

                Notiflix.Report.success('Success', response.data.message, 'Okay');
                window.location.href = 'https://master.d2acbfc96voj44.amplifyapp.com/';
            }
        })
        .catch(function (error) {
            // Handle errors
            if (error.response && error.response.data) {
                Notiflix.Report.failure('Error', error.response.data.message, 'Okay');
                if (error.response.data.errors) {
                    setErrors(error.response.data.errors);
                }
            } else {
                Notiflix.Report.failure('Error', 'Something went wrong', 'Okay');
            }
        });
    };

    return (
        <>
            <div>
                <NavBar />
            </div>
            <div id='login' className="mt-8 w-full bg-white py-12 lg:py-24" style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
                <div className="my-4" data-aos="zoom-in">
                    <form onSubmit={handleSubmit} id="loginForm">
                        <div className="w-full bg-white p-8 my-4 md:px-12 lg:w-full lg:pl-30 lg:pr-30 mr-auto rounded-2xl shadow-2xl">
                            <div className="flex">
                                <h1 className="font-bold text-center lg:text-left text-blue-900 uppercase text-4xl mx-auto">Login</h1>
                            </div>

                            <div className="grid grid-cols-1 gap-5 mt-5 ">
                                <div>
                                    <label htmlFor="username" className="text-gray-700">Username:</label>
                                    <input
                                        name="username"
                                        className="w-full lg:w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                        type="text"
                                        placeholder="Enter Username*"
                                        value={username}
                                        onChange={(e) => {
                                            setUsername(e.target.value);
                                            clearErrors();
                                        }}
                                    />
                                    {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
                                </div>
                            </div>
                                
                            <div className="grid grid-cols-1 gap-5 mt-5">
                                <div>
                                    <label htmlFor="password" className="text-gray-700">Password:</label>
                                    <input
                                        name="password"
                                        className="w-full lg:w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                        type="password"
                                        placeholder="Enter Password*"
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            clearErrors();
                                        }}
                                    />
                                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                                </div>
                            </div>

                            <div className="my-2 w-full lg:w-2/4 mt-5 mx-auto">
                                <button
                                    type="submit"
                                    id="submitBtn"
                                    className="uppercase text-sm font-bold tracking-wide bg-gray-500 hover:bg-blue-900 text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:shadow-outline"
                                >
                                    Sign In
                                </button>
                            </div>
                        </div>
                    </form>
                    
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Login;