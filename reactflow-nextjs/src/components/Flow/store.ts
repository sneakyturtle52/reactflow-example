import { create } from 'zustand';
import {
    Connection,
    Edge,
    EdgeChange,
    Node,
    NodeChange,
    addEdge,
    OnNodesChange,
    OnEdgesChange,
    OnConnect,
    applyNodeChanges,
    applyEdgeChanges,
    updateEdge,
} from 'reactflow';

import { initialNodes } from './nodes';
import { initialEdges } from './edges';
import { JoinType } from './types';

type FlowState = {
    nodes: Node[];
    edges: Edge[];
    removeEdge: (edgeId: string) => void;
    updateEdge: (oldEdge: Edge, newConnection: Connection) => void;
    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;
    onConnect: OnConnect;
    changeJoinType: (joinNodeId: string, joinType: JoinType) => void;
};

// this is our useStore hook that we can use in our components to get parts of the store and call actions
export const useStore = create<FlowState>((set, get) => ({
    nodes: initialNodes,
    edges: initialEdges,
    removeEdge: (edgeId: string) => {
        set({
            edges: get().edges.filter(edge => edge.id !== edgeId)
        })
    },
    updateEdge: (oldEdge: Edge, newConnection: Connection) => {
        set({
            edges: updateEdge(oldEdge, newConnection, get().edges)
        })
    },
    onNodesChange: (changes: NodeChange[]) => {
        set({
            nodes: applyNodeChanges(changes, get().nodes),
        });
    },
    onEdgesChange: (changes: EdgeChange[]) => {
        set({
            edges: applyEdgeChanges(changes, get().edges),
        });
    },
    onConnect: (connection: Connection) => {
        set({
            edges: addEdge(connection, get().edges),
            nodes: get().nodes.map(node => {
                if (node.id === connection.target) {
                    if (connection.targetHandle === 'left-join') {
                        node.data = {
                            ...node.data,
                            leftColumn: `${connection.source}.${connection.sourceHandle}`
                        }
                    } else {
                        node.data = {
                            ...node.data,
                            rightColumn: `${connection.source}.${connection.sourceHandle}`
                        }
                    }
                }

                return node;
            }),
        });
    },
    changeJoinType: (joinNodeId: string, joinType: JoinType) => {
        set({
            nodes: get().nodes.map((node) => {
                if (node.id === joinNodeId) {
                    node.data = { ...node.data, joinType };
                }

                return node;
            }),
        });
    }
}));
