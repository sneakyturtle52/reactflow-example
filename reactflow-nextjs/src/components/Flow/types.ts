import { Node } from "reactflow";
import { JoinNodeParams } from "./CustomNodes/JoinNode";
import { SourceNodeParams } from "./CustomNodes/SourceNode";

export type JoinType = 'left' | 'inner' | 'right'

export type JoinNodeType = Node<JoinNodeParams>

export type SourceNodeType = Node<SourceNodeParams>