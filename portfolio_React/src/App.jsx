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
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non distinctio ratione nisi beatae, atque optio magnam excepturi. Omnis enim, soluta dicta rem aperiam ducimus odio quasi aut, expedita quae perferendis!</p>
        </section>
        <section>
          <h2>Projects</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non distinctio ratione nisi beatae, atque optio magnam excepturi. Omnis enim, soluta dicta rem aperiam ducimus odio quasi aut, expedita quae perferendis!</p>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default App
