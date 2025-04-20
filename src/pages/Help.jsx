import React from 'react';



import './Help.css'; 

const Help = () => {
    return (
        <div className="help-page">
            <h1>How This Gemini Clone Works</h1>

            <ol>
                <li><strong>Project Structure:</strong> The app is modular with components for Sidebar, Main, and pages like Help, Activity, and Settings.</li>

                <li><strong>Routing:</strong> Using <code>react-router-dom</code>, the app supports client-side routing. The main routes are defined in <code>App.jsx</code>.</li>

                <li><strong>Sidebar:</strong> Always visible on the left. Contains navigation links (Help, Activity, Settings). Uses <code>useNavigate</code> or <code>Link</code> for routing.</li>

                <li><strong>Main Page:</strong> This is the default homepage loaded at the <code>/</code> route. It handles input, mic/file uploads, and chat responses.</li>

                <li><strong>Dynamic Chat:</strong> The <code>Context API</code> shares chat state (like input, response, loading) between components.</li>

                <li><strong>Dark Mode Toggle:</strong> Available in Settings. It dynamically updates the page's theme using a CSS class toggle.</li>

                <li><strong>Routing Persistence:</strong> When you click links, the Main area (right side) updates without refreshing the sidebar.</li>

                <li><strong>Responsive Design:</strong> The sidebar collapses on smaller screens. Main page content adjusts accordingly using Flexbox and CSS rules.</li>
            </ol>
        </div>
    );
};

export default Help;


