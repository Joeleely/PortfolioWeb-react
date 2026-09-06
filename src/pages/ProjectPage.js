import '../css/allProject.css';
import projectData from '../Data/ProjectData';
import { useState } from 'react';
import TiltCard from '../component/TiltCard';

const ProjectPage = ({ setPage }) => {
  const [activeTab, setActiveTab] = useState('project');

  return (
    <div className="project-page">
      <button onClick={() => setPage('home')} className="back-button">← Back</button>
      <h1 className='title'>All Projects</h1>
      <div className="project-page">
        <div className="tab-buttons">
          <button
            className={`tab ${activeTab === 'project' ? 'active' : ''}`}
            onClick={() => setActiveTab('project')}
          >
            Project
          </button>
          <button
            className={`tab ${activeTab === 'service' ? 'active' : ''}`}
            onClick={() => setActiveTab('service')}
          >
            Service
          </button>
        </div>

        <div className="project-list">
          {projectData[activeTab].map((item, index) => (
            <TiltCard className="project-card" key={`${activeTab}-${index}`}>
  <div>
    <div className="project-header">
      {item.type === 'github' && item.logo && (
        <img src={item.logo} alt={`${item.title} logo`} className="project-logo" />
      )}
      <h2>{item.title}</h2>
    </div>
    <p>{item.desc}</p>
  </div>
  {item.type === 'github' ? (
    <a href={item.link} target="_blank" rel="noopener noreferrer" className="circle-button github">
      <i className="bx bxl-github icon"></i>
      <span className="button-text">See more information</span>
    </a>
              ) : (
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="circle-button web">
                  <i className="bx bx-link-alt icon"></i>
                  <span className="button-text">Visit Website</span>
                </a>
              )}
            </TiltCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
