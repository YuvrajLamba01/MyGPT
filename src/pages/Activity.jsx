import React from 'react';


import './Activity.css'; 

const Activity = () => {
    return (
        <div className="activity-page">
            <h1>Activity & Usage Logs</h1>

            <p>This section is designed to show your past interactions and prompt history inside the Gemini clone. While it's currently static, it can be extended to support:</p>

            <ul>
                <li>⏱️ Viewing your recent prompts and AI responses.</li>
                <li>💾 Saving favorite or important conversations.</li>
                <li>🧠 Tracking usage trends, like frequent queries.</li>
                <li>🔄 Resending or editing previous prompts.</li>
            </ul>

            <h2>How It Will Work (Planned Features):</h2>
            <ol>
                <li><strong>Prompt Logging:</strong> Each time you submit a prompt, it will be stored in localStorage or a database.</li>
                <li><strong>Activity Feed:</strong> Show a timeline of prompts with timestamps and results.</li>
                <li><strong>Search:</strong> You can search past prompts or filter them by date/topic.</li>
            </ol>

            <h2>Current State:</h2>
            <p>
                Right now, your most recent prompt is stored temporarily using the Context API. Once the logging feature is implemented, all your prompts will appear here automatically.
            </p>
        </div>
    );
};

export default Activity;
