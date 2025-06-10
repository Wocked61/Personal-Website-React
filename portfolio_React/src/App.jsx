import React from 'react'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import './App.css'

function App() {

  return (
    <div className="App">
      <Header />
      <main>
        <section>
          <h2>About Me</h2>
          <p></p>
        </section>
        <section>
          <h2>Projects</h2>
          <p>List your projects here.</p>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default App
