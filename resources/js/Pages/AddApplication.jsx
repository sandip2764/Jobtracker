import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import GradientText from "@/Components/GradientText";
import { FiMapPin, FiArrowLeft, FiDollarSign, FiFileText, FiCalendar, FiBriefcase, FiTag, FiDownload, FiUploadCloud, FiCheck, FiX, FiTrash2, FiAlertCircle } from 'react-icons/fi';
import { RainbowButton } from "@/Components/rainbow-button";
import Dropdown from "@/Components/Dropdown";
import DarkVeil from "@/Components/DarkVeil";
import toast, { Toaster } from 'react-hot-toast'; 

// --- OPTIONS ---
const documentTypeOptions = [
  { label: "Resume", value: "Resume" },
  { label: "Cover Letter", value: "Cover Letter" },
  { label: "Portfolio", value: "Portfolio" },
  { label: "Other", value: "Other" },
];

const statusTypeOptions = [
  { label: "Applied", value: "Applied" },
  { label: "Interview", value: "Interview" },
  { label: "Offer", value: "Offer" },
  { label: "Rejected", value: "Rejected" },
];

const workTypeOptions = [
  { label: "Remote", value: "Remote" },
  { label: "Hybrid", value: "Hybrid" },
  { label: "On-site", value: "On-site" },
];

const salaryTypeOptions = [
  { label: "Per Month", value: "Per Month" },
  { label: "Per Annum", value: "Per Annum" },
  { label: "Per Hour", value: "Per Hour" },
];

const sourceTypeOptions = [
  { label: "LinkedIn", value: "LinkedIn" },
  { label: "Naukri", value: "Naukri" },
  { label: "Company Website", value: "Company Website" },
  { label: "Referral", value: "Referral" },
  { label: "Other", value: "Other" },
];

