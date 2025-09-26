import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Addresses from './pages/Addresses';
import Investigations from './pages/Investigations';
import Analytics from './pages/Analytics';
import './App.css';
import Highrisk from './pages/Highrisk';
import AddressGraph from './pages/AddressGraph';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-900">
        <Sidebar />
        <div className="ml-64">
          <Header />
          <main className="p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/addresses" element={<Addresses />} />
              <Route path="/investigations" element={<Investigations />} />
              <Route path="/analytics" element={<Analytics />} />
              < Route path="/highrisk" element={<Highrisk />} />
              < Route path="/addressgraph" element={< AddressGraph />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
