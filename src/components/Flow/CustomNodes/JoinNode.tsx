import * as React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { Autocomplete, CardContent, Divider, Grid, List, ListItem, TextField } from '@mui/material';
import { JoinType } from '../types';
import { Handle, Position } from 'reactflow';
import { handleStyle } from './SourceColumn';
import { useStore } from '../store';

const JoinNodeColumn = ({ nodeId, name, side }: { nodeId: string, name: string, side: 'left' | 'right' }) => {
    return (
        <ListItem key={`${nodeId} ${side}`} sx={{ height: '5' }}>
            <Handle
                id={`${side}-join`}
                type='target'
                position={Position.Left}
                style={{ ...handleStyle, background: '#a4ebdd' }}
            /><Typography>{name !== '' ? name : 'none selected'}</Typography>
        </ListItem>
    )
}

export type JoinNodeParams = {
    joinType: JoinType, leftColumn: string, rightColumn: string
}

export const JoinNode = ({ id, data: { joinType, leftColumn, rightColumn } }: { id: string, data: JoinNodeParams }) => {
    const { changeJoinType } = useStore();

    return (
        <Card sx={{ padding: 0, minWidth: 275 }}>
            <CardContent sx={{ padding: 0, paddingBottom: 0 }}>
                <Grid container sx={{ padding: 1, backgroundColor: 'rgb(244, 198, 112)' }}>
                    <Grid item xs={7}>
                        <Typography sx={{ fontWeight: 'bold' }}>{joinType} join</Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <Autocomplete options={['left', 'inner', 'right'] as JoinType[]} value={joinType}
                            renderInput={(params) => <TextField {...params} variant="standard" />}
                            clearIcon={null} onChange={(event) => changeJoinType(id, event.target.innerText)}
                        />
                    </Grid>
                </Grid>
                <List>
                    <Divider />
                    <JoinNodeColumn nodeId={id} name={leftColumn} side="left" />
                    <Divider />
                    <JoinNodeColumn nodeId={id} name={rightColumn} side="right" />
                    <ListItem sx={{ direction: 'rtl' }}>
                        <Typography >output</Typography>
                        <Handle
                            id='output'
                            type='source'
                            position={Position.Right}
                            style={{ ...handleStyle, background: '#f6e75a' }}
                        />
                    </ListItem>
                </List>
            </CardContent>
        </Card >
    );
}