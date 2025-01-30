'use client'
import { useLayout } from '@/context/LayoutContext';
import SalesManagement from '@/components/sales/SalesManagement';
import React, { useEffect } from 'react';

const DashboardPage: React.FC = () => {
  const { setToolbarTitle } = useLayout();

  useEffect(() => {
    setToolbarTitle('Compras')
  }, [setToolbarTitle])

  return (
    <SalesManagement />
  );
};

export default DashboardPage;
