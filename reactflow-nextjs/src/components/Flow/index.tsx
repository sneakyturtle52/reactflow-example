import React, { useCallback, useRef } from 'react';
import ReactFlow, {
  Connection,
  Edge,
  MiniMap,
  Background,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { SourceNode } from './CustomNodes/SourceNode';
import { JoinNode } from './CustomNodes/JoinNode';
import { useStore } from './store';

const nodeTypes = {
  source: SourceNode,
  join: JoinNode
};

const defaultEdgeOptions = {
  markerEnd: { type: MarkerType.ArrowClosed, color: '#222222' },
  deletable: true,
  style: {
    stroke: '#222222',
  }
};

const connectionLineStyle = {
  stroke: 'black'
}

export const Flow = () => {
  const { nodes, edges, removeEdge, updateEdge, onConnect, onNodesChange, onEdgesChange } = useStore()

  // ----- some functions to delete edge when pulled away from node -----
  const edgeUpdateSuccessful = useRef(true);

  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgeUpdate = useCallback((oldEdge: Edge, newConnection: Connection) => {
    edgeUpdateSuccessful.current = true;
    updateEdge(oldEdge, newConnection);
  }, [updateEdge]);

  const onEdgeUpdateEnd = useCallback((_: MouseEvent, edge: Edge) => {
    if (!edgeUpdateSuccessful.current) {
      removeEdge(edge.id);
    }

    edgeUpdateSuccessful.current = true;
  }, [removeEdge]);

  return (
    <ReactFlow
      nodes={nodes}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      edges={edges}
      defaultEdgeOptions={defaultEdgeOptions}
      onEdgesChange={onEdgesChange}
      connectionLineStyle={connectionLineStyle}
      onConnect={onConnect}
      onEdgeUpdate={onEdgeUpdate}
      onEdgeUpdateStart={onEdgeUpdateStart}
      onEdgeUpdateEnd={onEdgeUpdateEnd}
      fitView
    >
      <Background color='#333333' />
      <MiniMap zoomable pannable />
    </ReactFlow>
  );
}
