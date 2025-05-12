"use client"; // Ensure this component is a Client Component

import React, { useState } from 'react';
import { DealProvider, useDeal } from '../../../../context/dealcontext'; // Import the DealProvider

const DealDashboard: React.FC = () => {
  const { addDeal, deals } = useDeal(); // Get the addDeal function and deals from context
  const [dealName, setDealName] = useState<string>('');
  const [dealDescription, setDealDescription] = useState<string>('');
  const [dealType, setDealType] = useState<string>('');
  const [dealStage, setDealStage] = useState<string>('');
  const [dealValue, setDealValue] = useState<number>(0);
  const [currency, setCurrency] = useState<string>('USD');
  const [expectedCloseDate, setExpectedCloseDate] = useState<string>('');
  const [probabilityOfClose, setProbabilityOfClose] = useState<number>(0);
  const [clientName, setClientName] = useState<string>('');
  const [clientContact, setClientContact] = useState<string>('');
  const [assignedTeamMember, setAssignedTeamMember] = useState<string>('');
  const [lastActivityDate, setLastActivityDate] = useState<string>('');
  const [nextActivity, setNextActivity] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [attachments, setAttachments] = useState<File[]>([]); // For file uploads

  // Function to handle form submission
  const handleSubmit = () => {
    const newDeal = {
      id: Date.now().toString(), // Auto-generated ID
      dealName,
      dealDescription,
      dealType,
      dealStage,
      dealValue,
      currency,
      expectedCloseDate,
      probabilityOfClose,
      clientName,
      clientContact,
      assignedTeamMember,
      lastActivityDate,
      nextActivity,
      notes,
      attachments,
    };
    addDeal(newDeal); // Add the new deal in context
    console.log(newDeal); // Log the new deal
    resetForm(); // Reset form fields
  };

  // Function to reset the form
  const resetForm = () => {
    setDealName('');
    setDealDescription('');
    setDealType('');
    setDealStage('');
    setDealValue(0);
    setCurrency('USD');
    setExpectedCloseDate('');
    setProbabilityOfClose(0);
    setClientName('');
    setClientContact('');
    setAssignedTeamMember('');
    setLastActivityDate('');
    setNextActivity('');
    setNotes('');
    setAttachments([]);
  };

  return (
    <section className="flex size-full flex-col gap-10 text-white">
      {/* Deal Editor Section */}
      <div className="bg-dark-1 rounded-lg shadow-lg p-8 mb-6">
        <h3 className="text-xl font-semibold mb-2">Deal Information</h3>
        <input
          type="text"
          placeholder="Deal Name"
          value={dealName}
          onChange={(e) => setDealName(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={dealDescription}
          onChange={(e) => setDealDescription(e.target.value)}
        />
        <select value={dealType} onChange={(e) => setDealType(e.target.value)}>
          <option value="">Select Deal Type</option>
          <option value="New Business">New Business</option>
          <option value="Renewal">Renewal</option>
          <option value="Upsell">Upsell</option>
          <option value="Cross-Sell">Cross-Sell</option>
          <option value="Other">Other</option>
        </select>
        <select value={dealStage} onChange={(e) => setDealStage(e.target.value)}>
          <option value="">Select Deal Stage</option>
          <option value="Prospecting">Prospecting</option>
          <option value="Qualified">Qualified</option>
          <option value="Proposal Sent">Proposal Sent</option>
          <option value="Negotiation">Negotiation</option>
          <option value="Closed Won">Closed Won</option>
          <option value="Closed Lost">Closed Lost</option>
        </select>
        <input
          type="number"
          placeholder="Deal Value"
          value={dealValue}
          onChange={(e) => setDealValue(Number(e.target.value))}
        />
        <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="INR">INR</option>
        </select>
        <input
          type="date"
          value={expectedCloseDate}
          onChange={(e) => setExpectedCloseDate(e.target.value)}
        />
        <input
          type="number"
          placeholder="Probability of Close (%)"
          value={probabilityOfClose}
          onChange={(e) => setProbabilityOfClose(Number(e.target.value))}
        />
        <input
          type="text"
          placeholder="Client Name"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Client Contact"
          value={clientContact}
          onChange={(e) => setClientContact(e.target.value)}
        />
        <select value={assignedTeamMember} onChange={(e) => setAssignedTeamMember(e.target.value)}>
          <option value="">Select Team Member</option>
          {/* Add team members here */}
        </select>
        <input
          type="date"
          value={lastActivityDate}
          onChange={(e) => setLastActivityDate(e.target.value)}
        />
        <textarea
          placeholder="Next Activity"
          value={nextActivity}
          onChange={(e) => setNextActivity(e.target.value)}
        />
        <textarea
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <input
          type="file"
          multiple
          onChange={(e) => {
            const files = e.target.files; // Get the files from the input
            if (files) {
              setAttachments(Array.from(files)); // Convert FileList to an array
            } else {
              setAttachments([]); // Handle case where no files are selected
            }
          }}
        />
        <button onClick={handleSubmit}>Save Deal</button>
      </div>
    </section>
  );
};

// Wrap the DealDashboard component with DealProvider
const DealDashboardWithProvider: React.FC = () => (
  <DealProvider>
    <DealDashboard />
  </DealProvider>
);

export default DealDashboardWithProvider;
