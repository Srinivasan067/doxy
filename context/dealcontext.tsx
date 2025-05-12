"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';

export type Deal = {
  id: string;
  dealName: string;
  dealDescription: string;
  dealType: string;
  dealStage: string;
  dealValue: number;
  currency: string;
  expectedCloseDate: string; // Date format
  probabilityOfClose: number; // Percentage
  clientName: string;
  clientContact: string;
  assignedTeamMember: string;
  lastActivityDate: string; // Date format
  nextActivity: string;
  notes: string;
  attachments: File[]; // Array of files
};

interface DealContextType {
  deals: Deal[];
  addDeal: (deal: Deal) => void;
  deleteDeal: (id: string) => void; // Optional: Add delete functionality
}

const DealContext = createContext<DealContextType | undefined>(undefined);

export const DealProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [deals, setDeals] = useState<Deal[]>([]);

  const addDeal = (deal: Deal) => {
    setDeals((prev) => {
      const existingDealIndex = prev.findIndex(d => d.id === deal.id);
      if (existingDealIndex > -1) {
        // Update existing deal
        const updatedDeals = [...prev];
        updatedDeals[existingDealIndex] = deal;
        return updatedDeals;
      }
      return [...prev, deal]; // Add new deal
    });
  };

  const deleteDeal = (id: string) => {
    setDeals((prev) => prev.filter(deal => deal.id !== id));
  };

  return (
    <DealContext.Provider value={{ deals, addDeal, deleteDeal }}>
      {children}
    </DealContext.Provider>
  );
};

export const useDeal = () => {
  const context = useContext(DealContext);
  if (context === undefined) {
    throw new Error('useDeal must be used within a DealProvider');
  }
  return context;
}; 