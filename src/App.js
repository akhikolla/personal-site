import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Main from './layouts/Main' // fallback for lazy pages
import './static/css/main.scss' // All of our styles

const { PUBLIC_URL } = process.env

// Every route - we lazy load so that each page can be chunked
// NOTE that some of these chunks are very small. We should optimize
// which pages are lazy loaded in the future.
const About = lazy(() => import('./pages/About'))
const Index = lazy(() => import('./pages/Index'))
const Projects = lazy(() => import('./pages/Projects'))
const Resume = lazy(() => import('./pages/Resume'))
const Blog = lazy(() => import('./pages/Blog'))

const App = () => (
  <BrowserRouter basename={PUBLIC_URL}>
    <Suspense fallback={<Main />}>
      <Switch>
        <Route exact path="/" component={Index} />
        <Route path="/about" component={About} />
        <Route path="/projects" component={Projects} />
        <Route path="/resume" component={Resume} />
        <Route path="/blog" component={Blog} />
      </Switch>
    </Suspense>
  </BrowserRouter>
)

export default App
