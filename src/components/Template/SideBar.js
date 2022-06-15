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
          <a href="mailto:akhila.c.kolla@gmail.com">akhila.c.kolla@gmail.com</a>
        </p>
      </header>
    </section>

    <section className="blurb">
      <h2>About</h2>
      <p>
        Hi, I&apos;m Akhila. I like building things. I am a{' '}
        <a href="https://nau.edu/">NAU </a> graduate, SVECW Alumni, and a
        graduate research assistant in{' '}
        <a href="http://ml.nau.edu/">Machine Learing Reseach Lab at NAU</a>.
        Before NAU I was at <a href="https://www.infosys.com/">Infosys</a>,{' '}
        <a href="http://www.apita.ap.gov.in/">APITA</a>.
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
