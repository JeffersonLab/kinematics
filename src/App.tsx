import React from 'react';
import TopMenu from './components/TopMenu';
// import DisVisualization from "./components/DisVisualization.tsx";
import DisExplained from './texts/dis_kinematics.mdx';
import { MDXProvider } from '@mdx-js/react';

// This needs to be imported like this for LaTex to work
import 'katex/dist/katex.min.css';

const App: React.FC = () => {
    return (
        <>
            <TopMenu/>
            <div style={{maxWidth: '800px', margin: '0 auto', padding: '1rem'}}>
                <MDXProvider>
                    <DisExplained/>
                </MDXProvider>
            </div>
        </>
    );
};

export default App;