export default function AddApplication() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  
  // 🔥 New State for Validation Errors
  const [errors, setErrors] = useState({}); 

  // --- MAIN FORM STATE ---
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    job_url: '',
    location: '',
    work_type: '',
    salary_min: '',
    salary_max: '',
    salary_type: '',
    status: '',
    applied_date: new Date().toISOString().split('T')[0],
    source: '',
    job_description: '',
    notes: '',
    document_type: '',
  });

  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  // --- HANDLERS ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
        setErrors(prev => ({...prev, [name]: null}));
    }
  };

  const handleDropdown = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({...prev, [field]: null}));
  };

  // --- TAGS LOGIC ---
  const handleAddTag = () => {
    if (tagInput.trim() !== "" && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); 
      handleAddTag();
    }
  };

  // --- FILE UPLOAD LOGIC ---
  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      if (errors.document) setErrors(prev => ({...prev, document: null}));
      toast.success("File selected!");
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    toast("File removed", { icon: '🗑️' });
  };

  // --- SUBMIT LOGIC ---
  const handleSubmit = async () => {
    setLoading(true);
    setErrors({}); // Purane errors clear karo

    const token = localStorage.getItem('auth_token'); 
    if (!token) {
      navigate('/auth');
      return;
    }
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      data.append(key, formData[key] || ''); 
    });

    tags.forEach((tag, index) => {
      data.append(`tags[${index}]`, tag);
    });

    if (selectedFile) {
      data.append('document', selectedFile);
    }

    try {
      await axios.post('/api/applications', data, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
         },
      });

      // 🔥 Success Toast with Delay
      toast.success("Application Created Successfully!");
      setTimeout(() => {
          navigate('/applications'); 
      }, 1500);

    } catch (error) {
      console.error('Error submitting application:', error);
      
      // 🔥 Handle Validation Errors (422)
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);
        toast.error("Please fix the validation errors."); // General error toast
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        toast.error("Something went wrong! Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Helper Component for Error Message
  const ErrorMsg = ({ field }) => (
    errors[field] ? (
      <div className="flex items-center gap-1 text-red-400 text-xs mt-2 animate-pulse">
        <FiAlertCircle /> <span>{errors[field][0]}</span>
      </div>
    ) : null
  );

  return (
    <main className="w-[calc(100vw - 0px)] flex flex-col p-28 max-sm:p-6 text-white">
      
      {/* 🔥 Modern Dark Styled Toaster */}
      <Toaster 
        position="top-center" 
        reverseOrder={false}
        toastOptions={{
            style: {
                background: '#1A1025',
                color: '#fff',
                border: '1px solid #392e4e',
                borderRadius: '8px',
                padding: '16px',
            },
            success: {
                iconTheme: {
                    primary: '#40ffaa',
                    secondary: '#1A1025',
                },
            },
            error: {
                iconTheme: {
                    primary: '#ef4444',
                    secondary: '#1A1025',
                },
            },
        }} 
      />
      
      <div className="absolute inset-0 opacity-70 mix-blend-screen pointer-events-none">
        <div style={{ width: '100%', height: '600px', position: 'relative' }}>
          <DarkVeil />
        </div>
      </div>
   
      <div className="pb-10 relative z-10">
        <div className="">
          <RainbowButton onClick={() => navigate(-1)} className="max-sm:text-xs max-sm:p-2" variant="outline">
            <span><FiArrowLeft /></span>Back To Applications
          </RainbowButton>
        </div>
        <div>
          <GradientText colors={["#8660fa", "#a855f7", "#8400ff", "#a855f7", "#8660fa"]} animationSpeed={8} showBorder={false} className="custom-class">
            <h1 className="text-5xl font-extrabold mt-10 mb-4 max-sm:text-2xl max-sm:mt-4 max-sm:mb-2">Add New Application</h1>
          </GradientText>
        </div>
        <p className="text-purple-100 text-xl font-medium pb-4 max-sm:text-xs max-sm:w-[60%]">Fill in the details of your job application</p>
      </div>

      <div className="w-full flex flex-col gap-6 relative z-10">

        {/* --- JOB DETAILS --- */}
        <div className="w-full p-6 bg-[#060010] border border-[#392e4e] rounded-2xl max-sm:p-2">
          <div className="flex items-center mb-4">
            <FiBriefcase className="w-6 h-6 mr-2" />
            <GradientText colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]} animationSpeed={8} showBorder={false} className="w-[100%] p-4">
              <h1 className="w-full text-3xl font-extrabold max-sm:text-2xl">Job Details</h1>
            </GradientText>
          </div>

          <div className="mb-4">
            <label className="font-semibold text-md">Company Name <span className="text-red-500">*</span></label>
            <div className={`border rounded-lg px-2 py-2 w-full mt-4 ${errors.company ? 'border-red-500 bg-red-950/10' : 'border-[#392e4e]'}`}>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="e.g., Google, Amazon, Microsoft"
                className="w-full flex-1 bg-transparent text-white placeholder-gray-400 border-none outline-none focus:ring-0 p-2"
              />
            </div>
            <ErrorMsg field="company" />
          </div>

          <div className="mb-4">
            <label className="font-semibold text-md">Position/Role <span className="text-red-500">*</span></label>
            <div className={`border rounded-lg px-2 py-2 w-full mt-4 ${errors.position ? 'border-red-500 bg-red-950/10' : 'border-[#392e4e]'}`}>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                placeholder="e.g., Software Engineer, Data Analyst"
                className="w-full flex-1 bg-transparent text-white placeholder-gray-400 border-none outline-none focus:ring-0 p-2"
              />
            </div>
            <ErrorMsg field="position" />
          </div>

          <div className="mb-4">
            <label className="font-semibold text-md">Job URL <span className="font-normal text-gray-300">(optional)</span></label>
            <div className={`border rounded-lg px-2 py-2 w-full mt-4 ${errors.job_url ? 'border-red-500 bg-red-950/10' : 'border-[#392e4e]'}`}>
              <input
                type="text"
                name="job_url"
                value={formData.job_url}
                onChange={handleChange}
                placeholder="e.g., https://www.example.com/job-posting"
                className="w-full flex-1 bg-transparent text-white placeholder-gray-400 border-none outline-none focus:ring-0 p-2"
              />
            </div>
            <ErrorMsg field="job_url" />
          </div>
        </div>

        {/* --- LOCATION & WORK TYPE --- */}
        <div className="w-full p-6 bg-[#060010] border border-[#392e4e] rounded-2xl max-sm:p-2">
          <div className="flex items-center mb-4">
            <FiMapPin className="w-6 h-6 mr-2" />
            <GradientText colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]} animationSpeed={8} showBorder={false} className="w-[100%] p-4">
              <h1 className="w-full text-3xl font-extrabold max-sm:text-2xl">Location & Work Type</h1>
            </GradientText>
          </div>

          <div className="mb-4">
            <label className="font-semibold text-md">Location</label>
            <div className={`border rounded-lg px-2 py-2 w-full mt-4 ${errors.location ? 'border-red-500 bg-red-950/10' : 'border-[#392e4e]'}`}>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., New York, Remote, San Francisco"
                className="w-full flex-1 bg-transparent text-white placeholder-gray-400 border-none outline-none focus:ring-0 p-2"
              />
            </div>
            <ErrorMsg field="location" />
          </div>

          <div className="mb-4">
            <label className="font-semibold text-md">Work Type</label>
            <div className="w-full mt-4">
              <Dropdown
                options={workTypeOptions}
                selected={workTypeOptions.find(opt => opt.value === formData.work_type)}
                onSelect={(val) => handleDropdown('work_type', val.value || val)}
                placeholder="Select Work Type"
                className="max-sm:text-xs"
              />
              <ErrorMsg field="work_type" />
            </div>
          </div>
        </div>

        {/* --- COMPENSATION --- */}
        <div className="w-full p-6 bg-[#060010] border border-[#392e4e] rounded-2xl max-sm:p-2">
          <div className="flex items-center mb-4">
            <FiDollarSign className="w-8 h-8 mr-2" />
            <GradientText colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]} animationSpeed={8} showBorder={false} className="w-[100%] p-4">
              <h1 className="w-full text-3xl font-extrabold max-sm:text-2xl">Compensation</h1>
            </GradientText>
          </div>

          <div className="flex gap-4 max-sm:flex-col">
            <div className="mb-4 flex-1">
              <label className="font-semibold text-md">Min Salary</label>
              <div className={`border rounded-lg px-2 py-2 w-full mt-4 ${errors.salary_min ? 'border-red-500 bg-red-950/10' : 'border-[#392e4e]'}`}>
                <input
                  type="text"
                  name="salary_min"
                  value={formData.salary_min}
                  onChange={handleChange}
                  placeholder="e.g., 100000"
                  className="w-full bg-transparent text-white placeholder-gray-400 border-none outline-none p-2"
                />
              </div>
              <ErrorMsg field="salary_min" />
            </div>
            <div className="mb-4 flex-1">
              <label className="font-semibold text-md">Max Salary</label>
              <div className={`border rounded-lg px-2 py-2 w-full mt-4 ${errors.salary_max ? 'border-red-500 bg-red-950/10' : 'border-[#392e4e]'}`}>
                <input
                  type="text"
                  name="salary_max"
                  value={formData.salary_max}
                  onChange={handleChange}
                  placeholder="e.g., 200000"
                  className="w-full bg-transparent text-white placeholder-gray-400 border-none outline-none p-2"
                />
              </div>
              <ErrorMsg field="salary_max" />
            </div>
          </div>

          <div className="mb-4">
            <label className="font-semibold text-md">Salary Type</label>
            <div className="w-full mt-4">
              <Dropdown
                options={salaryTypeOptions}
                selected={salaryTypeOptions.find(opt => opt.value === formData.salary_type)}
                onSelect={(val) => handleDropdown('salary_type', val.value || val)}
                placeholder="Select Salary Type"
                className="max-sm:text-xs"
              />
              <ErrorMsg field="salary_type" />
            </div>
          </div>
        </div>

        {/* --- APPLICATION STATUS --- */}
        <div className="w-full p-6 bg-[#060010] border border-[#392e4e] rounded-2xl max-sm:p-2">
          <div className="flex items-center mb-4">
            <FiCalendar className="w-8 h-8 mr-2" />
            <GradientText colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]} animationSpeed={8} showBorder={false} className="w-[100%] p-4">
              <h1 className="w-full text-3xl font-extrabold max-sm:text-2xl">Application Status</h1>
            </GradientText>
          </div>

          <div className="mb-4">
            <label className="font-semibold text-md">Status</label>
            <div className="w-full mt-4">
              <Dropdown
                options={statusTypeOptions}
                selected={statusTypeOptions.find(opt => opt.value === formData.status)}
                onSelect={(val) => handleDropdown('status', val.value || val)}
                placeholder="Select Status"
                className="max-sm:text-xs"
              />
              <ErrorMsg field="status" />
            </div>
          </div>

          <div className="mb-4">
            <label className="font-semibold text-md">Applied Date</label>
            <div className={`border rounded-lg px-2 py-2 w-full mt-4 ${errors.applied_date ? 'border-red-500 bg-red-950/10' : 'border-[#392e4e]'}`}>
              <input
                type="date"
                name="applied_date"
                value={formData.applied_date}
                onChange={handleChange}
                className="w-full bg-transparent text-white border-none outline-none p-2 [color-scheme:dark]"
              />
            </div>
            <ErrorMsg field="applied_date" />
          </div>

          <div className="mb-4">
            <label className="font-semibold text-md">Source</label>
            <div className="w-full mt-4">
              <Dropdown
                options={sourceTypeOptions}
                selected={sourceTypeOptions.find(opt => opt.value === formData.source)}
                onSelect={(val) => handleDropdown('source', val.value || val)}
                placeholder="Source Type"
                className="max-sm:text-xs"
              />
              <ErrorMsg field="source" />
            </div>
          </div>
        </div>

        {/* --- NOTES & DESCRIPTION --- */}
        <div className="w-full p-6 bg-[#060010] border border-[#392e4e] rounded-2xl max-sm:p-2">
          <div className="flex items-center mb-4">
            <FiFileText className="w-8 h-8 mr-2" />
            <GradientText colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]} animationSpeed={8} showBorder={false} className="w-[100%] p-4">
              <h1 className="w-full text-3xl font-extrabold max-sm:text-2xl">Additional Info</h1>
            </GradientText>
          </div>

          <div className="mb-4">
            <label className="font-semibold text-md">Job Description</label>
            <div className={`border rounded-lg px-2 py-2 w-full mt-4 ${errors.job_description ? 'border-red-500 bg-red-950/10' : 'border-[#392e4e]'}`}>
              <textarea
                name="job_description"
                value={formData.job_description}
                onChange={handleChange}
                placeholder="Paste the job description here..."
                className="w-full h-[150px] bg-transparent text-white placeholder-gray-400 border-none outline-none focus:ring-0 p-2"
              />
            </div>
            <ErrorMsg field="job_description" />
          </div>

          <div className="mb-4">
            <label className="font-semibold text-md">Personal Notes</label>
            <div className={`border rounded-lg px-2 py-2 w-full mt-4 ${errors.notes ? 'border-red-500 bg-red-950/10' : 'border-[#392e4e]'}`}>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Paste personal notes here..."
                className="w-full h-[100px] bg-transparent text-white placeholder-gray-400 border-none outline-none focus:ring-0 p-2"
              />
            </div>
             <ErrorMsg field="notes" />
          </div>
        </div>

        {/* --- TAGS (Improved) --- */}
        <div className="w-full p-6 bg-[#060010] border border-[#392e4e] rounded-2xl max-sm:p-2">
          <div className="flex items-center mb-4">
            <FiTag className="w-8 h-8 mr-2" />
            <GradientText colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]} animationSpeed={8} showBorder={false} className="w-[100%] p-4">
              <h1 className="w-full text-3xl font-extrabold max-sm:text-2xl">Tags</h1>
            </GradientText>
          </div>

          <div className="mb-4">
            <label className="font-semibold text-md">Skills / Tags</label>
            <div className="flex gap-4 justify-center items-start mt-4">
              <div className="flex-1">
                <div className="border border-[#392e4e] rounded-lg px-2 py-2 w-full">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleTagKeyDown}
                    placeholder="e.g., React, JavaScript (Press Enter)"
                    className="w-full bg-transparent text-white placeholder-gray-400 border-none outline-none p-2"
                  />
                </div>
                {/* --- DISPLAY ADDED TAGS --- */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {tags.map((tag, index) => (
                    <span key={index} className="flex items-center gap-1 bg-purple-900 text-purple-200 px-3 py-1 rounded-full text-sm border border-purple-700">
                      {tag}
                      <button onClick={() => handleRemoveTag(tag)} className="hover:text-white"><FiX /></button>
                    </span>
                  ))}
                </div>
                <ErrorMsg field="tags" />
              </div>
              <div className="pt-2">
                <RainbowButton onClick={handleAddTag} className="max-sm:text-xs max-sm:p-2" variant="outline">+ Add</RainbowButton>
              </div>
            </div>
          </div>
        </div>

        {/* --- UPLOAD DOCUMENTS --- */}
        <div className="w-full p-6 bg-[#060010] border border-[#392e4e] rounded-2xl max-sm:p-2">
          <div className="flex items-center mb-4">
            <FiDownload className="w-8 h-8 mr-2" />
            <GradientText colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]} animationSpeed={8} showBorder={false} className="w-[100%] p-4">
              <h1 className="w-full text-3xl font-extrabold max-sm:text-2xl">Documents</h1>
            </GradientText>
          </div>

          <div className="mb-4">
            <label className="font-semibold text-md">Document Type</label>
            <div className="w-full mt-4">
              <Dropdown
                options={documentTypeOptions}
                selected={documentTypeOptions.find(opt => opt.value === formData.document_type)}
                onSelect={(val) => handleDropdown('document_type', val.value || val)}
                placeholder="Select Document Type"
                className="max-sm:text-xs"
              />
              <ErrorMsg field="document_type" />
            </div>
          </div>

          <div className="mb-4">
            {/* HIDDEN INPUT */}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              className="hidden" 
              accept=".pdf,.doc,.docx"
            />
            
            <div className={`border rounded-lg px-2 py-0 w-full mt-4 cursor-pointer hover:bg-purple-950/50 transition-colors ${errors.document ? 'border-red-500 bg-red-950/10' : 'border-[#392e4e]'}`} onClick={handleFileClick}>
              <div className="flex flex-col justify-center items-center p-6 py-12 gap-4">
                {selectedFile ? (
                  // IF FILE SELECTED
                  <div className="text-center">
                      <FiCheck className="h-12 w-12 text-green-500 mx-auto mb-2"/>
                      <p className="font-semibold text-lg text-green-400">{selectedFile.name}</p>
                      <p className="text-gray-400 text-sm">{(selectedFile.size / 1024).toFixed(2)} KB</p>
                      <button 
                        onClick={(e) => { e.stopPropagation(); removeFile(); }} 
                        className="mt-4 text-red-400 hover:text-red-200 flex items-center justify-center gap-2 text-sm"
                      >
                        <FiTrash2 /> Remove File
                      </button>
                  </div>
                ) : (
                  // IF NO FILE
                  <>
                    <FiUploadCloud className="h-12 w-12 text-gray-400" />
                    <div className="flex flex-col justify-center items-center">
                      <p className="font-semibold text-lg mb-1">Click to upload or drag and drop</p>
                      <p className="text-gray-300">Resume, Cover Letter (PDF, DOC - Max 5MB)</p>
                    </div>
                  </>
                )}
              </div>
            </div>
            <ErrorMsg field="document" />
          </div>
        </div>

        {/* --- ACTION BUTTONS --- */}
        <div className="flex gap-6 mt-4 pb-10">
          <div>
            <RainbowButton onClick={handleSubmit} variant="outline" disabled={loading}>
              <span>{loading ? "Saving..." : <FiCheck />}</span> 
              {loading ? "Please Wait" : "Save Application"}
            </RainbowButton>
          </div>
          <div>
            <RainbowButton onClick={() => navigate(-1)} variant="default">Cancel</RainbowButton>
          </div>
        </div>

      </div>
    </main>
  );
}