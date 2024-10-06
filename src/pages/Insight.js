import React from "react";
import NavBar from '../components/Navbar/NavBar';
import Footer from '../components/Footer';

const Insight = () => {
    return (
        <>
            <div>
                <NavBar />
            </div>
            <div className="m-auto overflow-hidden mx-4 mt-8 lg:mt-4 p-2 md:p-12 h-5/6 ml-11" data-aos="zoom-in">
                <div id='insight' className="flex flex-col lg:flex-row py-8 justify-between text-center lg:text-left w-full">
                    <div className="lg:w-full flex flex-col justify-center" data-aos="zoom-in" data-aos-delay="200">
                        <h2 className="mb-5 md:text-4xl text-3xl font-bold text-blue-900">
                            Insight
                        </h2>
                        <div className="text-xl font-semibold tracking-tight mb-5 text-gray-500">
                            Information about Auslan.
                        </div>
                        <div className="iframe-container w-full flex justify-center py-8">
                            <iframe 
                                frameBorder="0" 
                                scrolling="no" 
                                style={{ width: '100%', minHeight: '1005px' }} 
                                src="https://www.sbs.com.au/census-explorer-2021/?languages=auslan&topic=cultural-diversity&lang=en&embed=where-do-people-live">
                                Sorry your browser does not support inline frames.
                            </iframe>
                        </div>
                        <div className="iframe-container w-full flex justify-center py-8">
                            <iframe 
                                frameBorder="0" 
                                scrolling="no" 
                                style={{ width: '50%', minHeight: '1005px' }} 
                                src="https://www.sbs.com.au/census-explorer-2021/?languages=auslan&topic=cultural-diversity&lang=en&embed=what-was-the-most-common-ancestry">
                                Sorry your browser does not support inline frames.
                            </iframe>
                            <iframe 
                                frameBorder="0" 
                                scrolling="no" 
                                style={{ width: '50%', minHeight: '1005px' }} 
                                src="https://www.sbs.com.au/census-explorer-2021/?languages=auslan&topic=cultural-diversity&lang=en&embed=how-old-are-people">
                                Sorry your browser does not support inline frames.
                            </iframe>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Insight;
