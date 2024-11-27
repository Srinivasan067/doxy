"use client"; // Ensure this component is a Client Component

import React, { useState } from 'react';
import { CampaignProvider,useCampaign } from '../../../../context/campaigncontext'; // Import the CampaignProvider

// Dynamically import React-Quill for SSR compatibility
import 'react-quill/dist/quill.snow.css'; // Quill's styles

const Dashboard: React.FC = () => {
  const { addCampaign, campaigns } = useCampaign(); // Get the addCampaign function and campaigns from context
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [isActive, setIsActive] = useState<boolean>(false);
  const [targetAudience, setTargetAudience] = useState<string>('');
  const [budget, setBudget] = useState<number>(0);
  const [images, setImages] = useState<string[]>([]); // Array for image URLs
  const [filter, setFilter] = useState<string>(''); // State for filtering campaigns
  const [editingCampaignId, setEditingCampaignId] = useState<string | null>(null); // State for editing

  // Function to handle image uploads
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files; // Get the files from the input
    if (files) {
      const imageUrls = Array.from(files).map(file => URL.createObjectURL(file));
      setImages(imageUrls);
    }
  };

  // Function to handle form submission
  const handleSubmit = () => {
    const newCampaign = {
      id: editingCampaignId || Date.now().toString(), // Use existing ID if editing
      title,
      description,
      startDate,
      endDate,
      isActive,
      targetAudience,
      budget,
      images,
    };
    addCampaign(newCampaign); // Add or update the campaign in context
    console.log(newCampaign); // Log the new campaign
    // Reset form fields if needed
    resetForm();
  };

  // Function to reset the form
  const resetForm = () => {
    setTitle('');
    setDescription('');
    setStartDate('');
    setEndDate('');
    setIsActive(false);
    setTargetAudience('');
    setBudget(0);
    setImages([]);
    setEditingCampaignId(null); // Reset editing state
  };

  // Function to handle editing a campaign
  const handleEdit = (campaign: any) => {
    setTitle(campaign.title);
    setDescription(campaign.description);
    setStartDate(campaign.startDate);
    setEndDate(campaign.endDate);
    setIsActive(campaign.isActive);
    setTargetAudience(campaign.targetAudience);
    setBudget(campaign.budget);
    setImages(campaign.images);
    setEditingCampaignId(campaign.id); // Set the campaign ID for editing
  };

  // Filtered campaigns based on the filter input
  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <section className="flex size-full flex-col gap-10 text-white">
      {/* Cover Picture */}
      <div className="h-[350px] w-full bg-cover bg-center" style={{ backgroundImage: 'url(https://i.pinimg.com/736x/76/ec/73/76ec73edb6a4be74e71cadf706c9eb89.jpg)' }}>
        {/* Optional: Add a dark overlay */}
        <div className="bg-black bg-opacity-30 h-full flex items-center justify-center">
          <h1 className="text-3xl font-bold">Make your voice to pitch all</h1>
        </div>
      </div>

      {/* Campaign Editor Section */}
      <div className="bg-dark-1 rounded-lg shadow-lg p-8 mb-6">
        {/* Campaign Info Section */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">1. Campaign Info</h3>
          <input
            type="text"
            className="w-full p-3 mb-4 text-lg bg-gray-800 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Campaign Name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            className="w-full p-3 mb-4 text-lg bg-gray-800 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Brands/Outlets"
          />
          <input
            type="text"
            className="w-full p-3 mb-4 text-lg bg-gray-800 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Channels"
          />
        </div>

        {/* Audience Section */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">2. Audience</h3>
          <div className="grid grid-cols-3 gap-4">
            <input
              type="number"
              className="w-full p-3 text-lg bg-gray-800 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Target Customers"
            />
            <input
              type="number"
              className="w-full p-3 text-lg bg-gray-800 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Email Only"
            />
            <input
              type="number"
              className="w-full p-3 text-lg bg-gray-800 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="SMS Only"
            />
          </div>
        </div>

        {/* Time Management Section */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">3. Time Management</h3>
          <div className="grid grid-cols-3 gap-4">
            <select className="w-full p-3 text-lg bg-gray-800 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option>Check Every hour</option>
              <option>Every day</option>
              <option>Every week</option>
            </select>
            <input
              type="date"
              className="w-full p-3 text-lg bg-gray-800 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <select className="w-full p-3 text-lg bg-gray-800 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option>Active days</option>
              <option>All days</option>
            </select>
          </div>
        </div>

        {/* Create Rules Section */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">4. Create Rules</h3>
          <div className="flex items-center mb-4">
            <span className="text-lg">If</span>
            <input type="text" className="border border-gray-600 bg-gray-800 rounded p-2 mx-2" placeholder="Spend" />
            <input type="number" className="border border-gray-600 bg-gray-800 rounded p-2 mx-2" placeholder="$" />
          </div>
          <div className="flex items-center mb-4">
            <span className="text-lg">And</span>
            <input type="text" className="border border-gray-600 bg-gray-800 rounded p-2 mx-2" placeholder="Increase budget" />
            <input type="number" className="border border-gray-600 bg-gray-800 rounded p-2 mx-2" placeholder="%" />
          </div>
          <div className="flex items-center mb-4">
            <span className="text-lg">Than</span>
            <input type="text" className="border border-gray-600 bg-gray-800 rounded p-2 mx-2" placeholder="Spend" />
            <input type="number" className="border border-gray-600 bg-gray-800 rounded p-2 mx-2" placeholder="$" />
          </div>
        </div>

        {/* Image Upload Section */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">5. Upload Images</h3>
          <input
            type="file"
            multiple
            onChange={handleImageUpload}
            className="border border-gray-600 bg-gray-800 rounded p-2 mb-4"
          />
          {images.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-2">
              {images.map((image, index) => (
                <img key={index} src={image} alt="Preview" className="w-full h-32 object-cover rounded-lg" />
              ))}
            </div>
          )}
        </div>

        <button
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition duration-200"
          onClick={handleSubmit}
        >
          Save Campaign
        </button>
      </div>

      {/* Campaign List Section */}
      <div className="bg-dark-1 rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Campaigns</h2>
        <input
          type="text"
          placeholder="Filter campaigns..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-600 bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {filteredCampaigns.length === 0 ? (
          <p>No campaigns created yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCampaigns.map((campaign: any) => (
              <div key={campaign.id} className="border border-gray-600 rounded p-4 bg-gray-800">
                <h3 className="text-lg font-semibold">{campaign.title}</h3>
                <p><strong>Start Date:</strong> {campaign.startDate}</p>
                <p><strong>End Date:</strong> {campaign.endDate}</p>
                <p><strong>Active:</strong> {campaign.isActive ? 'Yes' : 'No'}</p>
                <p><strong>Target Audience:</strong> {campaign.targetAudience}</p>
                <p><strong>Budget:</strong> ${campaign.budget}</p>
                {campaign.images.length > 0 && (
                  <div className="mt-2">
                    <img src={campaign.images[0]} alt="Campaign" className="w-full h-32 object-cover rounded-lg" />
                  </div>
                )}
                <div className="mt-4 flex justify-between">
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => handleEdit(campaign)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

// Wrap the Dashboard component with CampaignProvider
const DashboardWithProvider: React.FC = () => (
  <CampaignProvider>
    <Dashboard />
  </CampaignProvider>
);

export default DashboardWithProvider;