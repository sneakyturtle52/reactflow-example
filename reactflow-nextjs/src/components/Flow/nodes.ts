import { JoinNodeType, SourceNodeType } from "./types";

const joinNodes: JoinNodeType[] = [{
    id: 'join-1',
    type: 'join',
    data: {
        joinType: 'inner',
        leftColumn: '',
        rightColumn: '',
    },
    position: { x: 350, y: 0 },
},
{
    id: 'join-2',
    type: 'join',
    data: {
        joinType: 'left',
        leftColumn: '',
        rightColumn: '',
    },
    position: { x: 700, y: 0 },
}]

const sourceNodes: SourceNodeType[] = [
    {
        id: 'person',
        type: 'source',
        data: {
            sourceName: 'person',
            columnNames: ['id', 'first_name', 'last_name', 'birth_date', 'height']
        },
        position: { x: 0, y: 0 },
    },
    {
        id: 'employee',
        type: 'source',
        data: {
            sourceName: 'employee',
            columnNames: ['id', 'salary']
        },
        position: { x: 400, y: 300 },
    },
    {
        id: 'PM',
        type: 'source',
        data: {
            sourceName: 'PM',

            columnNames: ['id', 'experience']
        },
        position: { x: 100, y: 350 },
    },
];

export const initialNodes = [
    ...sourceNodes,
    ...joinNodes,
]