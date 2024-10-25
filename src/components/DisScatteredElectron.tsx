import React, { useState, useEffect } from 'react';
import { Stage, Layer, Arrow, Text, Circle } from 'react-konva';
import {
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Slider,
    Typography,
    Box,
    SelectChangeEvent,
} from '@mui/material';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const DisScatteredElectron: React.FC = () => {
    // State variables
    const [E_e, setE_e] = useState(18);
    const [E_p, setE_p] = useState(275);
    const [x, setX] = useState(0.01);
    const [Q2, setQ2] = useState(10);
    const [thetaDeg, setThetaDeg] = useState<number | null>(null);
    const [thetaRad, setThetaRad] = useState<number | null>(null);
    const [unphysical, setUnphysical] = useState<string | null>(null);

    // Beam energy options
    const energyOptions = [
        { label: '275 × 18', value: '275,18' },
        { label: '275 × 10', value: '275,10' },
        { label: '100 × 10', value: '100,10' },
        { label: '100 × 5', value: '100,5' },
        { label: '41 × 5', value: '41,5' },
    ];

    // Update theta when inputs change
    useEffect(() => {
        // Calculate scattering angle θ
        const s = 4 * E_e * E_p;
        const y = Q2 / (x * s);

        // Check for physical kinematics
        if (y <= 0 || y >= 1) {
            setUnphysical('Unphysical (adjust x or Q²)');
            setThetaDeg(null);
            setThetaRad(null);
            return;
        }

        const denominator = 2 * E_e * E_e * (1 - Q2 / (4 * x * E_e * E_p));

        if (denominator <= 0 || isNaN(denominator)) {
            setUnphysical('Undefined (adjust x or Q²)');
            setThetaDeg(null);
            setThetaRad(null);
            return;
        }

        const cosTheta = 1 - Q2 / denominator;

        // Ensure cosTheta is in [-1, 1]
        if (cosTheta < -1 || cosTheta > 1 || isNaN(cosTheta)) {
            setUnphysical('Unphysical (adjust x or Q²)');
            setThetaDeg(null);
            setThetaRad(null);
            return;
        }

        const thetaRad = Math.acos(cosTheta);
        const thetaDeg = (thetaRad * 180) / Math.PI;
        setThetaRad(thetaRad);
        setThetaDeg(thetaDeg);
        setUnphysical(null);
    }, [E_e, E_p, x, Q2]);

    // Handle beam energy change
    const handleEnergyChange = (event: SelectChangeEvent) => {
        const value = event.target.value;
        const [newE_p, newE_e] = value.split(',').map(Number);
        setE_p(newE_p);
        setE_e(newE_e);
    };

    // Convert Q2 to log scale for the slider
    const [logQ2, setLogQ2] = useState(Math.log10(Q2));
    const [logBjorkenX, setLogBjorkenX] = useState(Math.log10(x));

    const handleQ2Change = (_: Event, newValue: number | number[]) => {
        const q2Value = Array.isArray(newValue) ? newValue[0] : newValue;
        setLogQ2(q2Value);
        setQ2(Math.pow(10, q2Value));
    };

    const handleBjorkenXChange = (_: Event, newValue: number | number[]) => {
        const xValue = Array.isArray(newValue) ? newValue[0] : newValue;
        setLogBjorkenX(xValue);
        setX(Math.pow(10, xValue));

    }

    return (
        <Box sx={{ padding: 2 }}>
            {/* Controls */}
            <Box sx={{ maxWidth: 400, margin: '0 auto' }}>
                <FormControl fullWidth sx={{ marginBottom: 2 }}>
                    <InputLabel id="energy-select-label">
                        Select Beam Energies (Eₚ × Eₑ) [GeV]
                    </InputLabel>
                    <Select
                        labelId="energy-select-label"
                        id="energy-select"
                        value={`${E_p},${E_e}`}
                        label="Select Beam Energies (Eₚ × Eₑ) [GeV]"
                        onChange={handleEnergyChange}
                        variant="outlined"
                    >
                        {energyOptions.map((option) => (
                            <MenuItem key={option.label} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* x Slider */}
                <Typography gutterBottom>
                    Bjorken Scaling Variable <InlineMath math="x" />: {x.toFixed(4)}
                </Typography>
                <Slider
                    value={logBjorkenX}
                    min={Math.log10(0.0001)}
                    max={Math.log10(1)}
                    step={0.0001}
                    onChange={handleBjorkenXChange}
                    sx={{ marginBottom: 2 }}
                />

                {/* Q² Slider (Logarithmic) */}
                <Typography gutterBottom>
                    Four-Momentum Transfer Squared <InlineMath math="Q^2" /> [GeV²]:{' '}
                    {Q2.toFixed(1)}
                </Typography>
                <Slider
                    value={logQ2}
                    min={Math.log10(0.1)}
                    max={Math.log10(1000)}
                    step={0.01}
                    onChange={handleQ2Change}
                    sx={{ marginBottom: 2 }}
                />
            </Box>

            {/* Values Display */}
            <Box sx={{ textAlign: 'center', marginTop: 2 }}>
                <Typography>
                    Eₚ = {E_p} GeV, Eₑ = {E_e} GeV
                </Typography>
                <Typography>
                    <InlineMath math="x" /> = {x.toFixed(4)}, <InlineMath math="Q^2" /> ={' '}
                    {Q2.toFixed(1)} GeV²
                </Typography>
                <Typography>
                    Scattering Angle <InlineMath math="\theta" /> ={' '}
                    {thetaDeg !== null ? `${thetaDeg.toFixed(2)} degrees` : unphysical}
                </Typography>
            </Box>

            {/* Visualization */}
            <Box
                sx={{
                    marginTop: 4,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Stage width={500} height={250}>
                    <Layer>
                        {/* Proton Beam (Left to Right) */}
                        <Arrow
                            points={[0, 200, 240, 200]}
                            pointerLength={10}
                            pointerWidth={10}
                            fill="red"
                            stroke="red"
                            strokeWidth={5 * (E_p / 275) + 5} // Adjust width based on energy
                        />
                        <Text text="Hadron" x={5} y={180} fill="red" />

                        {/* Electron Beam (Right to Left) */}
                        <Arrow
                            points={[500, 200, 255, 200]}
                            pointerLength={10}
                            pointerWidth={10}
                            fill="blue"
                            stroke="blue"
                            strokeWidth={5 * (E_e / 18) + 1} // Adjust width based on energy
                        />
                        <Text text="Electron" x={450} y={180} fill="blue" />

                        {/* Collision Point */}
                        <Circle x={250} y={200} radius={3} fill="black" />

                        {/* Scattered Electron */}
                        {thetaRad !== null ? (
                            <>
                                <Arrow
                                    points={[
                                        250,
                                        200,
                                        250 - 150 * Math.cos(thetaRad),
                                        200 - 150 * Math.sin(thetaRad),
                                    ]}
                                    pointerLength={10}
                                    pointerWidth={10}
                                    fill="green"
                                    stroke="green"
                                    strokeWidth={3}
                                />
                                <Text
                                    text="Scattered Electron"
                                    x={250 - 150 * Math.cos(thetaRad) + 10}
                                    y={200 - 150 * Math.sin(thetaRad) - 15}
                                    fill="green"
                                />
                            </>
                        ) : (
                            <Text
                                text="Adjust x and Q² for physical kinematics"
                                x={150}
                                y={50}
                                fill="black"
                            />
                        )}
                    </Layer>
                </Stage>
            </Box>
        </Box>
    );
};

export default DisScatteredElectron;
