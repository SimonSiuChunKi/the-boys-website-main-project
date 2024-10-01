import React, { useEffect } from 'react';
import AOS from 'aos';
import "aos/dist/aos.css";
import './index.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
// All pages
import Home from './pages/Home';
import Contact from './pages/Contact';
import DemoProduct from './pages/DemoProduct';
import Lessons from './pages/Lessons';
import LessonDetail from './pages/LessonDetails';
import NotFound from './pages/NotFound';
import SignLibrary from './pages/SignLibrary';
import Signs from './pages/Sign';

import {useDocTitle} from './components/CustomHook';
import ScrollToTop from './components/ScrollToTop';

function App() {
  useEffect(() => {
    const aos_init = () => {
      AOS.init({
        once: true,
        duration: 1000,
        easing: 'ease-out-cubic',
      });
    }

    window.addEventListener('load', () => {
      aos_init();
    });
  }, []);

  useDocTitle("Sign Connect");

  return (
    <>
      <Router>
        <ScrollToTop>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/get-demo" element={<DemoProduct />} /> 
            <Route path="/lessons/:course_id" element={<Lessons />} />
            <Route path="/lesson/:lesson_id" element={<LessonDetail />} />
            <Route path="/sign_library" element={<SignLibrary />} />
            <Route path="/hand_sign/:hand_sign" element={<Signs />} />
            <Route path='*' element={<NotFound />}/>
          </Routes>
        </ScrollToTop>
      </Router>
    </>
  );
}


export default App;
