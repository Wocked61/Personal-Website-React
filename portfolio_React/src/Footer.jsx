import './Footer.css'

function Footer() {
  return (
    <footer className="App-footer">
      <p>Built with React</p>
      <p>
        <i className="hn hn-github social-icon" onClick={() => window.open("https://github.com/Wocked61", "_blank")}></i>
        My <a href="https://github.com/Wocked61">GitHub</a>
      </p>
      <p>
        <i className="hn hn-google social-icon" onClick={() => window.open("mailto:dylanphan88@gmail.com", "_blank")}></i>
        Email me: <a href="mailto:dylanphan88@gmail.com">dylanphan88@gmail.com</a>
      </p>
      <p>
        <i className="hn hn-linkedin social-icon" onClick={() => window.open("https://www.linkedin.com/in/dylan-phan88", "_blank")}></i>
        Connect with me on <a href="https://www.linkedin.com/in/dylan-phan88">LinkedIn</a>
      </p>
      <p>Last updated: June 2025</p>
      <p>&copy; 2025 Dylan Phan | Computer Science Student @ CSUF</p>
      <p></p>
      <p></p> 
    </footer>
  )
}

export default Footer
