import React from 'react'
import { Link } from 'react-router-dom'

import Main from '../layouts/Main'

import Cell from '../components/Projects/Cell'
import data from '../data/projects'

const onProjectClick = (e) => {
  console.log('e.target value', e.target)
  return <h4>e.target.value</h4>
}

const Projects = () => (
  <Main title="Projects" description="Learn about Akhila C'Kolla's projects.">
    <article className="post" id="projects">
      <header>
        <div className="title">
          <h2 data-testid="heading">
            <Link to="/projects">Projects</Link>
          </h2>
          <p>My Daily Coding Blogs</p>
        </div>
      </header>
      {data.map((project) => (
        <Cell data={project} key={project.title} onClick={onProjectClick} />
      ))}
    </article>
  </Main>
)

export default Projects

// &apos;
