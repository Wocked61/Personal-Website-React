import React, { useState, useEffect } from 'react'
import { Rnd } from 'react-rnd'
import Footer from './Footer.jsx'
import './App.css'
import '@hackernoon/pixel-icon-library/fonts/iconfont.css'
import csufLogo from './assets/csuf-logo.png'
import moveScrollSound from './assets/move_scroll.mp3'
import closeWindowSound from './assets/close_Window.mp3'
import openWindowSound from './assets/Open_Window.mp3'
import enlargeWindowSound from './assets/enlarge_Window.mp3'
import minimizeWindowSound from './assets/minimize_Window.mp3'
import errorSound from './assets/Error.wav'
import loadingSound from './assets/loading.mp3'
import bgmSound from './assets/bgm.mp3'
import projectClickSound from './assets/Project_Click.wav'
import textSound from './assets/text.wav'
import meowSound from './assets/meow.mp3'
import achievementSound from './assets/acheivement.mp3'
import sadgeKitty from './assets/sadge_Kitty.png'
import omgKitty from './assets/omg_Kitty.png'

function App() {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('INITIALIZING SYSTEM...');
  const [loadingAudio, setLoadingAudio] = useState(null);
  const [bgmAudio, setBgmAudio] = useState(null);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [showAudioPrompt, setShowAudioPrompt] = useState(false);
  const [showVolumeSettings, setShowVolumeSettings] = useState(false);
  const [bgmVolume, setBgmVolume] = useState(0.1);
  const [isMuted, setIsMuted] = useState(false);
  const [aboutMeLoading, setAboutMeLoading] = useState(true);
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [visitorCount, setVisitorCount] = useState(0);
  const [uniqueVisitors, setUniqueVisitors] = useState(0);
  const [discordStatus, setDiscordStatus] = useState('offline');
  const [showSoundNotification, setShowSoundNotification] = useState(false);
  const [achievements, setAchievements] = useState(() => {
    // Load achievements from localStorage
    const savedAchievements = localStorage.getItem('portfolio_achievements');
    return savedAchievements ? JSON.parse(savedAchievements) : {
      settingsExplorer: false,
      projectViewer: false,
      windowMaster: false,
      speedRunner: false,
      timeWaster: false,
      nightOwl: false,
      catLover: false,
      persistent: false,
      socialButterfly: false
    };
  });
  const [showAchievements, setShowAchievements] = useState([]);
  const [unlockedAchievements, setUnlockedAchievements] = useState(() => {
    // Load unlocked achievements from localStorage
    const savedUnlocked = localStorage.getItem('portfolio_unlocked_achievements');
    return savedUnlocked ? JSON.parse(savedUnlocked) : [];
  });
  const [visitorCounterState, setVisitorCounterState] = useState({
    isVisible: true,
    isMinimized: false,
    isMaximized: false,
    isAnimating: false,
    position: { x: 1450, y: 150 },
    size: { width: 360, height: 220 },
    savedPosition: { x: 1450, y: 150 },
    savedSize: { width: 360, height: 220 }
  });
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
    setNavigatorState(prev => ({
      ...prev,
      savedPosition: {
        x: prev.position.x,
        y: prev.position.y - window.scrollY
      }
    }));
  }, []);

  // Visitor tracking system
  useEffect(() => {
    const trackVisitor = () => {
      const totalVisits = parseInt(localStorage.getItem('portfolio_total_visits') || '0');
      const newTotalVisits = totalVisits + 1;
      localStorage.setItem('portfolio_total_visits', newTotalVisits.toString());
      setVisitorCount(newTotalVisits);
      
      console.log(`📊 Total visits: ${newTotalVisits}`);

      const sessionTracked = sessionStorage.getItem('portfolio_session_tracked');
      
      // Generate a unique visitor ID if one doesn't exist
      let visitorId = localStorage.getItem('portfolio_visitor_id');
      if (!visitorId) {
        visitorId = 'visitor_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('portfolio_visitor_id', visitorId);
        console.log('🆔 New visitor ID created:', visitorId);
      }

      const uniqueVisitorsData = JSON.parse(localStorage.getItem('portfolio_unique_visitors') || '[]');
      
      if (!sessionTracked) {
        // Check if this is a unique visitor
        if (!uniqueVisitorsData.includes(visitorId)) {
          const newUniqueVisitors = [...uniqueVisitorsData, visitorId];
          localStorage.setItem('portfolio_unique_visitors', JSON.stringify(newUniqueVisitors));
          setUniqueVisitors(newUniqueVisitors.length);
          
          console.log('👥 New unique visitor detected!');
        } else {
          setUniqueVisitors(uniqueVisitorsData.length);
          console.log('👥 Returning unique visitor');
        }
        
        // Mark this session as tracked for unique visitors
        sessionStorage.setItem('portfolio_session_tracked', 'true');
      } else {
        // Just set the current unique visitor count
        setUniqueVisitors(uniqueVisitorsData.length);
        console.log('👥 Session already tracked for unique visitors');
      }
    };

    trackVisitor();
  }, []);

  // Discord status fetching
  useEffect(() => {
    const fetchDiscordStatus = () => {
      fetch('https://api.lanyard.rest/v1/users/235600317939449856')
        .then(res => res.json())
        .then(data => {
          if (data.success && data.data && data.data.discord_status) {
            setDiscordStatus(data.data.discord_status);
          }
        })
        .catch(error => {
          console.log('Failed to fetch Discord status:', error);
          setDiscordStatus('offline');
        });
    };

    fetchDiscordStatus();
    const interval = setInterval(fetchDiscordStatus, 10000); // every 10 seconds
    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
    const initializeAudio = async () => {

      const loadingAudioInstance = new Audio(loadingSound);
      loadingAudioInstance.volume = 0.4;
      setLoadingAudio(loadingAudioInstance);
      
      const bgmAudioInstance = new Audio(bgmSound);
      bgmAudioInstance.volume = 0.1;
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
        }, 1000);
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

  useEffect(() => {
    if (bgmAudio) {
      bgmAudio.volume = isMuted ? 0 : bgmVolume;
    }
  }, [bgmAudio, bgmVolume, isMuted]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showVolumeSettings && !event.target.closest('.volume-settings-popup') && !event.target.closest('.volume-controls-area')) {
        setShowVolumeSettings(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showVolumeSettings]);

  // About Me loading and typing effect
  useEffect(() => {
    if (!isLoading) {
      //About Me loading sequence after main loading is complete
      const aboutMeTimer = setTimeout(() => {
        setAboutMeLoading(false);
        setIsTyping(true);
        
        // The text content to type out
        const textLines = [
          "Profile: Dylan Phan",
          "",
          "Hello! I'm Dylan — a curious and driven CS student who builds interactive, stylish websites with a creative twist. Whether it's a checkers app or a Pokémon collector, I aim to merge code with personality.",
          "",
          "Status: Senior Computer Science Student @ CSUF",
          "",
          "Interests: Web Development, Gaming, Technology",
          "",
          "Current Project: React Portfolio with NSO Aesthetic"
        ];

        let currentLineIndex = 0;
        let currentCharIndex = 0;
        let displayLines = [];
        
        const playTextSound = () => {
          try {
            const audio = new Audio(textSound);
            audio.volume = 0.1;
            audio.play().catch(error => {
              console.log('Text audio play failed:', error);
            });
          } catch (error) {
            console.log('Text audio creation failed:', error);
          }
        };
        
        const typeText = () => {
          if (currentLineIndex < textLines.length) {
            const currentLine = textLines[currentLineIndex];
            
            if (currentCharIndex < currentLine.length) {
              if (currentLine[currentCharIndex] !== ' ' || currentCharIndex > 0) {
                playTextSound();
              }
              
              displayLines[currentLineIndex] = currentLine.slice(0, currentCharIndex + 1);
              setTypedText(displayLines.join('\n'));
              currentCharIndex++;
              setTimeout(typeText, 15);
            } else {
              displayLines[currentLineIndex] = currentLine;
              currentLineIndex++;
              currentCharIndex = 0;
              setTimeout(typeText, 100);
            }
          } else {
            setIsTyping(false);
          }
        };
        
        typeText();
      }, 2000); 
      
      return () => clearTimeout(aboutMeTimer);
    }
  }, [isLoading]);

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

  const playMeowSound = () => {
    try {
      const audio = new Audio(meowSound);
      audio.volume = 0.8;
      audio.play().catch(error => {
        console.log('Meow audio play failed:', error);
      });
      
      // Cat lover achievement
      console.log('😸 Cat Whisperer achievement triggered!');
      unlockAchievement('catLover');
    } catch (error) {
      console.log('Meow audio creation failed:', error);
    }
  };

  const playAchievementSound = () => {
    try {
      const audio = new Audio(achievementSound);
      audio.volume = 0.7;
      audio.play().catch(error => {
        console.log('Achievement audio play failed:', error);
      });
    } catch (error) {
      console.log('Achievement audio creation failed:', error);
    }
  };

  const handleVolumeChange = (newVolume) => {
    setBgmVolume(newVolume);
    if (bgmAudio) {
      bgmAudio.volume = isMuted ? 0 : newVolume;
    }
  };

  const handleMuteToggle = () => {
    playProjectClickSound();
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    if (bgmAudio) {
      bgmAudio.volume = newMutedState ? 0 : bgmVolume;
    }
  };

  const handleVolumeIconClick = () => {
    if (showVolumeSettings) {
      playCloseWindowSound();
    } else {
      playOpenWindowSound();
      // Settings Hacker achievement
      console.log('⚙️ Settings Hacker achievement triggered!');
      unlockAchievement('settingsExplorer');
    }
    setShowVolumeSettings(!showVolumeSettings);
  };

  const handleMinimize = () => {
    playMinimizeWindowSound();
    console.log('🎮 Window Wizard achievement triggered!');
    unlockAchievement('windowMaster'); // Window interaction achievement
    
    const navigatorElement = document.querySelector('.navigator-window');
    let viewportRelativePosition;
    
    if (navigatorElement) {
      const rect = navigatorElement.getBoundingClientRect();
      viewportRelativePosition = {
        x: rect.left,
        y: rect.top
      };
    } else {
      const currentPosition = navigatorState.isMaximized ? navigatorState.savedPosition : navigatorState.position;
      viewportRelativePosition = {
        x: currentPosition.x,
        y: currentPosition.y - window.scrollY
      };
    }
    
    setNavigatorState(prev => ({
      ...prev,
      savedPosition: viewportRelativePosition,
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
    
    if (!navigatorState.isMaximized) {
      const viewportRelativePosition = {
        x: navigatorState.position.x,
        y: navigatorState.position.y - window.scrollY
      };
      
      setNavigatorState(prev => ({
        ...prev,
        isMaximized: true,
        isMinimized: false,
        savedPosition: viewportRelativePosition,
        savedSize: prev.size
      }));
    } else {
      const viewportPosition = {
        x: navigatorState.savedPosition.x,
        y: navigatorState.savedPosition.y + window.scrollY
      };
      
      setNavigatorState(prev => ({
        ...prev,
        isMaximized: false,
        isMinimized: false,
        position: viewportPosition,
        size: prev.savedSize
      }));
    }
  };

  const handleClose = () => {
    playCloseWindowSound();
    
    const navigatorElement = document.querySelector('.navigator-window');
    let viewportRelativePosition;
    
    if (navigatorElement) {
      const rect = navigatorElement.getBoundingClientRect();
      viewportRelativePosition = {
        x: rect.left,
        y: rect.top
      };
    } else {
      const currentPosition = navigatorState.isMaximized ? navigatorState.savedPosition : navigatorState.position;
      viewportRelativePosition = {
        x: currentPosition.x,
        y: currentPosition.y - window.scrollY
      };
    }
    
    setNavigatorState(prev => ({
      ...prev,
      savedPosition: viewportRelativePosition,
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
      
      const viewportPosition = {
        x: navigatorState.savedPosition.x,
        y: navigatorState.savedPosition.y + window.scrollY
      };
      
      setNavigatorState(prev => ({
        ...prev,
        isVisible: true,
        isMinimized: false,
        position: viewportPosition,
        size: prev.savedSize
      }));
    } else if (navigatorState.isMinimized) {
      playOpenWindowSound();
      
      const viewportPosition = {
        x: navigatorState.savedPosition.x,
        y: navigatorState.savedPosition.y + window.scrollY
      };
      
      setNavigatorState(prev => ({
        ...prev,
        isMinimized: false,
        position: viewportPosition,
        size: prev.savedSize
      }));
    } else {
      playCloseWindowSound();
      
      const navigatorElement = document.querySelector('.navigator-window');
      let viewportRelativePosition;
      
      if (navigatorElement) {
        const rect = navigatorElement.getBoundingClientRect();
        viewportRelativePosition = {
          x: rect.left,
          y: rect.top
        };
      } else {
        const currentPosition = navigatorState.isMaximized ? navigatorState.savedPosition : navigatorState.position;
        viewportRelativePosition = {
          x: currentPosition.x,
          y: currentPosition.y - window.scrollY
        };
      }
      
      setNavigatorState(prev => ({
        ...prev,
        savedPosition: viewportRelativePosition,
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
    
    // Social butterfly achievement
    console.log('🦋 Social Butterfly achievement triggered!');
    unlockAchievement('socialButterfly');
    
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
    playProjectClickSound();
    window.open('https://wocked61.github.io/cpsc_362_sp2025_group2/', '_blank');
  }

  const handlePortfolioClick = () => {
    playProjectClickSound();
    console.log('🎉 You clicked on the portfolio you\'re already viewing! How meta! 🤔');
    unlockAchievement('projectViewer'); // Give them the project viewer achievement
  }

  const handlePokePullClick = () => {
    playProjectClickSound();
    window.open('https://wocked61.github.io/PokePull/', '_blank');
  }

  const handleRegionalCloudClick = () => {
    playProjectClickSound();
    window.open('https://wocked61.github.io/cpsc-349-project/', '_blank');
  }

  const handleHurdleWordleClick = () => {
    playProjectClickSound();
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

  // Discord status helpers
  const getDiscordStatusColor = (status) => {
    switch (status) {
      case 'online': return '#43b581';
      case 'idle': return '#faa61a';
      case 'dnd': return '#f04747';
      case 'offline': return '#747f8d';
      default: return '#747f8d';
    }
  };

  const getDiscordStatusText = (status) => {
    switch (status) {
      case 'online': return 'ONLINE';
      case 'idle': return 'AWAY';
      case 'dnd': return 'BUSY';
      case 'offline': return 'OFFLINE';
      default: return 'OFFLINE';
    }
  };


  const getSafeWindowPosition = (windowWidth, windowHeight, preferredX = null, preferredY = null) => {
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    

    const defaultX = preferredX !== null ? preferredX : Math.max(20, (viewportWidth - windowWidth) / 2);
    const defaultY = preferredY !== null ? preferredY : Math.max(20, (viewportHeight - windowHeight) / 2);
    
    let safeY = Math.min(defaultY, viewportHeight - windowHeight - 50);
    let safeX = Math.min(defaultX, viewportWidth - windowWidth - 20);
    

    if (defaultX > viewportWidth - windowWidth) {
      safeX = viewportWidth - windowWidth - 20;
    }
    

    const finalX = Math.max(20, safeX);
    const finalY = Math.max(20, safeY);
    
    return { x: finalX, y: finalY };
  };


  const handleVisitorCounterMinimize = () => {
    playMinimizeWindowSound();
    
    const visitorCounterElement = document.querySelector('.visitor-counter-window');
    let viewportRelativePosition;
    
    if (visitorCounterElement) {
      const rect = visitorCounterElement.getBoundingClientRect();
      viewportRelativePosition = {
        x: rect.left,
        y: rect.top
      };
    } else {
      const currentPosition = visitorCounterState.isMaximized ? visitorCounterState.savedPosition : visitorCounterState.position;
      viewportRelativePosition = {
        x: currentPosition.x,
        y: currentPosition.y - window.scrollY
      };
    }
    
    setVisitorCounterState(prev => ({
      ...prev,
      savedPosition: viewportRelativePosition,
      savedSize: prev.isMaximized ? prev.savedSize : prev.size,
      isAnimating: true
    }));

    setTimeout(() => {
      setVisitorCounterState(prev => ({
        ...prev,
        isMinimized: true,
        isAnimating: false,
        isMaximized: false
      }));
    }, 300);
  };

  const handleVisitorCounterMaximize = () => {
    playEnlargeWindowSound();
    
    if (!visitorCounterState.isMaximized) {
      const viewportRelativePosition = {
        x: visitorCounterState.position.x,
        y: visitorCounterState.position.y - window.scrollY
      };
      
      setVisitorCounterState(prev => ({
        ...prev,
        isMaximized: true,
        isMinimized: false,
        savedPosition: viewportRelativePosition,
        savedSize: prev.size
      }));
    } else {
      const viewportPosition = {
        x: visitorCounterState.savedPosition.x,
        y: visitorCounterState.savedPosition.y + window.scrollY
      };
      
      setVisitorCounterState(prev => ({
        ...prev,
        isMaximized: false,
        isMinimized: false,
        position: viewportPosition,
        size: prev.savedSize
      }));
    }
  };

  const handleVisitorCounterClose = () => {
    playCloseWindowSound();
    
    const visitorCounterElement = document.querySelector('.visitor-counter-window');
    let viewportRelativePosition;
    
    if (visitorCounterElement) {
      const rect = visitorCounterElement.getBoundingClientRect();
      viewportRelativePosition = {
        x: rect.left,
        y: rect.top
      };
    } else {
      const currentPosition = visitorCounterState.isMaximized ? visitorCounterState.savedPosition : visitorCounterState.position;
      viewportRelativePosition = {
        x: currentPosition.x,
        y: currentPosition.y - window.scrollY
      };
    }
    
    setVisitorCounterState(prev => ({
      ...prev,
      savedPosition: viewportRelativePosition,
      savedSize: prev.isMaximized ? prev.savedSize : prev.size,
      isAnimating: true
    }));

    setTimeout(() => {
      setVisitorCounterState(prev => ({
        ...prev,
        isVisible: false,
        isMinimized: false,
        isAnimating: false,
        isMaximized: false
      }));
    }, 300);
  };

  const handleTaskBarVisitorCounterClick = () => {
    if (!visitorCounterState.isVisible) {
      playOpenWindowSound();
      
      const viewportPosition = {
        x: visitorCounterState.savedPosition.x,
        y: visitorCounterState.savedPosition.y + window.scrollY
      };
      
      setVisitorCounterState(prev => ({
        ...prev,
        isVisible: true,
        isMinimized: false,
        position: viewportPosition,
        size: prev.savedSize
      }));
    } else if (visitorCounterState.isMinimized) {
      playOpenWindowSound();
      
      const viewportPosition = {
        x: visitorCounterState.savedPosition.x,
        y: visitorCounterState.savedPosition.y + window.scrollY
      };
      
      setVisitorCounterState(prev => ({
        ...prev,
        isMinimized: false,
        position: viewportPosition,
        size: prev.savedSize
      }));
    } else {
      playCloseWindowSound();
      
      const visitorCounterElement = document.querySelector('.visitor-counter-window');
      let viewportRelativePosition;
      
      if (visitorCounterElement) {
        const rect = visitorCounterElement.getBoundingClientRect();
        viewportRelativePosition = {
          x: rect.left,
          y: rect.top
        };
      } else {
        const currentPosition = visitorCounterState.isMaximized ? visitorCounterState.savedPosition : visitorCounterState.position;
        viewportRelativePosition = {
          x: currentPosition.x,
          y: currentPosition.y - window.scrollY
        };
      }
      
      setVisitorCounterState(prev => ({
        ...prev,
        savedPosition: viewportRelativePosition,
        savedSize: prev.isMaximized ? prev.savedSize : prev.size,
        isAnimating: true
      }));

      setTimeout(() => {
        setVisitorCounterState(prev => ({
          ...prev,
          isVisible: false,
          isMinimized: false,
          isAnimating: false,
          isMaximized: false
        }));
      }, 300);
    }
  };

  // Show sound notification after loading is complete
  useEffect(() => {
    if (!isLoading && audioEnabled) {
      const timer = setTimeout(() => {
        setShowSoundNotification(true);
        // Auto-hide after 10 seconds
        setTimeout(() => {
          setShowSoundNotification(false);
        }, 10000);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isLoading, audioEnabled]);

  const handleCloseSoundNotification = () => {
    playCloseWindowSound();
    setShowSoundNotification(false);
  };

  // Achievement definitions
  const achievementData = {
    settingsExplorer: {
      title: "Settings Hacker",
      description: "Found the secret settings! You're so smart! 🤓",
      icon: "⚙️",
      rarity: "uncommon"
    },
    projectViewer: {
      title: "Project Stalker",
      description: "Checking out my work? I'm flattered! 💕",
      icon: "👀",
      rarity: "common"
    },
    windowMaster: {
      title: "Window Wizard",
      description: "Playing with my windows? You're having fun! 🪟",
      icon: "🎮",
      rarity: "uncommon"
    },
    speedRunner: {
      title: "Lightning Fast",
      description: "Wow, you're going through everything so quickly! ⚡",
      icon: "🏃‍♀️",
      rarity: "rare"
    },
    timeWaster: {
      title: "Time Well Spent",
      description: "You've been here for 5 minutes! Taking your time, I see! ⏰",
      icon: "🕰️",
      rarity: "common"
    },
    nightOwl: {
      title: "Night Owl",
      description: "Browsing my portfolio past midnight? Dedication! 🦉",
      icon: "🌙",
      rarity: "uncommon"
    },
    catLover: {
      title: "Cat Whisperer",
      description: "You made the kitty meow! You're definitely a cat person! 🐱",
      icon: "😸",
      rarity: "common"
    },
    persistent: {
      title: "Persistent Visitor",
      description: "This is your 10th visit! You really like this place! 🔄",
      icon: "💪",
      rarity: "rare"
    },
    socialButterfly: {
      title: "Social Butterfly",
      description: "Clicked on contact info! Let's be friends! 🦋",
      icon: "📞",
      rarity: "common"
    }
  };

  // Achievement unlock function
  const unlockAchievement = (achievementKey) => {
    console.log(`🏆 Attempting to unlock achievement: ${achievementKey}`);
    console.log(`Current achievement status:`, achievements[achievementKey]);
    
    // Check if achievement is already unlocked
    if (!achievements[achievementKey]) {
      console.log(`✅ Unlocking achievement: ${achievementKey}`);
      
      // Play achievement sound
      playAchievementSound();
      
      const newAchievements = { ...achievements, [achievementKey]: true };
      const newUnlockedList = [...unlockedAchievements, achievementKey];
      
      setAchievements(newAchievements);
      setUnlockedAchievements(newUnlockedList);
      
      localStorage.setItem('portfolio_achievements', JSON.stringify(newAchievements));
      localStorage.setItem('portfolio_unlocked_achievements', JSON.stringify(newUnlockedList));
      
      // Add achievement to the display queue
      setShowAchievements(prev => [...prev, achievementKey]);
      
      // Auto-hide achievement after 5 seconds
      setTimeout(() => {
        setShowAchievements(prev => prev.filter(key => key !== achievementKey));
      }, 5000);
    } else {
      console.log(`❌ Achievement ${achievementKey} already unlocked`);
    }
  };

  /* 
   * Development utility for testing achievements:
   * Run this in browser console to reset all achievements:
   * 
   * localStorage.removeItem('portfolio_achievements');
   * localStorage.removeItem('portfolio_unlocked_achievements');
   * localStorage.removeItem('portfolio_total_visits');
   * localStorage.removeItem('portfolio_visitor_id');
   * localStorage.removeItem('portfolio_unique_visitors');
   * sessionStorage.removeItem('portfolio_session_tracked');
   * location.reload();
   * 
   * Or use the global function: window.resetAchievements()
   * 
   * Available achievements:
   * - Settings Hacker ⚙️ - Click volume settings icon
   * - Project Stalker 👀 - Scroll to projects section  
   * - Window Wizard 🎮 - Minimize/maximize/close windows
   * - Lightning Fast 🏃‍♀️ - Fast scroll through content
   * - Time Waster 🕰️ - Stay on site for 5 minutes
   * - Night Owl 🌙 - Visit between midnight and 6am
   * - Cat Whisperer 😸 - Click the meowing kitty
   * - Persistent Visitor 💪 - Visit the site 10+ times
   * - Social Butterfly 🦋 - Scroll to contact section
   */

  // Add reset function to window for easy testing
  useEffect(() => {
    window.resetAchievements = () => {
      localStorage.removeItem('portfolio_achievements');
      localStorage.removeItem('portfolio_unlocked_achievements');
      localStorage.removeItem('portfolio_total_visits');
      localStorage.removeItem('portfolio_visitor_id');
      localStorage.removeItem('portfolio_unique_visitors');
      sessionStorage.removeItem('portfolio_session_tracked');
      console.log('🏆 All achievements and visitor data reset! Reloading page...');
      location.reload();
    };
    
    window.checkAchievements = () => {
      console.log('🏆 Current achievements:', achievements);
      console.log('📊 Current visitor count:', visitorCount);
      console.log('👥 Current unique visitors:', uniqueVisitors);
      console.log('🕒 Current hour:', new Date().getHours());
    };
    
    // Test function for multiple achievements
    window.testMultipleAchievements = () => {
      console.log('🧪 Testing multiple achievements...');
      const testAchievements = ['settingsExplorer', 'projectViewer', 'windowMaster', 'catLover', 'socialButterfly'];
      testAchievements.forEach((achievement, index) => {
        setTimeout(() => {
          unlockAchievement(achievement);
        }, index * 200); // Stagger the achievements slightly
      });
    };
    
    // Test function for all achievements
    window.testAllAchievements = () => {
      console.log('🎯 Testing all achievements...');
      const allAchievements = Object.keys(achievementData);
      allAchievements.forEach((achievement, index) => {
        setTimeout(() => {
          unlockAchievement(achievement);
        }, index * 300); // Stagger more for better visual effect
      });
    };
  }, [achievements, visitorCount, uniqueVisitors]);

  // Scroll tracking for achievements
  useEffect(() => {
    let scrollCount = 0;
    let lastScrollTime = Date.now();
    let hasScrolledToProjects = false;
    let hasTriggeredSpeedRunner = false; // Add flag to prevent multiple speed runner achievements

    const handleScroll = () => {
      scrollCount++;
      const currentTime = Date.now();
      
      // Speed runner achievement (fast scrolling) - only trigger once
      if (currentTime - lastScrollTime < 100 && scrollCount >= 10 && !hasTriggeredSpeedRunner) {
        hasTriggeredSpeedRunner = true; // Set flag to prevent multiple triggers
        console.log('⚡ Lightning Fast achievement triggered!');
        unlockAchievement('speedRunner');
      }
      
      // Check if user scrolled to projects section
      const projectsSection = document.querySelector('#projects-section');
      if (projectsSection) {
        const rect = projectsSection.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0 && !hasScrolledToProjects) {
          hasScrolledToProjects = true;
          console.log('👀 Project Stalker achievement triggered!');
          unlockAchievement('projectViewer');
        }
      }
      
      lastScrollTime = currentTime;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [achievements]);

  // Time-based and visit-based achievements
  useEffect(() => {
    // Night owl achievement (after midnight)
    const currentHour = new Date().getHours();
    if (currentHour >= 0 && currentHour < 6) {
      console.log('🌙 Night Owl achievement triggered!');
      unlockAchievement('nightOwl');
    }

    // Time waster achievement (after 5 minutes)
    const timeWasterTimer = setTimeout(() => {
      console.log('🕰️ Time Waster achievement triggered!');
      unlockAchievement('timeWaster');
    }, 5 * 60 * 1000); // 5 minutes

    // Persistent visitor achievement (10+ visits)
    const totalVisits = parseInt(localStorage.getItem('portfolio_total_visits') || '0');
    if (totalVisits >= 10) {
      console.log('💪 Persistent Visitor achievement triggered!');
      unlockAchievement('persistent');
    }

    return () => {
      clearTimeout(timeWasterTimer);
    };
  }, []);

  // Handle window resize to keep draggable windows in bounds
  useEffect(() => {
    const handleWindowResize = () => {
      // Constrain navigator window
      setNavigatorState(prev => {
        if (prev.isVisible && !prev.isMaximized) {
          const maxX = window.innerWidth - prev.size.width;
          const maxY = window.innerHeight - prev.size.height;
          
          const constrainedX = Math.max(0, Math.min(prev.position.x, maxX));
          const constrainedY = Math.max(0, Math.min(prev.position.y, maxY));
          
          if (constrainedX !== prev.position.x || constrainedY !== prev.position.y) {
            return {
              ...prev,
              position: { x: constrainedX, y: constrainedY }
            };
          }
        }
        return prev;
      });

      // Constrain visitor counter window
      setVisitorCounterState(prev => {
        if (prev.isVisible && !prev.isMaximized) {
          const maxX = window.innerWidth - prev.size.width;
          const maxY = window.innerHeight - prev.size.height;
          
          const constrainedX = Math.max(0, Math.min(prev.position.x, maxX));
          const constrainedY = Math.max(0, Math.min(prev.position.y, maxY));
          
          if (constrainedX !== prev.position.x || constrainedY !== prev.position.y) {
            return {
              ...prev,
              position: { x: constrainedX, y: constrainedY }
            };
          }
        }
        return prev;
      });
    };

    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

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
      {/* Sound Settings Notification */}
      {showSoundNotification && (
        <div className="sound-notification">
          <div className="notification-cat">
            <img 
              src={sadgeKitty} 
              alt="Cute cat" 
              className="cat-image clickable" 
              onClick={playMeowSound}
              title="Click me! 🐱"
            />
          </div>
          <div className="sound-notification-content">
            <div className="sound-notification-header">
              <span>SYSTEM TIP</span>
              <button 
                className="sound-notification-close" 
                onClick={handleCloseSoundNotification}
                title="Close notification"
              >
                ×
              </button>
            </div>
            <div className="sound-notification-body">
              <div className="notification-text">
                <p>Hey! You can adjust the sound settings right here!</p>
                <p>Click the volume icon (🔊) below to customize audio levels.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Achievement Notifications */}
      {showAchievements.length > 0 && (
        <div className="achievement-notifications-container">
          {showAchievements.map((achievementKey, index) => (
            <div key={achievementKey} className="achievement-notification" style={{ top: `${20 + index * 160}px` }}>
              <div className="achievement-window">
                <div className="achievement-title-bar">
                  <div className="achievement-window-title">
                    <span className="achievement-icon-small">🏆</span>
                    ACHIEVEMENT UNLOCKED
                  </div>
                  <div className="achievement-window-controls">
                    <button 
                      className="achievement-close-btn" 
                      onClick={() => setShowAchievements(prev => prev.filter(key => key !== achievementKey))}
                    >
                      ×
                    </button>
                  </div>
                </div>
                <div className="achievement-window-content">
                  <div className="achievement-cat-container">
                    <img src={omgKitty} alt="Excited cat" className="achievement-cat-image" />
                  </div>
                  <div className="achievement-info">
                    <div className="achievement-details-header">
                      <div className="achievement-emoji">{achievementData[achievementKey]?.icon}</div>
                      <div className={`achievement-rarity-badge ${achievementData[achievementKey]?.rarity}`}>
                        {achievementData[achievementKey]?.rarity?.toUpperCase()}
                      </div>
                    </div>
                    <div className="achievement-name">{achievementData[achievementKey]?.title}</div>
                    <div className="achievement-description">{achievementData[achievementKey]?.description}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Desktop Icons Container with Window Border - Now Draggable/Resizable */}
      {navigatorState.isVisible && !navigatorState.isMinimized && (
        <Rnd
          position={navigatorState.isMaximized ? { x: 0, y: 0 } : navigatorState.position}
          size={navigatorState.isMaximized ? { width: window.innerWidth, height: window.innerHeight - 40 } : navigatorState.size}
          onDragStop={(e, d) => {
            if (!navigatorState.isMaximized) {
              const viewportRelativePosition = {
                x: d.x,
                y: d.y - window.scrollY
              };
              
              setNavigatorState(prev => ({
                ...prev,
                position: { x: d.x, y: d.y },
                savedPosition: viewportRelativePosition
              }));
            }
          }}
          onResizeStop={(e, direction, ref, delta, position) => {
            if (!navigatorState.isMaximized) {
              const viewportRelativePosition = {
                x: position.x,
                y: position.y - window.scrollY
              };
              
              setNavigatorState(prev => ({
                ...prev,
                size: { width: ref.style.width, height: ref.style.height },
                position,
                savedPosition: viewportRelativePosition
              }));
            }
          }}
          minWidth={200}
          minHeight={150}
          dragHandleClassName="window-title-area"
          className={`desktop-icons-rnd ${navigatorState.isAnimating ? 'minimizing' : ''}`}
          style={{
            position: 'fixed',
            zIndex: 100
          }}
          disableDragging={navigatorState.isMaximized || navigatorState.isAnimating}
          enableResizing={!navigatorState.isMaximized && !navigatorState.isAnimating}
        >
          <div className="desktop-icons-window navigator-window">
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

      {/* Visitor Counter Window */}
      {visitorCounterState.isVisible && !visitorCounterState.isMinimized && (
        <Rnd
          position={visitorCounterState.isMaximized ? { x: 0, y: 0 } : visitorCounterState.position}
          size={visitorCounterState.isMaximized ? { width: window.innerWidth, height: window.innerHeight - 40 } : visitorCounterState.size}
          onDragStop={(e, d) => {
            if (!visitorCounterState.isMaximized) {
              const viewportRelativePosition = {
                x: d.x,
                y: d.y - window.scrollY
              };
              
              setVisitorCounterState(prev => ({
                ...prev,
                position: { x: d.x, y: d.y },
                savedPosition: viewportRelativePosition
              }));
            }
          }}
          onResizeStop={(e, direction, ref, delta, position) => {
            if (!visitorCounterState.isMaximized) {
              const viewportRelativePosition = {
                x: position.x,
                y: position.y - window.scrollY
              };
              
              setVisitorCounterState(prev => ({
                ...prev,
                size: { width: ref.style.width, height: ref.style.height },
                position,
                savedPosition: viewportRelativePosition
              }));
            }
          }}
          minWidth={200}
          minHeight={120}
          dragHandleClassName="window-title-area"
          className={`desktop-icons-rnd ${visitorCounterState.isAnimating ? 'minimizing' : ''}`}
          style={{
            position: 'fixed',
            zIndex: 99
          }}
          disableDragging={visitorCounterState.isMaximized || visitorCounterState.isAnimating}
          enableResizing={!visitorCounterState.isMaximized && !visitorCounterState.isAnimating}
        >
          <div className="desktop-icons-window visitor-counter-window">
            <div className="window-header">
              <span className="window-title-area">VisitorTracker.exe</span>
              <div className="window-controls">
                <div className="window-button" onClick={handleVisitorCounterMinimize}>−</div>
                <div className="window-button" onClick={handleVisitorCounterMaximize}>□</div>
                <div className="window-button" onClick={handleVisitorCounterClose}>×</div>
              </div>
            </div>
            <div className="visitor-counter-content">
              <div className="visitor-stats">
                <h3>SITE ANALYTICS</h3>
                <div className="stat-line">
                  <span className="stat-label">Total Visits:</span>
                  <span className="stat-value">{visitorCount.toLocaleString()}</span>
                </div>
                <div className="stat-line">
                  <span className="stat-label">Unique Visitors:</span>
                  <span className="stat-value">{uniqueVisitors.toLocaleString()}</span>
                </div>
              </div>
              <div className="visitor-footer">
                <small>📊 CLIENT-SIDE TRACKING</small>
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
          <span 
            style={{
              color: getDiscordStatusColor(discordStatus),
              textShadow: `0 0 3px ${getDiscordStatusColor(discordStatus)}`,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}
            title={`Discord Status: ${discordStatus}`}
          >
            <span 
              style={{
                display: 'inline-block',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: getDiscordStatusColor(discordStatus),
                boxShadow: `0 0 4px ${getDiscordStatusColor(discordStatus)}`
              }}
            />
            STATUS: {getDiscordStatusText(discordStatus)}
          </span> | USER: DYLAN_PHAN
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
            {aboutMeLoading ? (
              <div className="profile-loading">
                <p>INITIALIZING USER DATA...</p>
                <p className="loading-text">Loading profile: Dylan Phan</p>
              </div>
            ) : (
              <div className="profile-content">
                <p>USER DATA LOADED SUCCESSFULLY ✓</p>
                <div className="typed-content">
                  {typedText.split('\n').map((line, index) => {
                    if (line.startsWith('Status: Senior Computer Science Student @ CSUF')) {
                      return (
                        <div key={index} className="status-line">
                          <div className="status-text">
                            <span>{line}</span>
                          </div>
                          <img src={csufLogo} alt="CSUF Logo" className="csuf-logo" />
                        </div>
                      );
                    }
                    return <p key={index}>{line}</p>;
                  })}
                  {isTyping && <span className="typing-cursor">|</span>}
                </div>
                {!isTyping && (
                  <div className="chat-message">
                    System: Welcome to my website! I'm passionate about creating innovative web experiences and bringing creative visions to life through code.
                  </div>
                )}
              </div>
            )}
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
            <p>Found 5 project files in directory</p>
            
            <div className="project-list">
              <div className="project-item clickable" onClick={handlePortfolioClick}>
                <div className="project-icon">
                  <img src="Port_Icon.png" alt="Portfolio Icon" className="project-icon-image" />
                </div>
                <div className="project-details">
                  <h3>Interactive React Portfolio Website</h3>
                  <p>Technologies: React, CSS, Audio API</p>
                  <p>Status: You're looking at it!</p>
                </div>
              </div>

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
          <div 
            className={`task-item ${(!visitorCounterState.isVisible || visitorCounterState.isMinimized) ? 'minimized' : 'active'}`}
            onClick={handleTaskBarVisitorCounterClick}
          >
            VisitorTracker.exe
          </div>
        </div>
        <div className="system-tray">
          {currentTime} | 
          <span 
            className="volume-controls-area clickable" 
            onClick={handleVolumeIconClick}
            title="Volume Settings"
          >
            {isMuted ? '🔇' : '🔊'} ⚡ 📶
          </span>
          
          {/* Volume Settings Popup */}
          {showVolumeSettings && (
            <div className="volume-settings-popup">
              <div className="volume-popup-header">
                <span>Volume Settings</span>
                <button 
                  className="close-popup-btn"
                  onClick={() => {
                    playCloseWindowSound();
                    setShowVolumeSettings(false);
                  }}
                >
                  ×
                </button>
              </div>
              <div className="volume-controls">
                <div className="volume-control-row">
                  <span className="volume-label">BGM Volume:</span>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={bgmVolume}
                    onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                    className="volume-slider"
                  />
                  <span className="volume-value">{Math.round(bgmVolume * 100)}%</span>
                </div>
                <div className="mute-control-row">
                  <button 
                    className={`mute-btn ${isMuted ? 'muted' : ''}`}
                    onClick={handleMuteToggle}
                  >
                    {isMuted ? '🔇' : '🔊'} {isMuted ? 'Unmute' : 'Mute'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default App