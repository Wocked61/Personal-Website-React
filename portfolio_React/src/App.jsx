import React, { useState, useEffect } from 'react'
import { Rnd } from 'react-rnd'
import Footer from './Footer.jsx'
import './App.css'
import '@hackernoon/pixel-icon-library/fonts/iconfont.css'
import csufLogo from './assets/csuf-logo.png'
import moveScrollSound from './assets/move_scroll.mp3'
import closeWindowSound from './assets/close_Window.mp3'
import openWindowSound from './assets/open_Window.mp3'
import enlargeWindowSound from './assets/enlarge_Window.mp3'
import minimizeWindowSound from './assets/minimize_Window.mp3'
import errorSound from './assets/Error.wav'
import loadingSound from './assets/loading.mp3'
import bgmSound from './assets/bgm.mp3'

function App() {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('INITIALIZING SYSTEM...');
  const [loadingAudio, setLoadingAudio] = useState(null);
  const [bgmAudio, setBgmAudio] = useState(null);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [showAudioPrompt, setShowAudioPrompt] = useState(false);
  const [navigatorState, setNavigatorState] = useState({
    isVisible: true,
    isMinimized: false,
    isMaximized: false,
    isAnimating: false,
    position: { x: 120, y: 140 },
    size: { width: 320, height: 320 },
    savedPosition: { x: 120, y: 140 },
    savedSize: { width: 320, height: 320 }
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));
    }, 1000);

    return () => clearInterval(timer);
  }, []);


  useEffect(() => {
    const initializeAudio = async () => {

      const loadingAudioInstance = new Audio(loadingSound);
      loadingAudioInstance.volume = 0.5;
      setLoadingAudio(loadingAudioInstance);
      
      const bgmAudioInstance = new Audio(bgmSound);
      bgmAudioInstance.volume = 0.15;
      bgmAudioInstance.loop = true;
      setBgmAudio(bgmAudioInstance);


      try {
        await loadingAudioInstance.play();
        setAudioEnabled(true);
      } catch (error) {
        console.log('Audio autoplay blocked, showing prompt');
        setShowAudioPrompt(true);
      }
    };

    initializeAudio();

    const loadingSteps = [
      { progress: 10, text: 'INITIALIZING SYSTEM...' },
      { progress: 25, text: 'LOADING USER DATA...' },
      { progress: 40, text: 'SCANNING SKILL REPOSITORY...' },
      { progress: 55, text: 'INITIALIZING PROJECTS...' },
      { progress: 70, text: 'CONNECTING TO PORTFOLIO SYSTEM...' },
      { progress: 85, text: 'FINALIZING SETUP...' },
      { progress: 100, text: 'SYSTEM READY!' }
    ];

    let currentStep = 0;
    const loadingInterval = setInterval(() => {
      if (currentStep < loadingSteps.length) {
        setLoadingProgress(loadingSteps[currentStep].progress);
        setLoadingText(loadingSteps[currentStep].text);
        currentStep++;
      } else {
        clearInterval(loadingInterval);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000); // Extended final delay
      }
    }, 1000); // 7 steps × 1000ms + 1000ms = 8 seconds total

    return () => {
      clearInterval(loadingInterval);
    };
  }, []);

  const enableAudio = async () => {
    if (loadingAudio && !audioEnabled) {
      try {
        await loadingAudio.play();
        setAudioEnabled(true);
        setShowAudioPrompt(false);
      } catch (error) {
        console.log('Failed to enable audio:', error);
      }
    }
  };

  useEffect(() => {
    if (loadingAudio && bgmAudio && !isLoading && audioEnabled) {
      const checkLoadingSoundEnd = () => {
        if (loadingAudio.ended || loadingAudio.currentTime >= loadingAudio.duration) {
          bgmAudio.play().catch(error => {
            console.log('BGM play failed:', error);
          });
        } else {
          setTimeout(checkLoadingSoundEnd, 100);
        }
      };
      
      checkLoadingSoundEnd();
    }
  }, [loadingAudio, bgmAudio, isLoading, audioEnabled]);

  useEffect(() => {
    return () => {
      if (loadingAudio) {
        loadingAudio.pause();
        loadingAudio.currentTime = 0;
      }
      if (bgmAudio) {
        bgmAudio.pause();
        bgmAudio.currentTime = 0;
      }
    };
  }, [loadingAudio, bgmAudio]);

  const playMoveScrollSound = () => {
    try {
      const audio = new Audio(moveScrollSound);
      audio.volume = 0.8;
      audio.play().catch(error => {
        console.log('Audio play failed:', error);
      });
    } catch (error) {
      console.log('Audio creation failed:', error);
    }
  };

  const playCloseWindowSound = () => {
    try {
      const audio = new Audio(closeWindowSound);
      audio.volume = 0.7;
      audio.play().catch(error => {
        console.log('Audio play failed:', error);
      });
    } catch (error) {
      console.log('Audio creation failed:', error);
    }
  };

  const playOpenWindowSound = () => {
    try {
      const audio = new Audio(openWindowSound);
      audio.volume = 1;
      audio.play().catch(error => {
        console.log('Audio play failed:', error);
      });
    } catch (error) {
      console.log('Audio creation failed:', error);
    }
  };

  const playEnlargeWindowSound = () => {
    try {
      const audio = new Audio(enlargeWindowSound);
      audio.volume = 0.7;
      audio.play().catch(error => {
        console.log('Audio play failed:', error);
      });
    } catch (error) {
      console.log('Audio creation failed:', error);
    }
  };

  const playMinimizeWindowSound = () => {
    try {
      const audio = new Audio(minimizeWindowSound);
      audio.volume = 0.7;
      audio.play().catch(error => {
        console.log('Audio play failed:', error);
      });
    } catch (error) {
      console.log('Audio creation failed:', error);
    }
  };

  const playErrorSound = () => {
    try {
      const audio = new Audio(errorSound);
      audio.volume = 0.6;
      audio.play().catch(error => {
        console.log('Audio play failed:', error);
      });
    } catch (error) {
      console.log('Audio creation failed:', error);
    }
  };

  const handleMinimize = () => {
    playMinimizeWindowSound();
    setNavigatorState(prev => ({
      ...prev,
      savedPosition: prev.isMaximized ? prev.savedPosition : prev.position,
      savedSize: prev.isMaximized ? prev.savedSize : prev.size,
      isAnimating: true
    }));

    setTimeout(() => {
      setNavigatorState(prev => ({
        ...prev,
        isMinimized: true,
        isAnimating: false,
        isMaximized: false
      }));
    }, 300);
  };

  const handleMaximize = () => {
    playEnlargeWindowSound();
    setNavigatorState(prev => ({
      ...prev,
      isMaximized: !prev.isMaximized,
      isMinimized: false,
      savedPosition: prev.isMaximized ? prev.savedPosition : prev.position,
      savedSize: prev.isMaximized ? prev.savedSize : prev.size
    }));
  };

  const handleClose = () => {
    playCloseWindowSound();
    setNavigatorState(prev => ({
      ...prev,
      savedPosition: prev.isMaximized ? prev.savedPosition : prev.position,
      savedSize: prev.isMaximized ? prev.savedSize : prev.size,
      isAnimating: true
    }));

    setTimeout(() => {
      setNavigatorState(prev => ({
        ...prev,
        isVisible: false,
        isMinimized: false,
        isAnimating: false,
        isMaximized: false
      }));
    }, 300);
  };

  const handleTaskBarNavigatorClick = () => {
    if (!navigatorState.isVisible) {
      playOpenWindowSound();
      setNavigatorState(prev => ({
        ...prev,
        isVisible: true,
        isMinimized: false,
        position: prev.savedPosition,
        size: prev.savedSize
      }));
    } else if (navigatorState.isMinimized) {
      playOpenWindowSound();
      setNavigatorState(prev => ({
        ...prev,
        isMinimized: false,
        position: prev.savedPosition,
        size: prev.savedSize
      }));
    } else {
      handleMinimize();
    }
  };

  const scrollToAboutMe = () => {
    playMoveScrollSound();
    const aboutMeWindow = document.querySelector('.window:nth-child(1)');
    if (aboutMeWindow) {
      aboutMeWindow.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        inline: 'nearest'
      });
    }
  };

  const scrollToProjects = () => {
    playMoveScrollSound();
    const projectsWindow = document.querySelector('.window:nth-child(3)');
    if (projectsWindow) {
      projectsWindow.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        inline: 'nearest'
      });
    }
  };

  const scrollToSkills = () => {
    playMoveScrollSound();
    const skillsWindow = document.querySelector('.window:nth-child(2)');
    if (skillsWindow) {
      skillsWindow.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        inline: 'nearest'
      });
    }
  };

  const scrollToContact = () => {
    playMoveScrollSound();
    const footer = document.querySelector('.App-footer');
    if (footer) {
      footer.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        inline: 'nearest'
      });
    }
  };

  const handleTaskbarAboutMe = () => {
    scrollToAboutMe();
  };

  const handleTaskbarSkills = () => {
    scrollToSkills();
  };

  const handleTaskbarProjects = () => {
    scrollToProjects();
  };

  const handleTaskbarContact = () => {
    scrollToContact();
  };

  const handleCheckersChessClick = () => {
    window.open('https://wocked61.github.io/cpsc_362_sp2025_group2/', '_blank');
  }

  const handlePokePullClick = () => {
    window.open('https://wocked61.github.io/PokePull/', '_blank');
  }

  const handleRegionalCloudClick = () => {
    window.open('https://wocked61.github.io/cpsc-349-project/', '_blank');
  }

  const handleHurdleWordleClick = () => {
    window.open('https://amajc.github.io/hurdle-frontend/', '_blank');
  }

  const SkillBar = ({ skill, level, maxBars = 10 }) => {
    const filledBars = Math.round((level / 100) * maxBars);
    const emptyBars = maxBars - filledBars;
    
    return (
      <div className="skill-item">
        <div className="skill-name">{skill}</div>
        <div className="skill-bar">
          <span className="skill-filled">{'█'.repeat(filledBars)}</span>
          <span className="skill-empty">{'░'.repeat(emptyBars)}</span>
        </div>
      </div>
    );
  };

  const handleStartButtonClick = () => {
    playMoveScrollSound();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-container">
          <h1 className="loading-title">DYLAN'S PORTFOLIO SYSTEM</h1>
          <div className="loading-version">v1.0</div>
          
          <div className="loading-progress-container">
            <div className="loading-text">{loadingText}</div>
            <div className="loading-bar">
              <div 
                className="loading-fill" 
                style={{ width: `${loadingProgress}%` }}
              ></div>
            </div>
            <div className="loading-percentage">{loadingProgress}%</div>
          </div>
          
          {showAudioPrompt && (
            <div className="audio-prompt">
              <button onClick={enableAudio} className="audio-enable-button">
                🔊 ENABLE AUDIO
              </button>
              <div className="audio-prompt-text">Click to enable sound effects and music</div>
            </div>
          )}
          
          <div className="loading-footer">
            <div>INITIALIZING USER: DYLAN_PHAN</div>
            <div>STATUS: LOADING...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      {/* Desktop Icons Container with Window Border - Now Draggable/Resizable */}
      {navigatorState.isVisible && !navigatorState.isMinimized && (
        <Rnd
          position={navigatorState.isMaximized ? { x: 0, y: 0 } : navigatorState.position}
          size={navigatorState.isMaximized ? { width: window.innerWidth, height: window.innerHeight - 40 } : navigatorState.size}
          onDragStop={(e, d) => {
            if (!navigatorState.isMaximized) {
              setNavigatorState(prev => ({
                ...prev,
                position: { x: d.x, y: d.y }
              }));
            }
          }}
          onResizeStop={(e, direction, ref, delta, position) => {
            if (!navigatorState.isMaximized) {
              setNavigatorState(prev => ({
                ...prev,
                size: { width: ref.style.width, height: ref.style.height },
                position
              }));
            }
          }}
          minWidth={200}
          minHeight={150}
          bounds="parent"
          dragHandleClassName="window-title-area"
          className={`desktop-icons-rnd ${navigatorState.isAnimating ? 'minimizing' : ''}`}
          style={{
            position: 'fixed',
            zIndex: 100
          }}
          disableDragging={navigatorState.isMaximized || navigatorState.isAnimating}
          enableResizing={!navigatorState.isMaximized && !navigatorState.isAnimating}
        >
          <div className="desktop-icons-window">
            <div className="window-header">
              <span className="window-title-area">Navigator.exe</span>
              <div className="window-controls">
                <div className="window-button" onClick={handleMinimize}>−</div>
                <div className="window-button" onClick={handleMaximize}>□</div>
                <div className="window-button" onClick={handleClose}>×</div>
              </div>
            </div>
            <div className="desktop-icons-content">
              <div className="desktop-icon" onClick={scrollToAboutMe}>
                <div className="icon-image">👤</div>
                <div>About Me</div>
              </div>
              <div className="desktop-icon" onClick={scrollToSkills}>
                <div className="icon-image">⚙️</div>
                <div>Skills</div>
              </div>              
              <div className="desktop-icon" onClick={scrollToProjects}>
                <div className="icon-image">📁</div>
                <div>Projects</div>                
              </div>
              <div className="desktop-icon" onClick={scrollToContact}>
                <div className="icon-image">📧</div>
                <div>Contact</div>
              </div>
            </div>
          </div>
        </Rnd>
      )}

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
        <div className="window" id="about-me-section">
          <div className="window-header">
            <span>About_Me.exe</span>
            <div className="window-controls">
              <div className="window-button" onClick={playErrorSound}>−</div>
              <div className="window-button" onClick={playErrorSound}>□</div>
              <div className="window-button" onClick={playErrorSound}>×</div>
            </div>
          </div>
          <div className="window-content">
            <h2>User Profile</h2>
            <p>USER DATA LOADED SUCCESSFULLY ✓</p>
            <p>Profile: Dylan Phan</p>
            <p>Hello! I'm Dylan — a curious and driven CS student who builds interactive, stylish websites with a creative twist. Whether it's a checkers app or a Pokémon collector, I aim to merge code with personality.</p>
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

        <div className="window" id="skills-section">
          <div className="window-header">
            <span>Skills_Manager.exe</span>
            <div className="window-controls">
              <div className="window-button" onClick={playErrorSound}>−</div>
              <div className="window-button" onClick={playErrorSound}>□</div>
              <div className="window-button" onClick={playErrorSound}>×</div>
            </div>
          </div>
          <div className="window-content">
            <h2>Technical Skills Database</h2>
            <p>SKILL REPOSITORY SCAN COMPLETE ✓</p>
            <p>Found 10 programming languages and technologies</p>
            
            <div className="skills-container">
              <h3>Web Technologies</h3>
              <SkillBar skill="HTML" level={85} />
              <SkillBar skill="CSS" level={80} />
              <SkillBar skill="JavaScript" level={75} />
              <SkillBar skill="React" level={70} />
              <SkillBar skill="Node.js" level={50} />
              
              <h3>Programming Languages</h3>
              <SkillBar skill="Python" level={50} />
              <SkillBar skill="Java" level={50} />
              <SkillBar skill="C++" level={50} />
              <SkillBar skill="C#" level={20} />
              
              <h3>Tools & Platforms</h3>
              <SkillBar skill="Git / GitHub" level={75} />
            </div>

            <div className="chat-message">
              System: Skills assessment complete. Proficiency levels based on project experience and academic coursework. Continuous learning in progress...
            </div>
          </div>
        </div>

        <div className="window" id="projects-section">
          <div className="window-header">
            <span>Projects_Directory.exe</span>
            <div className="window-controls">
              <div className="window-button" onClick={playErrorSound}>−</div>
              <div className="window-button" onClick={playErrorSound}>□</div>
              <div className="window-button" onClick={playErrorSound}>×</div>
            </div>
          </div>
          <div className="window-content">
            <h2>Project Archive</h2>
            <p>PROJECT INITIALIZATION COMPLETE ✓</p>
            <p>Found 4 project files in directory</p>
            
            <div className="project-list">
              <div className="project-item clickable" onClick={handleCheckersChessClick}>
                <div className="project-icon">🏁</div>
                <div className="project-details">
                  <h3>Checkers/Chess Fullstack Website</h3>
                  <p>Technologies: HTML, CSS, Javascript</p>
                  <p>Status: Completed</p>
                </div>
              </div>

              <div className="project-item clickable" onClick={handlePokePullClick}>
                <div className="project-icon">⚡</div>
                <div className="project-details">
                  <h3>PokéPull – Pokémon Collection App</h3>
                  <p>Technologies: React, PokéAPI</p>
                  <p>Status: Active Development</p>
                </div>
              </div>

              <div className="project-item clickable" onClick={handleRegionalCloudClick}>
                <div className="project-icon">🌤️</div>
                <div className="project-details">
                  <h3>Regional Cloud Weather Fullstack Website</h3>
                  <p>Technologies: Full Stack Development</p>
                  <p>Status: Completed</p>
                </div>
              </div>

              <div className="project-item clickable" onClick={handleHurdleWordleClick}>
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
        <div className="start-button" onClick={handleStartButtonClick}>Start</div>
        <div className="task-items">
          <div className="task-item" onClick={handleTaskbarAboutMe}>About_Me.exe</div>  
          <div className="task-item" onClick={handleTaskbarSkills}>Skills.exe</div>                  
          <div className="task-item" onClick={handleTaskbarProjects}>Projects.exe</div>
          <div className="task-item" onClick={handleTaskbarContact}>Contact.exe</div>
          <div 
            className={`task-item ${(!navigatorState.isVisible || navigatorState.isMinimized) ? 'minimized' : 'active'}`}
            onClick={handleTaskBarNavigatorClick}
          >
            Navigator.exe
          </div>
        </div>
        <div className="system-tray">
          {currentTime} | 🔊 ⚡ 📶
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default App