import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export const Preloader = () => {
    return (
        <Box sx={{ display: 'flex' , alignItems: 'center', justifyContent: 'center', height:'80vh'}}>
            <CircularProgress size={100} />
        </Box>
    );
}