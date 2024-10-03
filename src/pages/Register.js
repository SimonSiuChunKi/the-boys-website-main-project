import React, { useState } from 'react';
import NavBar from '../components/Navbar/NavBar';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import {useDocTitle} from '../components/CustomHook';
import axios from 'axios';
// import emailjs from 'emailjs-com';
import Notiflix from 'notiflix';
import { Link } from 'react-router-dom';


const Register = (props) => {
    useDocTitle('Sign-Connect - Register');
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [securityQuestion, setSecurityQuestion] = useState('');
    const [securityAnswer, setSecurityAnswer] = useState('');
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        let formErrors = {};
        if (!username) formErrors.username = 'Username is required';
        if (!password) formErrors.password = 'Password is required';
        if (!securityQuestion) formErrors.securityQuestion = 'Please select a security question';
        if (!securityAnswer) formErrors.securityAnswer = 'Security answer is required';
        return formErrors;
    };

    const clearErrors = () => {
        setErrors({});
    };

    const clearInput = () => {
        setUsername('');
        setPassword('');
        setSecurityQuestion('');
        setSecurityAnswer('');
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
            password: password,
            "custom:security-question": securityQuestion,  
            "custom:security-answer": securityAnswer
        };

        clearErrors();

        axios({
            method: 'post',
            url: 'https://gznfhnqwr4.execute-api.ap-southeast-2.amazonaws.com/prod/register',
            data: formData,
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(function (response) {
            if (response && response.data) {
                Notiflix.Report.success('Success', response.data.message, 'Okay');
                clearInput();          
                navigate('/login');
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
            <div id='register' className="mt-8 w-full bg-white py-12 lg:py-24" style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
                <div className="container mx-auto my-8 px-4 lg:px-20" data-aos="zoom-in">
                    <form onSubmit={handleSubmit} id="registerForm">
                        <div className="w-full bg-white p-8 my-4 md:px-12 lg:w-full lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl">
                            <div className="flex justify-center">
                                <h1 className="font-bold text-center lg:text-left text-blue-900 uppercase text-4xl">Register</h1>
                            </div>

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
                                <div>
                                    <label htmlFor="username" className="text-gray-700">Username:</label>
                                    <input
                                        name="username"
                                        className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
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

                                <div>
                                    <label htmlFor="password" className="text-gray-700">Password:</label>
                                    <input
                                        name="password"
                                        className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
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

                            <div className="my-4">
                                <label htmlFor="securityQuestion" className="text-gray-700">Please select a security question</label>
                                <select
                                    name="securityQuestion"
                                    id="securityQuestion"
                                    className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                    value={securityQuestion}
                                    onChange={(e) => {
                                        setSecurityQuestion(e.target.value);
                                        clearErrors();
                                    }}
                                >
                                    <option value="">Please select a security question</option>
                                    <option value="1">What's your favourite colour?</option>
                                    <option value="2">What's your favourite fruit?</option>
                                    <option value="3">What's your favourite movie?</option>
                                    <option value="4">What's your favourite animal?</option>
                                </select>
                                {errors.securityQuestion && <p className="text-red-500 text-sm">{errors.securityQuestion}</p>}
                            </div>

                            <div className="my-4">
                                <label htmlFor="securityAnswer" className="text-gray-700">Please enter your security answer:</label>
                                <input
                                    name="securityAnswer"
                                    className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                    type="text"
                                    placeholder="Enter your Answer*"
                                    value={securityAnswer}
                                    onChange={(e) => {
                                        setSecurityAnswer(e.target.value);
                                        clearErrors();
                                    }}
                                />
                                {errors.securityAnswer && <p className="text-red-500 text-sm">{errors.securityAnswer}</p>}
                            </div>

                            <div className="my-2 w-1/2 lg:w-2/4 mt-5 mx-auto">
                                <button
                                    type="submit"
                                    id="submitBtn"
                                    className="uppercase text-sm font-bold tracking-wide bg-gray-500 hover:bg-blue-900 text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:shadow-outline"
                                >
                                    Sign Up
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

export default Register;