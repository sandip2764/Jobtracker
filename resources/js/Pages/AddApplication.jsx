import react from "react";
import GradientText from "@/Components/GradientText";
import CardNav from "@/Components/CardNav";
import { FiMapPin, FiArrowLeft, FiDollarSign, FiFileText, FiCalendar, FiBriefcase, FiTag, FiDownload, FiUploadCloud, FiCheck, FiCrosshair} from 'react-icons/fi';
import { RainbowButton } from "@/Components/rainbow-button";
import DropdownButton from "@/Components/DropdownButton2";
import DropdownStatusButton from "@/Components/DropdownButton";
import DropdownButton2 from "@/Components/DropdownButton3";
import DropdownSourceButton from "@/Components/DropdownSource";


//nav items
const Navitems = [
  {
    label: "Dashboard",
    bgColor: "#0D0716",
    textColor: "#fff",
    links: [
      { label: "Overview", ariaLabel: "Overview" },
      { label: "Applications", ariaLabel: "Applications" },
      { label: "Add New", ariaLabel: "Create application" }
    ]
  },
  {
    label: "Tools", 
    bgColor: "#170D27",
    textColor: "#fff",
    links: [
      { label: "Analytics", ariaLabel: "charts & insights" },
      { label: "Interview Prep", ariaLabel: "questions" },
      { label: "Resume Scorer", ariaLabel: "ATS optimizer" },

      
    ]
  },
  {
    label: "Account",
    bgColor: "#271E37", 
    textColor: "#fff",
    links: [
      { label: "My Profile", ariaLabel: "edit details" },
      { label: "Settings", ariaLabel: "preferences" },
      { label: "Logout", ariaLabel: "sign out" }
    ]
  }
];
export default function AddApplication() {
  return (
  <main className="w-[calc(100vw-0px)] flex flex-col p-36 max-sm:p-6">
    <header className="py-8 mb-4">
      <CardNav
      logoAlt="Company Logo"
      items={Navitems}
      baseColor="rgba(0, 0, 0, 0.3)" 
      menuColor="#000"
      buttonBgColor="#111"
      buttonTextColor="#fff"
      ease="power3.out"
      />
    </header>
    <div className="pb-10 relative">
      <div className="">
        <RainbowButton className="max-sm:text-xs max-sm:p-2" variant="outline" ><span><FiArrowLeft /></span>Back To Applications</RainbowButton>
      </div>
      <div>
        <GradientText
          colors={["#8660fa", "#a855f7", "#8400ff", "#a855f7", "#8660fa"]}
          animationSpeed={3}
          showBorder={false}
          className="custom-class"
          >
          <h1 className="text-5xl font-extrabold mt-10 mb-4 max-sm:text-2xl max-sm:mt-4 max-sm:mb-2">Add New Application</h1>
        </GradientText>
      </div>
      <p className="text-purple-100 text-xl font-medium pb-4 max-sm:text-xs max-sm:w-[60%]">Fill in the details of your job application</p>
    </div>

    <div className="w-full flex flex-col gap-6">

      {/* job details */}

      <div className="w-full p-6 bg-[#060010] border border-[#392e4e] rounded-2xl max-sm:p-2">
        <div className="flex items-center mb-4">
          <div>
            <FiBriefcase className="w-6 h-6"/>
          </div>
          <div className="">
            <GradientText
              colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
              animationSpeed={8}
              showBorder={false}
              className="w-[100%] p-4"
              >
              <h1 className="w-full text-3xl font-extrabold max-sm:text-2xl max-sm:mt-4 max-sm:mb-2">Job Details</h1>
            </GradientText>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="companyName" className="font-semibold text-md ">Company Name</label>
          <div className="border border-[#392e4e] rounded-lg px-2 py-2 w-full mt-4">
            <input
              type="text"
              placeholder="e.g., Google, Amazon, Microsoft"
              className="w-full flex-1 bg-transparent text-white placeholder-gray-400 border-none outline-none focus:ring-0 focus:shadow-none p-2"
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="companyName" className="font-semibold text-md ">Positon/Role</label>
          <div className="border border-[#392e4e] rounded-lg px-2 py-2 w-full mt-4">
            <input
              type="text"
              placeholder="e.g., Software Engineer, Data Analyst"
              className="w-full flex-1 bg-transparent text-white placeholder-gray-400 border-none outline-none focus:ring-0 focus:shadow-none p-2"
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="companyName" className="font-semibold text-md ">Job URL <span className="font-normal text-gray-300">(optional)</span></label>
          <div className="border border-[#392e4e] rounded-lg px-2 py-2 w-full mt-4">
            <input
              type="text"
              placeholder="e.g., https://www.example.com/job-posting"
              className="w-full flex-1 bg-transparent text-white placeholder-gray-400 border-none outline-none focus:ring-0 focus:shadow-none p-2"
            />
          </div>
        </div>
      </div>

      {/* locations and work type */}

      <div className="w-full p-6 bg-[#060010] border border-[#392e4e] rounded-2xl max-sm:p-2">
        <div className="flex items-center mb-4">
          <div>
            <FiMapPin className="w-6 h-6"/>
          </div>
          <div className="">
            <GradientText
              colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
              animationSpeed={8}
              showBorder={false}
              className="w-[100%] p-4"
              >
              <h1 className="w-full text-3xl font-extrabold max-sm:text-2xl max-sm:mt-4 max-sm:mb-2">Location & Work Type</h1>
            </GradientText>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="companyName" className="font-semibold text-md ">Location</label>
          <div className="border border-[#392e4e] rounded-lg px-2 py-2 w-full mt-4">
            <input
              type="text"
              placeholder="e.g., New York, Remote, San Francisco"
              className="w-full flex-1 bg-transparent text-white placeholder-gray-400 border-none outline-none focus:ring-0 focus:shadow-none p-2"
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="companyName" className="font-semibold text-md ">Work Type</label>
          <div className="w-full mt-4">
            <DropdownButton className="max-sm:text-xs" />
          </div>
        </div>
      </div>

      {/* compention */}

      <div className="w-full p-6 bg-[#060010] border border-[#392e4e] rounded-2xl max-sm:p-2">
        <div className="flex items-center mb-4">
          <div>
            <FiDollarSign className="w-8 h-8"/>
          </div>
          <div className="">
            <GradientText
              colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
              animationSpeed={8}
              showBorder={false}
              className="w-[100%] p-4"
              >
              <h1 className="w-full text-3xl font-extrabold max-sm:text-2xl max-sm:mt-4 max-sm:mb-2">Compention</h1>
            </GradientText>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="Minsalary" className="font-semibold text-md ">Minimum Salary (₹)</label>
          <div className="border border-[#392e4e] rounded-lg px-2 py-2 w-full mt-4">
            <input
              type="text"
              placeholder="e.g., 10LPA"
              className="w-full flex-1 bg-transparent text-white placeholder-gray-400 border-none outline-none focus:ring-0 focus:shadow-none p-2"
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="MaxSalary" className="font-semibold text-md ">Maximum Salary (₹)</label>
          <div className="border border-[#392e4e] rounded-lg px-2 py-2 w-full mt-4">
            <input
              type="text"
              placeholder="e.g., 1CR"
              className="w-full flex-1 bg-transparent text-white placeholder-gray-400 border-none outline-none focus:ring-0 focus:shadow-none p-2"
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="companyName" className="font-semibold text-md ">Salary Type</label>
          <div className="w-full mt-4">
            <DropdownButton2 className="max-sm:text-xs" />
          </div>
        </div>
      </div>

      {/* Application status */}

      <div className="w-full p-6 bg-[#060010] border border-[#392e4e] rounded-2xl max-sm:p-2">
        <div className="flex items-center mb-4">
          <div>
            <FiCalendar className="w-8 h-8"/>
          </div>
          <div className="">
            <GradientText
              colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
              animationSpeed={8}
              showBorder={false}
              className="w-[100%] p-4"
              >
              <h1 className="w-full text-3xl font-extrabold max-sm:text-2xl max-sm:mt-4 max-sm:mb-2">Application Status</h1>
            </GradientText>
          </div>
        </div>

        <div className="mb-4">
          <div className="mb-4">
            <label htmlFor="companyName" className="font-semibold text-md ">Status</label>
            <div className="w-full mt-4">
              <DropdownStatusButton className="max-sm:text-xs" />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="MaxSalary" className="font-semibold text-md ">Applied Date</label>
          <div className="border border-[#392e4e] rounded-lg px-2 py-2 w-full mt-4">
            <input
              type="date"
              placeholder=""
              className="w-full flex-1 bg-transparent text-white placeholder-gray-400 border-none outline-none focus:ring-0 focus:shadow-none p-2"
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="companyName" className="font-semibold text-md ">Source</label>
          <div className="w-full mt-4">
            <DropdownSourceButton className="max-sm:text-xs" />
          </div>
        </div>
      </div>

      {/* job des */}

      <div className="w-full p-6 bg-[#060010] border border-[#392e4e] rounded-2xl max-sm:p-2">
        <div className="flex items-center mb-4">
          <div>
            <FiFileText className="w-8 h-8"/>
          </div>
          <div className="">
            <GradientText
              colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
              animationSpeed={8}
              showBorder={false}
              className="w-[100%] p-4"
              >
              <h1 className="w-full text-3xl font-extrabold max-sm:text-2xl max-sm:mt-4 max-sm:mb-2">Additional Information</h1>
            </GradientText>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="MaxSalary" className="font-semibold text-md ">Job Description <span className="font-normal text-gray-300">(optional)</span></label>
          <div className="border border-[#392e4e] rounded-lg px-2 py-2 w-full mt-4">
            <textarea
              type="text"
              placeholder="Paste the job description here..."
              className="w-full h-[200px] flex-1 bg-transparent text-white placeholder-gray-400 border-none outline-none focus:ring-0 focus:shadow-none p-2"
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="MaxSalary" className="font-semibold text-md ">Personal Notes <span className="font-normal text-gray-300">(optional)</span></label>
          <div className="border border-[#392e4e] rounded-lg px-2 py-2 w-full mt-4">
            <textarea
              type="text"
              placeholder="Paste the personal notes here..."
              className="w-full h-[120px] flex-1 bg-transparent text-white placeholder-gray-400 border-none outline-none focus:ring-0 focus:shadow-none p-2"
            />
          </div>
        </div>
      </div>

      {/* Tags */}

      <div className="w-full p-6 bg-[#060010] border border-[#392e4e] rounded-2xl max-sm:p-2">
        <div className="flex items-center mb-4">
          <div>
            <FiTag className="w-8 h-8"/>
          </div>
          <div className="">
            <GradientText
              colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
              animationSpeed={8}
              showBorder={false}
              className="w-[100%] p-4"
              >
              <h1 className="w-full text-3xl font-extrabold max-sm:text-2xl max-sm:mt-4 max-sm:mb-2">Tags</h1>
            </GradientText>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="MaxSalary" className="font-semibold text-md ">Job Description <span className="font-normal text-gray-300">(optional)</span></label>
          <div className="flex gap-4 justify-center items-center">
            <div className="border border-[#392e4e] rounded-lg px-2 py-0 w-full mt-4">
              <input
                type="text"
                placeholder="e.g., React, JavaScript, Python"
                className="w-full flex-1 bg-transparent text-white placeholder-gray-400 border-none outline-none focus:ring-0 focus:shadow-none p-2"
              />
            </div>
          
            <div className="">
              <RainbowButton className="mt-4 max-sm:text-xs max-sm:p-2" variant="outline">+ Add Tag</RainbowButton>
            </div>
          </div>
        </div>
      </div>

      {/* Upload resume */}

      <div className="w-full p-6 bg-[#060010] border border-[#392e4e] rounded-2xl max-sm:p-2">
        <div className="flex items-center mb-4">
          <div>
            <FiDownload className="w-8 h-8"/>
          </div>
          <div className="">
            <GradientText
              colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
              animationSpeed={8}
              showBorder={false}
              className="w-[100%] p-4"
              >
              <h1 className="w-full text-3xl font-extrabold max-sm:text-2xl max-sm:mt-4 max-sm:mb-2">Documents</h1>
            </GradientText>
          </div>
        </div>

        <div className="mb-4">
          <div className="border border-[#392e4e] rounded-lg px-2 py-0 w-full mt-4">
            <div className="flex flex-col justify-center items-center p-6 py-12 gap-4">
              <div>
                <FiUploadCloud className="h-12 w-12"/>
              </div>
              <div className="flex flex-col justify-center items-center">
                <p className="font-semibold text-lg mb-1">Click to upload or drag and drop</p>
                <p className="text-gray-300">Resume, Cover Letter (PDF, DOC, DOCX - Max 5MB)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-6 mt-4">
        <div>
          <RainbowButton className="" variant="outline" ><span><FiCheck /></span>Save Application</RainbowButton>
        </div>
        <div>
          <RainbowButton className="" variant="default" >Cancle</RainbowButton>
        </div>
      </div>
      
    </div>


  </main>
  );
}
