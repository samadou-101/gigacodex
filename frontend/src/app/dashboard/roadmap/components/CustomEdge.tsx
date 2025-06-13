"use client";
import { BaseEdge, EdgeProps, getBezierPath } from "reactflow";

interface CustomEdgeProps extends EdgeProps {
  onClick?: (event: React.MouseEvent) => void;
}

export const CustomEdge = ({
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  onClick,
}: CustomEdgeProps) => {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  // Calculate the position for the circle
  const buttonX = (sourceX + targetX) / 2;
  const buttonY = (sourceY + targetY) / 2;

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      <g
        transform={`translate(${buttonX - 8}, ${buttonY - 8})`}
        className="cursor-pointer"
        onClick={onClick}
      >
        <circle
          r="8"
          className="fill-white dark:fill-slate-800 stroke-blue-500 dark:stroke-blue-400"
          strokeWidth="2"
        />
      </g>
    </>
  );
};
