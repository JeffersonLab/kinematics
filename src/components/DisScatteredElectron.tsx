import React from 'react';
import { Stage, Layer, Arrow } from 'react-konva';

const DisScatteredElectron: React.FC = () => {
    // Example data for scattered electron vectors
    const vectors = [
        { x: 150, y: 200, angle: 30 },
        { x: 250, y: 200, angle: 45 },
        { x: 350, y: 200, angle: 60 },
    ];

    return (
        <Stage width={window.innerWidth} height={window.innerHeight - 64}>
            <Layer>
                {vectors.map((vector, index) => {
                    const length = 100;
                    const angleRad = (vector.angle * Math.PI) / 180;
                    const x2 = vector.x + length * Math.cos(angleRad);
                    const y2 = vector.y - length * Math.sin(angleRad); // Y-axis inverted in canvas

                    return (
                        <Arrow
                            key={index}
                            points={[vector.x, vector.y, x2, y2]}
                            pointerLength={10}
                            pointerWidth={10}
                            fill="green"
                            stroke="green"
                            strokeWidth={4}
                        />
                    );
                })}
            </Layer>
        </Stage>
    );
};

export default DisScatteredElectron;
