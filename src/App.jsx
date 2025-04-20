
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import Main from "./components/Main/Main.jsx";
import Help from './pages/Help.jsx';
import Activity from './pages/Activity.jsx';
import Settings from './pages/Settings.jsx';

const App = () => {
    return (
        <Router>
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <div style={{ flex: 1 }}>
                    <Routes>
                        <Route path="/" element={<Main />} />
                        <Route path="/help" element={<Help />} />
                        <Route path="/activity" element={<Activity />} />
                        <Route path="/settings" element={<Settings />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;

