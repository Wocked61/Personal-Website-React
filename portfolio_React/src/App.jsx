import React from 'react'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import './App.css'
import csufLogo from './assets/csuf-logo.png'

function App() {
  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  }

  return (
    <div className="App">
      {/* Desktop Icons */}
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
            <p className="status-line">
              Status: Computer Science Student @ CSUF 
              <img src={csufLogo} alt="CSUF Logo" className="csuf-logo" />
            </p>
            <p>Interests: Web Development, Gaming, Technology</p>
            <p>Current Project: React Portfolio with NSO Aesthetic</p>
            <div className="chat-message">
              System: Welcome to my digital space! I'm passionate about creating innovative web experiences and bringing creative visions to life through code.
            </div>
          </div>
        </div>

        <div className="window">
          <div className="window-header">
            <span>Projects_Folder</span>
            <div className="window-controls">
              <div className="window-button">−</div>
              <div className="window-button">□</div>
              <div className="window-button">×</div>
            </div>
          </div>
          <div className="window-content">
            <h2>Project Files</h2>
            <p>📁 React_Portfolio.zip</p>
            <p>📁 Web_Development_Tools.rar</p>
            <p>📁 Gaming_Projects.7z</p>
            <p>📁 AI_Experiments.tar</p>
            <div className="chat-message">
              Loading project descriptions... Each folder contains innovative solutions and creative implementations of modern web technologies.
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
