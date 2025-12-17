import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import GradientText from "@/Components/GradientText";
import { FiMapPin, FiArrowLeft, FiDollarSign, FiFileText, FiCalendar, FiBriefcase, FiTag, FiUploadCloud, FiCheck, FiTrash2, FiAlertCircle, FiLoader } from 'react-icons/fi';
import { RainbowButton } from "@/Components/rainbow-button";
import Dropdown from "@/Components/Dropdown";
import DarkVeil from "@/Components/DarkVeil";
import toast, { Toaster } from 'react-hot-toast'; 

// --- OPTIONS (Same as Add Page) ---
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

export default function EditApplication() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  const [loading, setLoading] = useState(false); // Saving state
  const [fetching, setFetching] = useState(true); // Loading data state
  const [errors, setErrors] = useState({});

  // --- FORM STATE ---
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
    applied_date: '',
    source: '',
    job_description: '',
    notes: '',
    document_type: '',
  });

  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  
  // File States
  const [selectedFile, setSelectedFile] = useState(null); // New file upload
  const [existingFile, setExistingFile] = useState(null); // Old file from DB

  // --- 1. FETCH DATA ON LOAD ---
  useEffect(() => {
    const fetchApplication = async () => {
      const token = localStorage.getItem('auth_token');
      if (!token) { navigate('/auth'); return; }

      try {
        const response = await axios.get(`/api/applications/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        const data = response.data.data;
        
        // Populate Form
        setFormData({
            company: data.company,
            position: data.position,
            job_url: data.job_url || '',
            location: data.location || '',
            work_type: data.work_type || '',
            salary_min: data.salary_min || '',
            salary_max: data.salary_max || '',
            salary_type: data.salary_type || '',
            status: data.status,
            applied_date: data.applied_date,
            source: data.source || '',
            job_description: data.job_description || '',
            notes: data.notes || '',
            document_type: data.document?.document_type || '',
        });

        // Populate Tags
        if(data.tags) {
            setTags(data.tags.map(t => t.name)); 
        }

        // Populate Document
        if(data.document) {
            setExistingFile(data.document);
        }

      } catch (error) {
        console.error("Fetch error:", error);
        toast.error("Failed to load application details.");
        navigate('/applications');
      } finally {
        setFetching(false);
      }
    };

    fetchApplication();
  }, [id, navigate]);

  // --- HANDLERS ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({...prev, [name]: null}));
  };

  const handleDropdown = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({...prev, [field]: null}));
  };

  // Tags Logic
  const handleAddTag = () => {
    if (tagInput.trim() !== "" && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => setTags(tags.filter(tag => tag !== tagToRemove));
  
  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter') { e.preventDefault(); handleAddTag(); }
  };

  // File Logic
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setExistingFile(null); // Hide old file UI when new one is selected
      if (errors.document) setErrors(prev => ({...prev, document: null}));
    }
  };

  // --- SUBMIT LOGIC (UPDATE) ---
  const handleSubmit = async () => {
    setLoading(true);
    setErrors({});
    const token = localStorage.getItem('auth_token');

    const data = new FormData();
    data.append('_method', 'PUT'); // Important for Laravel File Upload on Update

    Object.keys(formData).forEach(key => data.append(key, formData[key] || ''));
    tags.forEach((tag, index) => data.append(`tags[${index}]`, tag));
    if (selectedFile) data.append('document', selectedFile);

    try {
      await axios.post(`/api/applications/${id}`, data, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
         },
      });

      toast.success("Application Updated Successfully!");
      setTimeout(() => navigate('/applications'), 1500);

    } catch (error) {
      console.error('Update Error:', error);
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);
        toast.error("Please fix the validation errors.");
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        toast.error("Something went wrong!");
      }
    } finally {
      setLoading(false);
    }
  };

  const ErrorMsg = ({ field }) => (
    errors[field] ? <div className="flex items-center gap-1 text-red-400 text-xs mt-2 animate-pulse"><FiAlertCircle /> <span>{errors[field][0]}</span></div> : null
  );

  // Loading Screen
  if(fetching) return (
    <div className="h-screen w-full flex items-center justify-center bg-[#060010] text-white">
        <FiLoader className="animate-spin h-10 w-10 text-purple-500" />
    </div>
  );

  return (
    <main className="w-[calc(100vw - 0px)] flex flex-col p-28 max-sm:p-6 text-white">
      <Toaster position="top-center" reverseOrder={false} />
      
      <div className="absolute inset-0 opacity-70 mix-blend-screen pointer-events-none">
        <div style={{ width: '100%', height: '600px', position: 'relative' }}><DarkVeil /></div>
      </div>
   
      <div className="pb-10 relative z-10">
        <div className="">
          <RainbowButton onClick={() => navigate('/applications')} className="max-sm:text-xs max-sm:p-2" variant="outline">
            <span><FiArrowLeft /></span>Back To Applications
          </RainbowButton>
        </div>
        <div>
          <GradientText colors={["#8660fa", "#a855f7", "#8400ff", "#a855f7", "#8660fa"]} animationSpeed={8} showBorder={false} className="custom-class">
            <h1 className="text-5xl font-extrabold mt-10 mb-4 max-sm:text-2xl max-sm:mt-4 max-sm:mb-2">Edit Application</h1>
          </GradientText>
        </div>
        <p className="text-purple-100 text-xl font-medium pb-4 max-sm:text-xs max-sm:w-[60%]">Update details for {formData.company}</p>
      </div>

      <div className="w-full flex flex-col gap-6 relative z-10">

        {/* --- 1. JOB DETAILS --- */}
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
              <input type="text" name="company" value={formData.company} onChange={handleChange} className="w-full bg-transparent text-white placeholder-gray-400 border-none outline-none p-2" />
            </div>
            <ErrorMsg field="company" />
          </div>

          <div className="mb-4">
            <label className="font-semibold text-md">Position/Role <span className="text-red-500">*</span></label>
            <div className={`border rounded-lg px-2 py-2 w-full mt-4 ${errors.position ? 'border-red-500 bg-red-950/10' : 'border-[#392e4e]'}`}>
              <input type="text" name="position" value={formData.position} onChange={handleChange} className="w-full bg-transparent text-white placeholder-gray-400 border-none outline-none p-2" />
            </div>
            <ErrorMsg field="position" />
          </div>

          <div className="mb-4">
            <label className="font-semibold text-md">Job URL <span className="font-normal text-gray-300">(optional)</span></label>
            <div className={`border rounded-lg px-2 py-2 w-full mt-4 ${errors.job_url ? 'border-red-500 bg-red-950/10' : 'border-[#392e4e]'}`}>
              <input type="text" name="job_url" value={formData.job_url} onChange={handleChange} className="w-full bg-transparent text-white placeholder-gray-400 border-none outline-none p-2" />
            </div>
          </div>
        </div>

        {/* --- 2. LOCATION & WORK TYPE --- */}
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
              <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full bg-transparent text-white placeholder-gray-400 border-none outline-none p-2" />
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

        {/* --- 3. COMPENSATION --- */}
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
              <div className="border border-[#392e4e] rounded-lg px-2 py-2 w-full mt-4">
                <input type="text" name="salary_min" value={formData.salary_min} onChange={handleChange} className="w-full bg-transparent text-white border-none outline-none p-2" />
              </div>
            </div>
            <div className="mb-4 flex-1">
              <label className="font-semibold text-md">Max Salary</label>
              <div className="border border-[#392e4e] rounded-lg px-2 py-2 w-full mt-4">
                <input type="text" name="salary_max" value={formData.salary_max} onChange={handleChange} className="w-full bg-transparent text-white border-none outline-none p-2" />
              </div>
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
            </div>
          </div>
        </div>

        {/* --- 4. STATUS & DATE --- */}
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
            </div>
          </div>

          <div className="mb-4">
            <label className="font-semibold text-md">Applied Date</label>
            <div className="border border-[#392e4e] rounded-lg px-2 py-2 w-full mt-4">
              <input type="date" name="applied_date" value={formData.applied_date} onChange={handleChange} className="w-full bg-transparent text-white border-none outline-none p-2 [color-scheme:dark]" />
            </div>
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
            </div>
          </div>
        </div>

        {/* --- 5. ADDITIONAL INFO --- */}
        <div className="w-full p-6 bg-[#060010] border border-[#392e4e] rounded-2xl max-sm:p-2">
          <div className="flex items-center mb-4">
            <FiFileText className="w-8 h-8 mr-2" />
            <GradientText colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]} animationSpeed={8} showBorder={false} className="w-[100%] p-4">
              <h1 className="w-full text-3xl font-extrabold max-sm:text-2xl">Additional Info</h1>
            </GradientText>
          </div>

          <div className="mb-4">
            <label className="font-semibold text-md">Job Description</label>
            <div className="border border-[#392e4e] rounded-lg px-2 py-2 w-full mt-4">
              <textarea name="job_description" value={formData.job_description} onChange={handleChange} className="w-full h-[150px] bg-transparent text-white placeholder-gray-400 border-none outline-none p-2" />
            </div>
          </div>

          <div className="mb-4">
            <label className="font-semibold text-md">Personal Notes</label>
            <div className="border border-[#392e4e] rounded-lg px-2 py-2 w-full mt-4">
              <textarea name="notes" value={formData.notes} onChange={handleChange} className="w-full h-[100px] bg-transparent text-white placeholder-gray-400 border-none outline-none p-2" />
            </div>
          </div>
        </div>

        {/* --- 6. TAGS --- */}
        <div className="w-full p-6 bg-[#060010] border border-[#392e4e] rounded-2xl max-sm:p-2">
          <div className="flex items-center mb-4">
            <FiTag className="w-8 h-8 mr-2" />
            <GradientText colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]} animationSpeed={8} showBorder={false} className="w-[100%] p-4">
              <h1 className="w-full text-3xl font-extrabold max-sm:text-2xl">Tags</h1>
            </GradientText>
          </div>
          
          <div className="mb-4">
            <label className="font-semibold text-md">Skills / Tags</label>
            <div className="border border-[#392e4e] rounded-lg px-2 py-2 w-full mt-4">
                <input type="text" value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={handleTagKeyDown} placeholder="e.g., React, Python" className="w-full bg-transparent text-white border-none outline-none p-2"/>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
                {tags.map((tag, i) => (
                    <span key={i} className="bg-purple-900 text-purple-200 px-3 py-1 rounded-full text-sm flex gap-2 items-center">
                        {tag} <button onClick={() => handleRemoveTag(tag)}><FiTrash2 size={12}/></button>
                    </span>
                ))}
            </div>
            <div className="pt-2">
                <RainbowButton onClick={handleAddTag} className="max-sm:text-xs max-sm:p-2" variant="outline">+ Add</RainbowButton>
            </div>
          </div>
        </div>

        {/* --- 7. DOCUMENT (With Existing File Logic) --- */}
        <div className="w-full p-6 bg-[#060010] border border-[#392e4e] rounded-2xl max-sm:p-2">
            <div className="flex items-center mb-4">
                <FiUploadCloud className="w-8 h-8 mr-2" />
                <GradientText colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]} animationSpeed={8} showBorder={false} className="w-[100%] p-4">
                    <h1 className="w-full text-3xl font-extrabold max-sm:text-2xl">Document</h1>
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
                </div>
            </div>

            <div className="mb-4">
                <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".pdf,.doc,.docx"/>
                
                <div className="border border-[#392e4e] rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-purple-900/20 transition-all" onClick={() => fileInputRef.current.click()}>
                    {selectedFile ? (
                        <div className="text-center">
                            <p className="text-green-400 font-bold flex items-center gap-2 justify-center"><FiCheck /> New: {selectedFile.name}</p>
                            <p className="text-xs text-gray-500">Ready to upload</p>
                        </div>
                    ) : existingFile ? (
                        <div className="text-center">
                            <p className="text-blue-400 font-bold flex items-center gap-2 justify-center"><FiFileText /> Current: {existingFile.file_name}</p>
                            <p className="text-xs text-gray-500">Click to replace this file</p>
                        </div>
                    ) : (
                        <p className="text-gray-400 flex items-center gap-2"><FiUploadCloud /> Upload document (PDF/Doc)</p>
                    )}
                </div>
            </div>
        </div>

        {/* --- BUTTONS --- */}
        <div className="flex gap-6 mt-4 pb-10">
          <div>
            <RainbowButton onClick={handleSubmit} variant="outline" disabled={loading}>
                <span>{loading ? "Updating..." : <FiCheck />}</span> 
                {loading ? "Please Wait" : "Update Application"}
            </RainbowButton>
          </div>
          <div>
            <RainbowButton onClick={() => navigate('/applications')} variant="default">Cancel</RainbowButton>
          </div>
        </div>

      </div>
    </main>
  );
}