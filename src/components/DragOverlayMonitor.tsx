// DragOverlayMonitor.tsx
import React from 'react';
import { useDndMonitor } from '@dnd-kit/core';

interface DragOverlayMonitorProps {
  pointerCoordinates: React.MutableRefObject<{ x: number; y: number } | null>;
}

const DragOverlayMonitor: React.FC<DragOverlayMonitorProps> = ({ pointerCoordinates }) => {
  useDndMonitor({
    onDragMove(event) {
      const { activatorEvent } = event;
      const pointerEvent = activatorEvent as PointerEvent;
      pointerCoordinates.current = {
        x: pointerEvent.clientX,
        y: pointerEvent.clientY,
      };
    },
  });

  return null; // This component doesn't render anything
};

export default DragOverlayMonitor;
