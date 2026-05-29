
import React from 'react'
import { Routes, Route } from 'react-router'
import { MainLayout } from './layouts/MainLayout'
import { Dashboard } from './components/pages/Dashboard'
import { Ordenes } from './components/pages/Ordenes'
import { OrdeneDetalle } from './components/pages/OrdeneDetalle'
import { LaptopDetalle } from './components/pages/LaptopDetalle'
import { Escuelas } from './components/pages/Escuelas'

export const NetAdminApp = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/ordenes" element={<Ordenes />} />
        <Route path="/ordenes/:id" element={<OrdeneDetalle />} />
        <Route path="/ordenes/:id/laptops/:laptopId" element={<LaptopDetalle />} />
        <Route path="/escuelas" element={<Escuelas />} />
      </Route>
    </Routes>
  )
}

