import React from 'react';
    import Button from './components/Button';
    const App:React.FC = () => {
    return (
    <div style={{position: 'relative',width: '100vw', height: '100vh'}}>
    <div style={{position: 'absolute', left: 0, top: 0, width: 200, height: 100}}><Button /> </div>
    </div>
    )
    }