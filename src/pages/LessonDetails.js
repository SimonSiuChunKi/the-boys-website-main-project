import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/Navbar/NavBar';
import Footer from '../components/Footer';

const LessonDetails = () => {
  const { lesson_id } = useParams(); // Get the lesson_id from the route parameter
  const [auslanSigns, setAuslanSigns] = useState([]);
  const [selectedSign, setSelectedSign] = useState(null); // Track the currently selected sign

  useEffect(() => {
    // Fetch Auslan signs using the lesson_id from the route params
    const fetchSigns = async () => {
      const response = await fetch(`https://lnenem9b6b.execute-api.ap-southeast-2.amazonaws.com/prod/api/v1/lessons/get_lesson_details?lesson_id=${lesson_id}`);
      // const response = await fetch(`http://localhost:8000/api/v1/lessons/get_lesson_details?lesson_id=${lesson_id}`);
      const data = await response.json();
      setAuslanSigns(data);  // Set the fetched signs to the state
      setSelectedSign(data[0]); // Initially display the first sign
    };
    fetchSigns();
  }, [lesson_id]);

  // Handle the "Test" button click
  const handleTest = () => {
    if (selectedSign) {
      console.log(`Testing sign: ${selectedSign.auslan_sign}`);
      console.log(`Video URL: ${selectedSign.video_url}`);
      // Perform any other action here (e.g., redirect, display a message, etc.)
    }
  };

  if (!auslanSigns.length) {
    return <div>Loading...</div>;  // Show a loading state while the data is being fetched
  }

  return (
    <>
      <div className="flex justify-center items-center mt-8 w-full bg-white py-12 lg:py-24" id='lessonDetails'>
        <div>
          <NavBar />
        </div>

        <div className="container mx-auto py-8">
          <h1 className="text-4xl font-bold mb-4">Auslan Signs</h1>

          {/* Display clickable list of all Auslan signs */}
          <div className="mb-4">
            <h2 className="text-2xl mb-2">Choose a Sign:</h2>
            <ul className="flex space-x-4">
              {auslanSigns.map((sign, index) => (
                <li
                  key={index}
                  className={`cursor-pointer px-4 py-2 border ${selectedSign?.auslan_sign === sign.auslan_sign ? 'bg-blue-500 text-white' : 'bg-gray-200'
                    }`}
                  onClick={() => setSelectedSign(sign)}
                >
                  {sign.auslan_sign}
                </li>
              ))}
            </ul>
          </div>

          {/* Display the selected sign's details */}
          {selectedSign && (
            <div>
              <div className="flex items-center justify-between mb-4">
                {/* Image on the left */}
                <div className="w-1/2">
                  <img src={selectedSign.image_url} alt={selectedSign.auslan_sign} className="w-full mb-4" />
                </div>

                {/* Video on the right */}
                <div className="w-1/2">
                  <video key={selectedSign.auslan_sign} controls className="w-full">
                    <source src={selectedSign.video_url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>

              {/* "Test" button */}
              <div className="flex justify-end">
                <button
                  onClick={handleTest}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Test
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LessonDetails;
