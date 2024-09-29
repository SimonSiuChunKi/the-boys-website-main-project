import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import NavBar from '../components/Navbar/NavBar';
import Footer from '../components/Footer';
import { useParams } from "react-router-dom";

const Lessons = () => {

    const { course_id } = useParams(); // Get the course_id from the route parameter

    const [lessons, setLessons] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
              const response = await fetch(`https://lnenem9b6b.execute-api.ap-southeast-2.amazonaws.com/prod/api/v1/lessons/?course_id=${course_id}`);
            // const response = await fetch(`http://localhost:8000/api/v1/lessons/?course_id=${course_id}`);
            const data = await response.json();
            setLessons(data);
        };
        fetchData();
    }, []);

    return (

        <>
            <div>
                <NavBar />
            </div>

            <div id="lessons" className="bg-gray-100 py-12" style={{ marginTop: '64px' }}>
                <section data-aos="zoom-in-down">
                    <div className="my-4 py-4">
                        <h2 className="my-2 text-center text-3xl text-blue-900 uppercase font-bold">lessons</h2>

                        <div className='flex justify-center'>
                            <div className='w-24 border-b-4 border-blue-900'></div>
                        </div>
                        <h2 className="mt-4 mx-12 text-center text-xl lg:text-2xl font-semibold text-blue-900">We are deeply committed to the growth and success of our clients.</h2>
                    </div>

                    <div className="px-12" data-aos="fade-down" data-aos-delay="600">
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">

                            {lessons.map((lesson, index) => (
                                <div
                                    key={index}
                                    className="bg-white transition-all ease-in-out duration-400 overflow-hidden text-gray-700 hover:bg-gray-500 hover:text-white rounded-lg shadow-2xl p-3 group"
                                >
                                    <div className="m-2 text-justify text-sm">
                                        <img
                                            alt="card img"
                                            className="rounded-t group-hover:scale-[1.15] transition duration-1000 ease-in-out"
                                            src={lesson.ImageURL}
                                        />
                                        <h2 className="font-semibold my-4 text-2xl text-center">{lesson.Lesson}</h2>
                                        <p className="text-md font-medium">{lesson.Description}</p>
                                        <p className="text-md font-medium mt-2">Difficulty: {lesson.Difficulty}</p>
                                    </div>
                                    <Link to={`/lesson/${lesson.ID}`} className="text-white bg-blue-900 hover:bg-blue-800 inline-flex items-center justify-center w-full px-6 py-3 my-4 text-lg shadow-xl rounded-xl">
                                        Start
                                        <svg className="w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                        </svg>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
            <Footer />

        </>

    )
}

export default Lessons;