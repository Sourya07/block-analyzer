import React, { useEffect, useState } from 'react';
import ReactFlow, { Node, Edge } from 'react-flow-renderer';
import axios from 'axios';

const AddressGraph: React.FC = () => {
    const [nodes, setNodes] = useState<Node[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);

    useEffect(() => {
        const address = '0x4838B106FCe9647Bdf1E7877BF73cE8B0BAD5f97';

        axios
            .get(`http://localhost:3000/api/graph-data`, {
                params: { address }
            })
            .then((res) => {
                const { nodes: apiNodes, edges: apiEdges } = res.data;

                // Find entry nodes (no incoming edges)
                const entryNodeIds = apiNodes
                    .filter((n: any) => !apiEdges.some((e: any) => e.target === n.id))
                    .map((n: any) => n.id);

                // Find exit nodes (no outgoing edges)
                const exitNodeIds = apiNodes
                    .filter((n: any) => !apiEdges.some((e: any) => e.source === n.id))
                    .map((n: any) => n.id);

                const styledNodes: Node[] = apiNodes.map((node: any, index: number) => ({
                    ...node,
                    position: { x: 200 + (index % 5) * 150, y: 100 + Math.floor(index / 5) * 150 },
                    style: {
                        padding: 10,
                        borderRadius: 12,
                        color: '#fff',
                        background:
                            entryNodeIds.includes(node.id)
                                ? '#00ff00' // green = entry
                                : exitNodeIds.includes(node.id)
                                    ? '#ff0000' // red = exit
                                    : '#1f2937', // normal connected
                        border: '2px solid #fff',
                        boxShadow: '0 0 10px rgba(0,0,0,0.5)',
                        fontSize: 12,
                        textAlign: 'center',
                    },
                    data: { label: node.id },
                }));

                const styledEdges: Edge[] = apiEdges.map((edge: any) => ({
                    ...edge,
                    animated: true,
                    style: { stroke: '#888', strokeWidth: 2 },
                    markerEnd: { type: 'arrowclosed', color: '#888' },
                }));

                setNodes(styledNodes);
                setEdges(styledEdges);
            })
            .catch((err) => {
                console.error('Failed to fetch graph data:', err);
            });
    }, []);

    return (
        <div className="w-full h-screen bg-slate-900">
            <ReactFlow nodes={nodes} edges={edges} fitView />
        </div>
    );
};

export default AddressGraph;
export { };
