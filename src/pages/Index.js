import React from 'react'
import { Link } from 'react-router-dom'
import Personal from '../components/Stats/Personal'
import Site from '../components/Stats/Site'
import Main from '../layouts/Main'

const Index = () => (
  <Main
    description={
      "Akhila C'Kolla's personal website. A Graduate Student from India. "
    }
  >
    <article className="post" id="index">
      <header>
        <div className="title">
          <h2 data-testid="heading">
            <Link to="/stats">Stats</Link>
          </h2>
        </div>
      </header>
      <Personal />
      <Site />
    </article>
  </Main>
)

export default Index
