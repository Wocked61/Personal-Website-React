import './Footer.css'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'

function Footer() {
  return (
    <footer className="App-footer">
      <p>Built with React</p>
      <p>
        <FaGithub onClick={() => window.open("https://github.com/Wocked61", "_blank")} className="social-icon" />
        My <a href="https://github.com/Wocked61">GitHub</a>
      </p>
      <p>
        <FaEnvelope onClick={() => window.open("mailto:dylanphan@gmail.com", "_blank")} className="social-icon" />
        Email me: <a href="mailto:dylanphan@gmail.com">dylanphan@gmail.com</a>
      </p>
      <p>
        <FaLinkedin onClick={() => window.open("https://www.linkedin.com/in/dylan-phan88", "_blank")} className="social-icon" />
        Connect with me on <a href="https://www.linkedin.com/in/dylan-phan88">LinkedIn</a>
      </p>
      <p>Last updated: June 2025</p>
      <p>&copy; 2025 Dylan Phan | Computer Science Student @ CSUF </p>            
    </footer>
  )
}

export default Footer
