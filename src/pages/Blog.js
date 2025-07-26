// src/pages/Blog.js
import React from 'react'
import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import raw from 'raw.macro'

import Main from '../layouts/Main'

// uses babel to load contents of file
const markdown = raw('../data/Blog.md')

const count = markdown
  .split(/\s+/)
  .map((s) => s.replace(/\W/g, ''))
  .filter((s) => s.length).length

const LinkRenderer = ({ ...children }) => <Link {...children} />

const Blog = () => (
  <Main title="Blog" description="Learn about Blind75" fullPage={true}>
    <article className="post markdown" id="blog">
      <header>
        <div className="title">
          <h2 data-testid="heading">
            <Link to="/Blog">Blind75</Link>
          </h2>
        </div>
      </header>
      <ReactMarkdown
        source={markdown}
        renderers={{
          Link: LinkRenderer,
        }}
        escapeHtml={false}
      />
    </article>
  </Main>
)

export default Blog
