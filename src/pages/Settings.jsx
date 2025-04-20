
import React, { useEffect, useState } from 'react';
import './Settings.css'; 

const Settings = () => {
    const [darkMode, setDarkMode] = useState(() => {
      
        return localStorage.getItem("theme") === "dark";
    });

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.body.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    return (
        <div style={{ padding: "2rem" }}>
            <h2>Settings</h2>
            <button
                onClick={() => setDarkMode(!darkMode)}
                style={{
                    padding: '10px 20px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    background: darkMode ? '#444' : '#ddd',
                    color: darkMode ? '#fff' : '#000',
                    border: 'none',
                    borderRadius: '8px',
                    marginTop: '20px'
                }}
            >
                {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>
        </div>
    );
};

export default Settings;

