import './css/stylesheet.css';
import Header from './component/Header';
import Home from './component/Home';
import About from './component/About';
import Project from './component/Project';
import Contact from './component/Contact';
import ProjectPage from './pages/ProjectPage';
import { useState } from 'react';
import GalleryPage from './pages/GalleryPage';
import Gallery from './component/Gallery';

function App() {
  const [page, setPage] = useState('home');
  return (
    <div className="App">
      {/* <Header setPage={setPage}/> */}
      {page === 'home' ? (
        <>
          <div className='bodyInfo'>
            <Header setPage={setPage}/>
            <Home />
            <About />
            <Project setPage={setPage} />
            <Gallery setPage={setPage}/>
          </div>
          <Contact />
        </>
      ) : page === 'projects' ? (
        <ProjectPage setPage={setPage} />
      ) : (
        <GalleryPage setPage={setPage}/>
      )}
    </div>
  );
}

export default App;
