"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';

export type Campaign = {
  id: string;
  title: string;
  description: string;
  startDate: string; // Date format
  endDate: string; // Date format
  isActive: boolean; // Boolean
  targetAudience: string; // MCQ or text
  budget: number; // Numeric
  images: string[]; // Array of image URLs
  // Add more fields as needed
};

interface CampaignContextType {
  campaigns: Campaign[];
  addCampaign: (campaign: Campaign) => void;
  deleteCampaign: (id: string) => void;
}

const CampaignContext = createContext<CampaignContextType | undefined>(undefined);

export const CampaignProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  const addCampaign = (campaign: Campaign) => {
    setCampaigns((prev) => {
      const existingCampaignIndex = prev.findIndex(c => c.id === campaign.id);
      if (existingCampaignIndex > -1) {
        // Update existing campaign
        const updatedCampaigns = [...prev];
        updatedCampaigns[existingCampaignIndex] = campaign;
        return updatedCampaigns;
      }
      return [...prev, campaign]; // Add new campaign
    });
  };

  const deleteCampaign = (id: string) => {
    setCampaigns((prev) => prev.filter(campaign => campaign.id !== id));
  };

  return (
    <CampaignContext.Provider value={{ campaigns, addCampaign, deleteCampaign }}>
      {children}
    </CampaignContext.Provider>
  );
};

export const useCampaign = () => {
  const context = useContext(CampaignContext);
  if (context === undefined) {
    throw new Error('useCampaign must be used within a CampaignProvider');
  }
  return context;
}; 