// src/pages/BlankPage.js
import React from 'react'
import Main from '../layouts/Main'

const BlankPage = () => (
  <Main
    title="System Design"
    description="This is a System Design page"
    fullPage={true}
  >
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>This is a System Design page.</h1>
    </div>
  </Main>
)

export default BlankPage
