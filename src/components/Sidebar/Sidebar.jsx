import React, { useContext, useState } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [extended, setExtended] = useState(false);
    const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);

    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt);
        await onSent(prompt);
    };

    const toggleSidebar = () => {
        setExtended((prev) => !prev);
    };

    return (
        <>
            <aside className={`sidebar ${extended ? 'extended' : 'collapsed'}`}>
                <div className={`top ${extended ? '' : 'centered'}`}>
                    <div className="menu" onClick={toggleSidebar}>
                        <img src={assets.menu_icon} alt="Menu Icon" />
                    </div>
                    <div onClick={() => newChat()} className="new-chat">
                        <img src={assets.plus_icon} alt="Plus Icon" />
                        <p className={`${extended ? 'block' : 'none'}`}>New Chat</p>
                    </div>
                    {extended ? (
                        <div className="recent">
                            <p className="recent-title">Recent</p>
                            {prevPrompts.map((item, index) => (
                                <div
                                    key={index}
                                    onClick={() => loadPrompt(item)}
                                    className="recent-entry"
                                >
                                    <img src={assets.message_icon} alt="Message Icon" />
                                    <p className="recent-entry-p">{item.slice(0, 18)} ...</p>
                                </div>
                            ))}
                        </div>
                    ) : null}
                </div>
                <div className={`bottom ${extended ? '' : 'centered'}`}>
                    <Link to="/help" className="bottom-item recent-entry">
                        <img src={assets.question_icon} alt="Question Icon" />
                        <p className={`fade ${extended ? 'block' : 'none'}`}>Help</p>
                    </Link>
                    <Link to="/activity" className="bottom-item recent-entry">
                        <img src={assets.history_icon} className="history-icon" alt="History Icon" />
                        <p className={`fade ${extended ? 'block' : 'none'}`}>Activity</p>
                    </Link>
                    <Link to="/settings" className="bottom-item recent-entry">
                        <img src={assets.setting_icon} alt="Settings Icon" />
                        <p className={`fade ${extended ? 'block' : 'none'}`}>Settings</p>
                    </Link>
                </div>
            </aside>
            <div
                className={`overlay ${extended ? 'visible' : 'hidden'}`}
                onClick={toggleSidebar}
            ></div>
            <button
                className="mobile-menu-toggle"
                onClick={toggleSidebar}
                aria-label="Toggle Sidebar"
            >
                <img src={assets.menu_icon} alt="Menu Toggle" />
            </button>
        </>
    );
};

export default Sidebar;
