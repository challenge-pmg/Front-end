import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Sobre from './pages/Sobre' // ADICIONE ESTA LINHA
import FAQ from './pages/FAQ'
import Integrantes from './pages/Integrantes'
import Contato from './pages/Contato'
import { AuthProvider, useAuth } from './context/AuthContext'
import Login from './pages/Login'
import PatientDashboard from './pages/dashboard/PatientDashboard'
import ProfessionalDashboard from './pages/dashboard/ProfessionalDashboard'
import ConsultaDetail from './pages/dashboard/ConsultaDetail'
import { fetchJson } from './services/api'

const ApiWarmup: React.FC = () => {
  useEffect(() => {
    fetchJson('/hello', {}, { requireAuth: false, retries: 0 }).catch(() => {
      // Ignora falhas: será tentado novamente quando o usuário fizer ações reais
    })
  }, [])
  return null
}

const RequireAuth: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { user } = useAuth()
  if (!user) {
    return <Navigate to="/login" replace />
  }
  return children
}

const DashboardRouter: React.FC = () => {
  const { user } = useAuth()
  if (!user) {
    return <Navigate to="/login" replace />
  }
  if (user.role === 'PROFISSIONAL') {
    return <ProfessionalDashboard />
  }
  return <PatientDashboard />
}

export default function App(){
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
        <ApiWarmup />
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/sobre" element={<Sobre/>} /> {/* ADICIONE ESTA ROTA */}
            <Route path="/faq" element={<FAQ/>} />
            <Route path="/integrantes" element={<Integrantes/>} />
            <Route path="/contato" element={<Contato/>} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <RequireAuth>
                  <DashboardRouter />
                </RequireAuth>
              }
            />
            <Route
              path="/consultas/:id"
              element={
                <RequireAuth>
                  <ConsultaDetail />
                </RequireAuth>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  )
}
