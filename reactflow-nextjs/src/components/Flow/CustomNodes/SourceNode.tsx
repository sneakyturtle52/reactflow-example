import * as React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { CardContent, Divider, List } from '@mui/material';
import { SourceColumn } from './SourceColumn';


export type SourceNodeParams = { sourceName: string, columnNames: string[] }

export const SourceNode = ({ data: { sourceName, columnNames } }: { data: SourceNodeParams }) => {

    return (
        <Card sx={{ padding: 0, minWidth: 275 }}>
            <CardContent sx={{ padding: 0, paddingBottom: 0 }}>
                <Typography sx={{ fontWeight: 'bold', padding: 1 }}>{sourceName}</Typography>
                <List>
                    {
                        columnNames.map(columnName => {
                            return (
                                <>
                                    <Divider />
                                    <SourceColumn columnName={columnName} sourceName={sourceName} />
                                </>
                            )
                        })
                    }
                </List>
            </CardContent>
        </Card >
    );
}