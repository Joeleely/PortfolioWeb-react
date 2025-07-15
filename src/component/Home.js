import '../css/home.css';
import React, { useEffect, useState } from 'react';

const Home = () => {
  const [moved, setMoved] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMoved(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

    return (
    <section className="home" id="home">
      <div className="home-overlay">
        <div className="home-content">
          <div className="home-title name">
            <h1 className={`V ${moved ? 'moved' : ''}`}>V</h1>
            <h1 className={`aran ${moved ? 'visible' : ''}`}>aranyu</h1>
            <h1 className={`L ${moved ? 'moved' : ''}`}>&nbsp;L</h1>
            <h1 className={`eela ${moved ? 'visible' : ''}`}>eelasopin</h1>
          </div>
          <div className="home-line" />
          <p className="home-subtitle">Photographer . Software Engineer . Video Editor</p>
        </div>
      </div>
    </section>
  );
};
//   return (
//     <section className="home" id="home">
//       <div className="home-overlay">
//         <div className="home-content">
//           <div className="home-title">
//             <div class="name">
//               <h1 class="V">V</h1>
//               <h1 class="aran">aranyu</h1>
//               <span></span>
//               <h1 class="L">&nbsp;L</h1>
//               <h1 class="eela">eelasopin</h1>
//             </div>
//           </div>
//           <div className="home-line" />
//           <p className="home-subtitle">Storyteller . Software Engineer . Video Editor</p>
//         </div>
//       </div>
//     </section>
//   );
// };

export default Home;