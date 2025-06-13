import React from 'react'
import { Rnd } from 'react-rnd'
import Footer from './Footer.jsx'
import './App.css'
import '@hackernoon/pixel-icon-library/fonts/iconfont.css'
import csufLogo from './assets/csuf-logo.png'

function App() {
  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  }

  return (
    <div className="App">
      {/* Desktop Icons Container with Window Border - Now Draggable/Resizable */}
      <Rnd
        default={{
          x: 80,
          y: 150,
          width: 320,
          height: 260,
        }}
        minWidth={200}
        minHeight={150}
        bounds="parent"
        dragHandleClassName="window-header"
        className="desktop-icons-rnd"
        style={{
          position: 'fixed',
          zIndex: 100
        }}
      >
        <div className="desktop-icons-window">
          <div className="window-header">
            <span>Navigator.exe</span>
            <div className="window-controls">
              <div className="window-button">−</div>
              <div className="window-button">□</div>
              <div className="window-button">×</div>
            </div>
          </div>
          <div className="desktop-icons-content">
            <div className="desktop-icon">
              <div className="icon-image">📁</div>
              <div>Projects</div>
            </div>
            <div className="desktop-icon">
              <div className="icon-image">👤</div>
              <div>About Me</div>
            </div>
            <div className="desktop-icon">
              <div className="icon-image">📧</div>
              <div>Contact</div>
            </div>
          </div>
        </div>
      </Rnd>

      {/* Mood Panel - Draggable Window */}
      <Rnd
        default={{
          x: window.innerWidth - 450, 
          y: 150,
          width: 390,
          height: 250,
        }}
        minWidth={250}
        minHeight={150}
        bounds="parent"
        dragHandleClassName="window-header"
        className="mood-panel-rnd"
        style={{
          zIndex: 99
        }}
      >
        <div className="mood-panel-window">
          <div className="window-header">
            <span>Mood_Monitor.exe</span>
            <div className="window-controls">
              <div className="window-button">−</div>
              <div className="window-button">□</div>
              <div className="window-button">×</div>
            </div>
          </div>
          <div className="mood-panel-content">
            <div className="mood-item">
              <span className="mood-icon">🧠</span>
              <span className="mood-label">Mood</span>
              <div className="mood-progress">
                <div className="mood-progress-bar" style={{width: '85%'}}></div>
              </div>
              <span className="mood-value">85/100</span>
            </div>
            <div className="mood-item">
              <span className="mood-icon">🔋</span>
              <span className="mood-label">Energy</span>
              <div className="mood-progress">
                <div className="mood-progress-bar" style={{width: '60%'}}></div>
              </div>
              <span className="mood-value">60/100</span>
            </div>
            <div className="mood-item">
              <span className="mood-icon">🎨</span>
              <span className="mood-label">Creativity</span>
              <div className="mood-progress">
                <div className="mood-progress-bar" style={{width: '95%'}}></div>
              </div>
              <span className="mood-value">95/100</span>
            </div>
          </div>
        </div>
      </Rnd>

      {/* HUD Panel Header */}
      <div className="hud-panel">
        <h1 style={{margin: 0, fontSize: '16px', textTransform: 'uppercase', letterSpacing: '2px'}}>
          Dylan's Portfolio System v1.0
        </h1>
        <div style={{fontSize: '10px'}}>
          STATUS: ONLINE | USER: DYLAN_PHAN
        </div>
      </div>

      {/* Window Container */}
      <div className="window-container">
        <div className="window">
          <div className="window-header">
            <span>About_Me.exe</span>
            <div className="window-controls">
              <div className="window-button">−</div>
              <div className="window-button">□</div>
              <div className="window-button">×</div>
            </div>
          </div>
          <div className="window-content">
            <h2>User Profile</h2>
            <p>INITIALIZING USER DATA...</p>
            <p>Loading profile: Dylan Phan</p>
            <p>Hello! I'm Dylan — a curious and driven CS student who builds interactive, stylish websites with a creative twist. Whether it’s a checkers app or a Pokémon collector, I aim to merge code with personality.</p>
            <div className="status-line">
              <div className="status-text">
                <span>Status: Senior Computer Science Student @ CSUF</span>
              </div>
              <img src={csufLogo} alt="CSUF Logo" className="csuf-logo" />
            </div>
            <p>Interests: Web Development, Gaming, Technology</p>
            <p>Current Project: React Portfolio with NSO Aesthetic</p>
            <div className="chat-message">
              System: Welcome to my digital space! I'm passionate about creating innovative web experiences and bringing creative visions to life through code.
            </div>
          </div>
        </div>

        <div className="window">
          <div className="window-header">
            <span>Projects_Directory.exe</span>
            <div className="window-controls">
              <div className="window-button">−</div>
              <div className="window-button">□</div>
              <div className="window-button">×</div>
            </div>
          </div>
          <div className="window-content">
            <h2>Project Archive</h2>
            <p>LOADING PROJECT DATABASE...</p>
            <p>Found 4 project files in directory</p>
            
            <div className="project-list">
              <div className="project-item">
                <div className="project-icon">🏁</div>
                <div className="project-details">
                  <h3>Checkers/Chess Fullstack Website</h3>
                  <p>Technologies: HTML, CSS, Javascript</p>
                  <p>Status: Completed</p>
                </div>
              </div>

              <div className="project-item">
                <div className="project-icon">⚡</div>
                <div className="project-details">
                  <h3>PokéPull – Pokémon Collection App</h3>
                  <p>Technologies: React, PokéAPI</p>
                  <p>Status: Active Development</p>
                </div>
              </div>

              <div className="project-item">
                <div className="project-icon">🌤️</div>
                <div className="project-details">
                  <h3>Regional Cloud Weather Fullstack Website</h3>
                  <p>Technologies: Full Stack Development</p>
                  <p>Status: Completed</p>
                </div>
              </div>

              <div className="project-item">
                <div className="project-icon">🎯</div>
                <div className="project-details">
                  <h3>Hurdle Wordle Clone</h3>
                  <p>Technologies: Javascript, Game Logic</p>
                  <p>Status: Completed</p>
                </div>
              </div>
            </div>

            <div className="chat-message">
              System: Projects showcase full-stack development skills and creative problem-solving. Each project demonstrates proficiency in modern web technologies and user experience design.
            </div>
          </div>
        </div>
      </div>

      {/* Task Bar */}
      <div className="task-bar">
        <div className="start-button">Start</div>
        <div className="task-items">
          <div className="task-item">Portfolio.exe</div>
          <div className="task-item">About_Me.exe</div>
          <div className="task-item">Projects</div>
        </div>
        <div className="system-tray">
          {getCurrentTime()} | 🔊 ⚡ 📶
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default App
