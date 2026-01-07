/**
 * Status Indicator - Shape Components
 * SVG shape components for different status shapes
 */

import React from 'react';
import { StatusShape } from './types';

// ============================================================================
// SHAPE PROPS INTERFACE
// ============================================================================

export interface ShapeProps {
  size: number;
  color: string;
  outline?: string;
}

// ============================================================================
// INDIVIDUAL SHAPE COMPONENTS
// ============================================================================

export const CircleShape: React.FC<ShapeProps> = ({ size, color, outline }) => (
  <svg width={size} height={size} viewBox="0 0 16 16">
    <circle cx="8" cy="8" r="7" fill={color} stroke={outline} strokeWidth={outline ? 1.5 : 0} />
  </svg>
);

export const SquareShape: React.FC<ShapeProps> = ({ size, color, outline }) => (
  <svg width={size} height={size} viewBox="0 0 16 16">
    <rect x="2" y="2" width="12" height="12" rx="2" fill={color} stroke={outline} strokeWidth={outline ? 1.5 : 0} />
  </svg>
);

export const DiamondShape: React.FC<ShapeProps> = ({ size, color, outline }) => (
  <svg width={size} height={size} viewBox="0 0 16 16">
    <rect 
      x="3" y="3" width="10" height="10" rx="1" 
      fill={color} stroke={outline} strokeWidth={outline ? 1.5 : 0}
      transform="rotate(45 8 8)"
    />
  </svg>
);

export const TriangleShape: React.FC<ShapeProps> = ({ size, color, outline }) => (
  <svg width={size} height={size} viewBox="0 0 16 16">
    <path 
      d="M8 2L14 14H2L8 2Z" 
      fill={color} stroke={outline} strokeWidth={outline ? 1.5 : 0}
      strokeLinejoin="round"
    />
  </svg>
);

export const HexagonShape: React.FC<ShapeProps> = ({ size, color, outline }) => (
  <svg width={size} height={size} viewBox="0 0 16 16">
    <polygon 
      points="8,1 14,4.5 14,11.5 8,15 2,11.5 2,4.5" 
      fill={color} stroke={outline} strokeWidth={outline ? 1.5 : 0}
    />
  </svg>
);

// ============================================================================
// SHAPE COMPONENT MAP
// ============================================================================

export const ShapeComponents: Record<StatusShape, React.FC<ShapeProps>> = {
  circle: CircleShape,
  square: SquareShape,
  diamond: DiamondShape,
  triangle: TriangleShape,
  hexagon: HexagonShape,
};
