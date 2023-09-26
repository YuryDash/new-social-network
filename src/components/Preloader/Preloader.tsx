import * as React from 'react';
import {FC} from 'react';
import CircularProgress from '@mui/material/CircularProgress';

type Props = {
    top?: string
    right?: string
    bottom?: string
    left?: string
}

export const Preloader:FC<Props> = ({bottom,left,right,top}) => {
    return (
        <div style={{position: "fixed", top: top, left: left, right:right, bottom: bottom, width: "100%"}}>
            <CircularProgress size={100}/>
        </div>
    );
}