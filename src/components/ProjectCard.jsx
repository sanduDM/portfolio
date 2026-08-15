import React from 'react';

export default function ProjectCard({ project }) {
  return (
    <article className="project-card">
      {project.screenshot ? (
        <div className="project-image-wrap">
          <img src={project.screenshot} alt={project.screenshotAlt} className="project-image" />
        </div>
      ) : null}

      <div className="project-content">
        <div className="project-meta">
          <span className="project-status">{project.status}</span>
          <span className="project-type">Project</span>
        </div>

        <h3>{project.title}</h3>
        <p>{project.description}</p>

        <div className="project-tech">
          {project.technologies.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>

        {project.concepts ? (
          <div className="project-concepts">
            {project.concepts.map((concept) => (
              <span key={concept}>{concept}</span>
            ))}
          </div>
        ) : null}

        {project.contribution ? (
          <div className="project-contribution">
            <span>{project.contribution}</span>
          </div>
        ) : null}
      </div>
    </article>
  );
}
