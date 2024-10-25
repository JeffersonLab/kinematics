# Interactive EIC Kinematics Visualization

[![GitHub](https://img.shields.io/badge/github-kinematics-blue?style=flat&logo=github)](https://github.com/JeffersonLab/kinematics/)


Explore the interactive visualization directly at:   

&rArr; [JeffersonLab.github.io/kinematics](https://jeffersonlab.github.io/kinematics/) 	&lArr;



This project is a demo of **interactive illustration** of kinematics in the Electron-Ion Collider (EIC), focusing on deep inelastic scattering (DIS) with scattered electron visualization. The application provides dynamic controls to adjust kinematic variables such as the electron and proton beam energies, the Bjorken scaling variable \(x\), and the four-momentum transfer squared \(Q^2\).

[![DIS Kinematics](https://github.com/JeffersonLab/kinematics/blob/main/public/DisVisualization.gif?raw=true)](https://jeffersonlab.github.io/kinematics/)

## Features

- Visualize electron and proton beams and their interactions.
- Dynamically adjust beam energies, \(x\), and \(Q^2\).
- Scattered electron trajectories shown based on kinematic input.

## Getting Started

Follow these instructions to set up and run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/JeffersonLab/kinematics.git
cd kinematics
```

### 2. Install Dependencies

Ensure you have Node.js installed, then run:

```bash
npm install
```

### 3. Run the Development Server

Start the development server with:

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

### 4. Build for Production

To build the project for deployment:

```bash
npm run build
```

### 5. Deploy to GitHub Pages

The project is configured to automatically deploy to GitHub Pages via GitHub Actions on the `main` branch. You can access the deployed project at:

[https://jeffersonlab.github.io/kinematics/](https://jeffersonlab.github.io/kinematics/)
