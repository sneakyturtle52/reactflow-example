import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Handle, Position } from 'reactflow';
import { ListItem } from '@mui/material';
import { CSSProperties } from '@mui/styled-engine';

export const handleStyle: CSSProperties = {
    height: '100%',
    width: 15,
    border: '0px',
    borderRadius: '0'
}

export const SourceColumn = ({ sourceName, columnName }: { sourceName: string, columnName: string }) => {

    return (
        <ListItem sx={{ width: '100%' }} key={`${sourceName}.${columnName}`}>
            <Typography>{columnName}</Typography>
            <Handle
                id={columnName}
                type='source'
                position={Position.Right}
                style={{ ...handleStyle, background: '#f6e75a' }}
            />
        </ListItem>
    );
}
