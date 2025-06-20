import './Footer.css'
import projectClickSound from './assets/Project_Click.wav'

function Footer() {
  const playProjectClickSound = () => {
    try {
      const audio = new Audio(projectClickSound);
      audio.volume = 0.7;
      audio.play().catch(error => {
        console.log('Audio play failed:', error);
      });
    } catch (error) {
      console.log('Audio creation failed:', error);
    }
  };

  const handleLinkClick = (url) => {
    playProjectClickSound();
    window.open(url, '_blank');
  };

  const handleEmailClick = () => {
    playProjectClickSound();
    window.open('mailto:dylanphan88@gmail.com', '_blank');
  };

  return (
    <footer className="App-footer">
      <p>Built with React</p>
      <p>
        <i 
          className="hn hn-github social-icon" 
          onClick={() => handleLinkClick("https://github.com/Wocked61")}
        ></i>
        My <span 
          className="footer-link" 
          onClick={() => handleLinkClick("https://github.com/Wocked61")}
        >
          GitHub
        </span>
      </p>
      <p>
        <i 
          className="hn hn-google social-icon" 
          onClick={handleEmailClick}
        ></i>
        Email me: <span 
          className="footer-link" 
          onClick={handleEmailClick}
        >
          dylanphan88@gmail.com
        </span>
      </p>
      <p>
        <i 
          className="hn hn-linkedin social-icon" 
          onClick={() => handleLinkClick("https://www.linkedin.com/in/dylan-phan88")}
        ></i>
        Connect with me on <span 
          className="footer-link" 
          onClick={() => handleLinkClick("https://www.linkedin.com/in/dylan-phan88")}
        >
          LinkedIn
        </span>
      </p>
      <p>Last updated: June 2025</p>
      <p>&copy; 2025 Dylan Phan | Computer Science Student @ CSUF</p>
      <p></p>
      <p></p> 
    </footer>
  )
}

export default Footer
