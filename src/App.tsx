import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Connect from './pages/Connect'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import Credentials from './pages/Credentials'
import NFTIdentity from './pages/NFTIdentity'
import Verifier from './pages/Verifier'
import CreateDID from './pages/CreateDID'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/connect" element={<Connect />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/credentials" element={<Credentials />} />
        <Route path="/nft-identity" element={<NFTIdentity />} />
        <Route path="/verifier" element={<Verifier />} />
        <Route path="/create-did" element={<CreateDID />} />
      </Routes>
    </Layout>
  )
}

export default App