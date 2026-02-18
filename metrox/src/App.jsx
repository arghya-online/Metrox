import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Calculators from './pages/Calculators';
import Analysis from './pages/Analysis';
import Theory from './pages/Theory';
import Introduction from './pages/theory/Introduction';
import LinearMeasurements from './pages/theory/LinearMeasurements';
import AngularMeasurements from './pages/theory/AngularMeasurements';
import LimitsFits from './pages/theory/LimitsFits';
import SurfaceMetrology from './pages/theory/SurfaceMetrology';
import Interferometry from './pages/theory/Interferometry';
import ErrorCalculator from './calculators/ErrorCalculator';
import ToleranceCalculator from './calculators/ToleranceCalculator';
import LeastCountCalculator from './calculators/LeastCountCalculator';
import ThreadWireCalculator from './calculators/ThreadWireCalculator';
import GearToothCalculator from './calculators/GearToothCalculator';
import Reference from './pages/Reference';
import SineBarCalculator from './calculators/SineBarCalculator';
import SlipGaugeBuilder from './calculators/SlipGaugeBuilder';
import ObservationGenerator from './calculators/ObservationGenerator';
import UnitConverter from './calculators/UnitConverter';
import PWAPrompt from './components/PWAPrompt';
import GDTReference from './pages/reference/GDTReference';
import ISOFits from './pages/reference/ISOFits';
import Instruments from './pages/reference/Instruments';
import { ThemeProvider } from './context/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <PWAPrompt />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="calculators" element={<Calculators />} />
            <Route path="calculators/error" element={<ErrorCalculator />} />
            <Route path="calculators/tolerance" element={<ToleranceCalculator />} />
            <Route path="calculators/least-count" element={<LeastCountCalculator />} />
            <Route path="calculators/thread-wire" element={<ThreadWireCalculator />} />
            <Route path="calculators/gear-tooth" element={<GearToothCalculator />} />
            <Route path="calculators/sine-bar" element={<SineBarCalculator />} />
            <Route path="calculators/slip-gauge" element={<SlipGaugeBuilder />} />
            <Route path="calculators/lab-table" element={<ObservationGenerator />} />
            <Route path="calculators/unit-converter" element={<UnitConverter />} />
            <Route path="analysis" element={<Analysis />} />
            <Route path="theory" element={<Theory />} />
            <Route path="theory/introduction" element={<Introduction />} />
            <Route path="theory/linear" element={<LinearMeasurements />} />
            <Route path="theory/angular" element={<AngularMeasurements />} />
            <Route path="theory/limits-fits" element={<LimitsFits />} />
            <Route path="theory/surface" element={<SurfaceMetrology />} />
            <Route path="theory/interferometry" element={<Interferometry />} />
            <Route path="reference" element={<Reference />} />
            <Route path="reference/gdt" element={<GDTReference />} />
            <Route path="reference/iso-fits" element={<ISOFits />} />
            <Route path="reference/instruments" element={<Instruments />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
