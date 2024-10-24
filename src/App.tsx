import React from 'react';
import TopMenu from './components/TopMenu';
// import DisScatteredElectron from './components/DisScatteredElectron';
import DisVisualization from "./components/DisVisualization.tsx";
import DisExplained from './texts/dis_explained.mdx';
import { MDXProvider } from '@mdx-js/react';
import 'katex/dist/katex.min.css';

const App: React.FC = () => {
    return (
        <>
            <TopMenu/>
            <DisVisualization/>
            <div style={{maxWidth: '800px', margin: '0 auto', padding: '1rem'}}>
                <MDXProvider>
                    <DisExplained/>
                </MDXProvider>
            </div>
        </>
    );
};

export default App;
