import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { ColorModeContext } from '../ThemeProvider';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '@mui/material/styles';

const TopMenu: React.FC = () => {
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);

    return (
        <>
            {/* AppBar */}
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        EIC DIS Visualization
                    </Typography>
                    <IconButton onClick={colorMode.toggleColorMode} color="inherit">
                        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton>
                </Toolbar>
            </AppBar>

            {/* GitHub Badge */}
            <div style={{ position: 'absolute', top: '70px', right: '16px', zIndex: 1000 }}>
                <a href="https://github.com/JeffersonLab/kinematics/" target={'_blank'}>
                    <img src="https://img.shields.io/badge/github-kinematics-blue?style=flat&logo=github"
                         alt="GitHub"
                         style={{ cursor: 'pointer' }} />
                </a>
            </div>
        </>
    );
};

export default TopMenu;
