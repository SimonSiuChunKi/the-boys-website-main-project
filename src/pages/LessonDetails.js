import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '../components/Navbar/NavBar';
import Footer from '../components/Footer';

const LessonDetails = () => {
  const { lesson_id } = useParams(); // Get the lesson_id from the route parameter
  const [auslanSigns, setAuslanSigns] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch Auslan signs using the lesson_id from the route params
    const fetchSigns = async () => {
      const response = await fetch(`https://lnenem9b6b.execute-api.ap-southeast-2.amazonaws.com/prod/api/v1/lessons/get_lesson_details?lesson_id=${lesson_id}`); // Replace with your actual API
      const data = await response.json();
      setAuslanSigns(data);  // Set the fetched signs to the state
    };
    fetchSigns();
  }, [lesson_id]);

  const handleNext = (currentIndex) => {
    const nextSign = auslanSigns[(currentIndex + 1) % auslanSigns.length];
    navigate(`/lesson/${lesson_id}/auslan/${nextSign.auslan_sign}`);
  };

  if (!auslanSigns.length) {
    return <div>Loading...</div>;  // Show a loading state while the data is being fetched
  }

  return (

    <>
      <div className="flex justify-center items-center mt-8 w-full bg-white py-12 lg:py-24" id='lessonDetails' >

        <div>
          <NavBar />
        </div>

        <div className="container mx-auto py-8">
          <h1 className="text-4xl font-bold mb-4">Auslan Signs</h1>

          {/* Loop through all Auslan signs */}
          {auslanSigns.map((sign, index) => (
            <div key={sign.auslan_sign} className="mb-8">
              <h2 className="text-2xl mb-4">Sign: {sign.auslan_sign}</h2>

              <div className="flex items-center justify-between mb-4">
                {/* Image on the left */}
                <div className="w-1/2">
                  <img src={sign.image_uel} alt={sign.auslan_sign} className="w-full mb-4" />
                </div>

                {/* Video on the right */}
                <div className="w-1/2">
                  <video controls className="w-full">
                    <source src={sign.video_url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>

              {/* Next button */}
              <div className="flex justify-end">
                <button
                  onClick={() => handleNext(index)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Test
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
      <Footer />
    </>

  );
};

export default LessonDetails;
