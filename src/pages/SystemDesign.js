// src/pages/SystemDesign.js
import React from 'react'
import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import Main from '../layouts/Main'
import raw from 'raw.macro'

// Load markdown files
const files = [
  {
    title: 'Top K Problems',
    id: 'topk',
    markdown: raw('../data/systemdesign/topk.md'),
  },
  {
    title: 'Rate Limiter Design',
    id: 'rate-limiter',
    markdown: raw('../data/systemdesign/ratelimiter.md'),
  },
  {
    title: 'Kafka',
    id: 'kafka',
    markdown: raw('../data/systemdesign/kafka.md'),
  },
  {
    title: 'Real Time Updates',
    id: 'real-time-updates',
    markdown: raw('../data/systemdesign/realtimeupdates.md'),
  },
  {
    title: 'ZooKeeper',
    id: 'zoo-keeper',
    markdown: raw('../data/systemdesign/zookeeper.md'),
  },
  {
    title: 'DataModeling',
    id: 'data-modeling',
    markdown: raw('../data/systemdesign/datamodeling.md'),
  },
]

// Link renderer to work with React Router
const LinkRenderer = ({ ...children }) => <Link {...children} />

const SystemDesign = () => (
  <Main
    title="System Design"
    description="This is a system design page"
    fullPage={true}
  >
    <article className="post markdown" id="system-design">
      <header>
        <div className="title">
          <h2 data-testid="heading">System Design Topics</h2>
        </div>
      </header>

      {/* Table of contents */}
      <ul>
        {files.map(({ title, id }) => (
          <li key={id}>
            <a href={`#${id}`}>{title}</a>
          </li>
        ))}
      </ul>

      <br />

      {/* Markdown content sections */}
      {files.map(({ title, id, markdown }) => (
        <section key={id}>
          <h2 id={id} style={{ color: 'green' }}>
            {title}
          </h2>
          <ReactMarkdown
            source={markdown}
            renderers={{
              Link: LinkRenderer,
            }}
            escapeHtml={false}
          />
          <hr />
        </section>
      ))}
    </article>
  </Main>
)

export default SystemDesign
