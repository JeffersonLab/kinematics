import React from 'react';
import TopMenu from './components/TopMenu';
// import DisScatteredElectron from './components/DisScatteredElectron';
import DisVisualization from "./components/DisVisualization.tsx";

const App: React.FC = () => {
    return (
        <>
            <TopMenu />
            <DisVisualization />
        </>
    );
};

export default App;
