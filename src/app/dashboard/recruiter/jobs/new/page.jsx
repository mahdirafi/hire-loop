"use client";

import { useState } from "react";
import { FiUploadCloud, FiGlobe, FiCalendar, FiDollarSign } from "react-icons/fi";

export default function postJobs() {
  const [logoPreview, setLogoPreview] = useState(null);
  const [isRemote, setIsRemote] = useState(false);

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    data.isRemote = isRemote;
    console.log("Register Company Data:", data);
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-8 px-4">
      {/* Form Card Container */}
      <div className="rounded-xl border border-neutral-800 bg-[#121212] text-neutral-200 shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="border-b border-neutral-800 p-6">
          <h2 className="text-xl font-semibold text-white">Post Jobs</h2>
          <p className="mt-1 text-sm text-neutral-400">
            Enter your job details to start hiring on HireLoop.
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-5">
            
            {/* Row 1: Company Name & Industry */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-2">
                  Company Name
                </label>
                <input
                  required
                  type="text"
                  name="companyName"
                  placeholder="e.g. Acme Corp"
                  className="w-full rounded-lg border border-neutral-800 bg-[#1c1c1c] px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:border-neutral-600 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-2">
                  Industry / Category
                </label>
                <select
                  required
                  name="industry"
                  defaultValue="Technology"
                  className="w-full rounded-lg border border-neutral-800 bg-[#1c1c1c] px-3.5 py-2.5 text-sm text-white focus:border-neutral-600 focus:outline-none transition-colors appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23a1a1aa'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0.75rem center',
                    backgroundSize: '1rem'
                  }}
                >
                  <option value="Technology" className="bg-[#1c1c1c]">Technology</option>
                  <option value="Software" className="bg-[#1c1c1c]">Software</option>
                  <option value="Design" className="bg-[#1c1c1c]">Design</option>
                  <option value="Marketing" className="bg-[#1c1c1c]">Marketing</option>
                  <option value="Finance" className="bg-[#1c1c1c]">Finance</option>
                </select>
              </div>
            </div>

            {/* Row 2: Website URL & Location Switch Toggle */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-2">
                  Website URL
                </label>
                <div className="flex rounded-lg border border-neutral-800 bg-[#1c1c1c] overflow-hidden focus-within:border-neutral-600 transition-colors">
                  <span className="inline-flex items-center px-3 text-xs text-neutral-500 bg-[#171717] border-r border-neutral-800">
                    https://
                  </span>
                  <input
                    type="text"
                    name="website"
                    placeholder="www.company.com"
                    className="w-full bg-transparent px-3 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Location Switch Toggle Container */}
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-2">
                  Workplace Type
                </label>
                <div className="flex items-center justify-between rounded-lg border border-neutral-800 bg-[#1c1c1c] px-3.5 py-2 h-[42px]">
                  <div className="flex items-center gap-2">
                    <FiGlobe className={`w-4 h-4 ${isRemote ? "text-emerald-400" : "text-neutral-500"}`} />
                    <span className="text-xs font-medium text-white">
                      {isRemote ? "Global / Remote" : "On-site / Office"}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsRemote(!isRemote)}
                    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      isRemote ? "bg-emerald-500" : "bg-neutral-700"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                        isRemote ? "translate-x-4" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Row 3: Salary Range (Min, Max, Currency) */}
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-2">
                Salary Range & Currency
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Min Salary */}
                <div className="relative">
                  <FiDollarSign className="absolute left-3 top-3 text-neutral-500 w-4 h-4" />
                  <input
                    type="number"
                    name="minSalary"
                    placeholder="Min Salary (e.g. 3000)"
                    className="w-full rounded-lg border border-neutral-800 bg-[#1c1c1c] pl-9 pr-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:border-neutral-600 focus:outline-none transition-colors"
                  />
                </div>

                {/* Max Salary */}
                <div className="relative">
                  <FiDollarSign className="absolute left-3 top-3 text-neutral-500 w-4 h-4" />
                  <input
                    type="number"
                    name="maxSalary"
                    placeholder="Max Salary (e.g. 5000)"
                    className="w-full rounded-lg border border-neutral-800 bg-[#1c1c1c] pl-9 pr-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:border-neutral-600 focus:outline-none transition-colors"
                  />
                </div>

                {/* Currency Selector */}
                <div>
                  <select
                    name="currency"
                    defaultValue="USD"
                    className="w-full rounded-lg border border-neutral-800 bg-[#1c1c1c] px-3.5 py-2.5 text-sm text-white focus:border-neutral-600 focus:outline-none transition-colors appearance-none cursor-pointer"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23a1a1aa'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 0.75rem center',
                      backgroundSize: '1rem'
                    }}
                  >
                    <option value="USD" className="bg-[#1c1c1c]">USD ($)</option>
                    <option value="EUR" className="bg-[#1c1c1c]">EUR (€)</option>
                    <option value="GBP" className="bg-[#1c1c1c]">GBP (£)</option>
                    <option value="BDT" className="bg-[#1c1c1c]">BDT (৳)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Row 4: Registration/Establishment Date & Employee Count */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-2">
                  Establishment Date
                </label>
                <div className="relative">
                  <FiCalendar className="absolute left-3 top-3 text-neutral-500 w-4 h-4" />
                  <input
                    type="date"
                    name="establishmentDate"
                    className="w-full rounded-lg border border-neutral-800 bg-[#1c1c1c] pl-9 pr-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:border-neutral-600 focus:outline-none transition-colors [color-scheme:dark]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-2">
                  Employee Count Range
                </label>
                <select
                  name="employeeCount"
                  defaultValue="1-10 employees"
                  className="w-full rounded-lg border border-neutral-800 bg-[#1c1c1c] px-3.5 py-2.5 text-sm text-white focus:border-neutral-600 focus:outline-none transition-colors appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23a1a1aa'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0.75rem center',
                    backgroundSize: '1rem'
                  }}
                >
                  <option value="1-10 employees" className="bg-[#1c1c1c]">1-10 employees</option>
                  <option value="11-50 employees" className="bg-[#1c1c1c]">11-50 employees</option>
                  <option value="51-200 employees" className="bg-[#1c1c1c]">51-200 employees</option>
                  <option value="201-500 employees" className="bg-[#1c1c1c]">201-500 employees</option>
                  <option value="500+ employees" className="bg-[#1c1c1c]">500+ employees</option>
                </select>
              </div>
            </div>

            {/* Row 5: Company Logo */}
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-2">
                Company Logo
              </label>
              <label className="flex items-center gap-3 p-2 rounded-lg border border-dashed border-neutral-700 bg-[#1c1c1c] hover:border-neutral-500 cursor-pointer transition-colors">
                <div className="w-10 h-10 rounded-md bg-[#252525] flex items-center justify-center shrink-0 border border-neutral-700 overflow-hidden">
                  {logoPreview ? (
                    <img src={logoPreview} alt="Logo" className="w-full h-full object-cover" />
                  ) : (
                    <FiUploadCloud className="w-5 h-5 text-neutral-400" />
                  )}
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs font-medium text-white truncate">Upload image</p>
                  <p className="text-[10px] text-neutral-500">PNG, JPG up to 5MB</p>
                </div>
                <input
                  type="file"
                  name="logo"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Row 6: Brief Description */}
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-2">
                Brief Description
              </label>
              <textarea
                name="description"
                rows={3}
                placeholder="Tell us about your company's mission and culture..."
                className="w-full rounded-lg border border-neutral-800 bg-[#1c1c1c] p-3 text-sm text-white placeholder-neutral-500 focus:border-neutral-600 focus:outline-none transition-colors resize-none"
              />
            </div>

          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 border-t border-neutral-800 p-4 px-6 bg-[#121212]">
            <button
              type="button"
              className="px-5 py-2 rounded-lg border border-neutral-800 bg-[#1c1c1c] text-xs font-medium text-neutral-300 hover:bg-[#252525] hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-white text-black text-xs font-semibold hover:bg-neutral-200 transition-colors cursor-pointer"
            >
              Post Jobs
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}