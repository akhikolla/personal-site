import React from 'react'
import { Link } from 'react-router-dom'

import ContactIcons from '../Contact/ContactIcons'

const { PUBLIC_URL } = process.env // set automatically from package.json:homepage

const SideBar = () => (
  <section id="sidebar">
    <section id="intro">
      <Link to="/" className="logo">
        <img src={`${PUBLIC_URL}/images/mes.png`} alt="" />
      </Link>
      <header>
        <h2>Akhila C&apos;Kolla</h2>
        <p>
          <a href="mailto:akhilakolla5@gmail.com">akhilakolla5@gmail.com</a>
        </p>
      </header>
    </section>

    <section className="blurb">
      <h2>About</h2>
      <p>
        <p>Hi, I'm Akhila. I like building things.</p>

        <p>
          Senior Software Engineer at Amazon Ads, designing reliable,
          low-latency adtech systems for global publisher integrations.
        </p>

        <p>
          During my downtime, I'm on a tech treasure hunt, scanning through the
          latest apps and SaaS products on Product Hunt and AppSumo.
        </p>

        <p>
          If I could, I would just code and eat pizza 24 hours a day, but I'm so
          sad that I have to sleep.
        </p>

        <p>
          I am a <a href="https://nau.edu/">NAU</a> graduate, SVECW alumna, and
          a graduate research assistant in the
          <a href="http://ml.nau.edu/">Machine Learning Research Lab at NAU</a>.
          Before NAU, I was at <a href="https://www.infosys.com/">Infosys</a>{' '}
          and
          <a href="http://www.apita.ap.gov.in/">APITA</a>.
        </p>
      </p>
      <ul className="actions">
        <li>
          {!window.location.pathname.includes('/resume') ? (
            <Link to="/resume" className="button">
              Learn More
            </Link>
          ) : (
            <Link to="/about" className="button">
              About Me
            </Link>
          )}
        </li>
      </ul>
    </section>

    <section id="footer">
      <ContactIcons />
      <p className="copyright">
        &copy; Akhila C&apos;Kolla<Link to="/">akhikolla.com</Link>.
      </p>
    </section>
  </section>
)

export default SideBar
