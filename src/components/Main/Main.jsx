import React, { useContext, useEffect, useRef, useState } from 'react';
import './Main.css';
import { assets } from '../../assets/assets.js';
import { Context } from '../../context/Context.jsx';

const Main = () => {
  const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);
  const resultRef = useRef(null);
  const [showUserForm, setShowUserForm] = useState(false);
  const [userData, setUserData] = useState({
    name: localStorage.getItem('userName') || '',
    email: localStorage.getItem('userEmail') || '',
  });

  const recognitionRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleMicClick = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Web Speech API not supported in this browser.');
      return;
    }

    if (!recognitionRef.current) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event) => {
        const speechResult = event.results[0][0].transcript;
        setInput(speechResult);
      };

      recognition.onerror = (event) => {
        alert('Speech recognition error: ' + event.error);
      };

      recognitionRef.current = recognition;
    }

    recognitionRef.current.start();
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => setInput(e.target.result);
    reader.onerror = () => alert('Failed to read file!');
    reader.readAsText(file);
  };

  const handleUserFormSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('userName', userData.name);
    localStorage.setItem('userEmail', userData.email);
    setShowUserForm(false);
  };

  useEffect(() => {
    if (resultRef.current) {
      resultRef.current.scrollTop = resultRef.current.scrollHeight;
    }
  }, [resultData]);

  return (
    <main className="main">
      <nav className="nav">
        <p>Gemini</p>
        <img
          src={assets.user_icon}
          alt="User"
          onClick={() => setShowUserForm(true)}
          style={{ cursor: 'pointer' }}
        />
      </nav>

      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, {userData.name ? userData.name : 'User'}</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              {[
                {
                  text: 'Suggest beautiful places to see on an upcoming road trip',
                  icon: assets.compass_icon,
                },
                {
                  text: 'Briefly summarize this concept: urban planning',
                  icon: assets.bulb_icon,
                },
                {
                  text: 'Brainstorm team bonding activities for our work retreat',
                  icon: assets.message_icon,
                },
                {
                  text: 'Tell me about React js and React native',
                  icon: assets.code_icon,
                },
              ].map((card, index) => (
                <div
                  key={index}
                  className="card"
                  onClick={() => {
                    setInput(card.text);
                    onSent();
                  }}
                >
                  <p>{card.text}</p>
                  <img src={card.icon} alt="" />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="result" ref={resultRef}>
            <div className="result-title">
              <img src={assets.user_icon} alt="User" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img className="result-data-icon" src={assets.gemini_icon} alt="Gemini" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <textarea
              onChange={(e) => setInput(e.target.value)}
              onKeyUp={(e) => e.key === 'Enter' && onSent()}
              value={input}
              placeholder="Ask Gemini"
            />
            <div className="icon-container">
              <button onClick={() => fileInputRef.current.click()} aria-label="Upload file">
                <img src={assets.gallery_icon} alt="Upload file" />
              </button>
              <button onClick={handleMicClick} aria-label="Voice input">
                <img src={assets.mic_icon} alt="Voice input" />
              </button>
              <button onClick={() => onSent()} aria-label="Send">
                <img src={assets.send_icon} alt="Send" />
              </button>
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so double-check its responses.{' '}
            <a href="#">Your privacy and Gemini Apps</a>
          </p>
          <input
            type="file"
            accept=".txt,.doc,.docx,.md,.json"
            style={{ display: 'none' }}
            ref={fileInputRef}
            onChange={handleFileUpload}
          />
        </div>
      </div>

      {showUserForm && (
        <div className="user-form-popup">
          <div className="user-form-content">
            <button
              className="close-btn"
              onClick={() => setShowUserForm(false)}
              aria-label="Close form"
            >
              ✕
            </button>
            <h3>User Profile</h3>
            <form onSubmit={handleUserFormSubmit}>
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  value={userData.name}
                  onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                  placeholder="Enter your name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email (optional)</label>
                <input
                  type="email"
                  id="email"
                  value={userData.email}
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  placeholder="Enter your email"
                />
              </div>
              <button type="submit" className="submit-btn">
                Save Preferences
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default Main;