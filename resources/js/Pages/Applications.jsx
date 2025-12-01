
import React from "react";
import GradientText from "@/Components/GradientText";
import { FiMapPin, FiDollarSign, FiSearch, FiDelete, FiEdit, FiCalendar} from 'react-icons/fi';
import DropdownButton from "@/Components/DropdownButton"
import ShinyText from "@/Components/ShinyText";
import AnimatedList from "@/Components/AnimatedList";
import { RainbowButton } from "@/Components/rainbow-button";
import CardNav from "@/Components/CardNav";
import DarkVeil from "@/Components/DarkVeil";


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

//Animated list items for All Applications Grid card!
const list1 = [
    <div key="1" className="flex flex-col relative">
        {/* Header */}
        <div className="flex gap-4 mb-2 max-sm:gap-3 max-sm:mb-1">
            <div>
            <img src="" alt="company logo" className="w-12 h-12 max-sm:w-10 max-sm:h-10" />
            </div>

            <div>
            <h1 className="text-xl font-semibold max-sm:text-lg">Google</h1>
            <p className="text-sm text-violet-200 pb-2 max-sm:pb-1 max-sm:text-xs">10 days ago</p>
            </div>
        </div>

        {/* Badges - Top Right */}
        <div className="flex gap-4 absolute top-4 right-4 max-sm:gap-2 max-sm:top-3 max-sm:right-3">
            <div className="bg-[#ff8c00] text-xs px-4 py-1.5 rounded-full text-white max-sm:px-3 max-sm:py-1 max-sm:text-[10px]">
            <div>
                <ShinyText 
                text="Interview" 
                disabled={false} 
                speed={3} 
                className='font-semibold text-sm max-sm:text-xs' 
                />
            </div>
            </div>

            <div className="bg-purple-600 text-xs px-4 py-1.5 rounded-full text-white max-sm:px-3 max-sm:py-1 max-sm:text-[10px]">
            <div>
                <ShinyText 
                text="Remote" 
                disabled={false} 
                speed={3} 
                className='font-semibold text-sm max-sm:text-xs' 
                />
            </div>
            </div>
        </div>

        {/* Job Details */}
        <div className="mt-6 max-sm:mt-4">
            <div>
            <h2 className="text-lg font-semibold mb-2 max-sm:text-base max-sm:mb-1">Senior Frontend Developer</h2>
            </div>

            <div className="flex gap-2 items-center mb-2 text-violet-100 max-sm:mb-1 max-sm:text-xs">
            <FiMapPin className="max-sm:w-3.5 max-sm:h-3.5" />
            <p className="text-sm max-sm:text-xs">Bangalore, India</p>
            </div>

            <div className="flex items-center gap-2 justify-start text-sm text-violet-100 mb-2 max-sm:mb-1 max-sm:text-xs">
            <FiCalendar className="h-4 w-4 max-sm:w-3.5 max-sm:h-3.5" />
            <p className="mr-4 max-sm:mr-2">20-10-2025</p>
            </div>

            <div className="flex gap-2 items-center text-violet-100 text-sm mb-4 max-sm:mb-2 max-sm:text-xs">
            <FiDollarSign className="max-sm:w-3.5 max-sm:h-3.5" />
            <p className="font-medium">40L - 45L</p>
            </div>

            <div className="flex flex-wrap gap-4 text-sm font-medium mb-2 max-sm:gap-2 max-sm:text-xs max-sm:mb-8">
            <p>React</p>
            <p>TypeScript</p>
            <p>Remote</p>
            </div>

            {/* Action Buttons - Bottom Right */}
            <div className="flex gap-4 absolute bottom-4 right-4 max-sm:gap-2 max-sm:bottom-3 max-sm:right-3">
            <div className="w-10 h-10 border border-[#392e4e] text-gray-200 rounded-lg flex justify-center items-center max-sm:w-9 max-sm:h-9">
                <FiEdit className="max-sm:w-3.5 max-sm:h-3.5" />
            </div>
            <div className="w-10 h-10 border border-red-800 text-red-600 rounded-lg flex justify-center items-center max-sm:w-9 max-sm:h-9">
                <FiDelete className="max-sm:w-3.5 max-sm:h-3.5" />
            </div>
            </div>
        </div>
    </div>,

    <div key="2" className="flex flex-col relative">
        {/* Header */}
        <div className="flex gap-4 mb-2 max-sm:gap-3 max-sm:mb-1">
            <div>
            <img src="" alt="company logo" className="w-12 h-12 max-sm:w-10 max-sm:h-10" />
            </div>

            <div>
            <h1 className="text-xl font-semibold max-sm:text-lg">Google</h1>
            <p className="text-sm text-violet-200 pb-2 max-sm:pb-1 max-sm:text-xs">10 days ago</p>
            </div>
        </div>

        {/* Badges - Top Right */}
        <div className="flex gap-4 absolute top-4 right-4 max-sm:gap-2 max-sm:top-3 max-sm:right-3">
            <div className="bg-[#ff8c00] text-xs px-4 py-1.5 rounded-full text-white max-sm:px-3 max-sm:py-1 max-sm:text-[10px]">
            <div>
                <ShinyText 
                text="Interview" 
                disabled={false} 
                speed={3} 
                className='font-semibold text-sm max-sm:text-xs' 
                />
            </div>
            </div>

            <div className="bg-purple-600 text-xs px-4 py-1.5 rounded-full text-white max-sm:px-3 max-sm:py-1 max-sm:text-[10px]">
            <div>
                <ShinyText 
                text="Remote" 
                disabled={false} 
                speed={3} 
                className='font-semibold text-sm max-sm:text-xs' 
                />
            </div>
            </div>
        </div>

        {/* Job Details */}
        <div className="mt-6 max-sm:mt-4">
            <div>
            <h2 className="text-lg font-semibold mb-2 max-sm:text-base max-sm:mb-1">Senior Frontend Developer</h2>
            </div>

            <div className="flex gap-2 items-center mb-2 text-violet-100 max-sm:mb-1 max-sm:text-xs">
            <FiMapPin className="max-sm:w-3.5 max-sm:h-3.5" />
            <p className="text-sm max-sm:text-xs">Bangalore, India</p>
            </div>

            <div className="flex items-center gap-2 justify-start text-sm text-violet-100 mb-2 max-sm:mb-1 max-sm:text-xs">
            <FiCalendar className="h-4 w-4 max-sm:w-3.5 max-sm:h-3.5" />
            <p className="mr-4 max-sm:mr-2">20-10-2025</p>
            </div>

            <div className="flex gap-2 items-center text-violet-100 text-sm mb-4 max-sm:mb-2 max-sm:text-xs">
            <FiDollarSign className="max-sm:w-3.5 max-sm:h-3.5" />
            <p className="font-medium">40L - 45L</p>
            </div>

            <div className="flex flex-wrap gap-4 text-sm font-medium mb-2 max-sm:gap-2 max-sm:text-xs max-sm:mb-8">
            <p>React</p>
            <p>TypeScript</p>
            <p>Remote</p>
            </div>

            {/* Action Buttons - Bottom Right */}
            <div className="flex gap-4 absolute bottom-4 right-4 max-sm:gap-2 max-sm:bottom-3 max-sm:right-3">
            <div className="w-10 h-10 border border-[#392e4e] text-gray-200 rounded-lg flex justify-center items-center max-sm:w-9 max-sm:h-9">
                <FiEdit className="max-sm:w-3.5 max-sm:h-3.5" />
            </div>
            <div className="w-10 h-10 border border-red-800 text-red-600 rounded-lg flex justify-center items-center max-sm:w-9 max-sm:h-9">
                <FiDelete className="max-sm:w-3.5 max-sm:h-3.5" />
            </div>
            </div>
        </div>
    </div>,

    <div key="3" className="flex flex-col relative">
        {/* Header */}
        <div className="flex gap-4 mb-2 max-sm:gap-3 max-sm:mb-1">
            <div>
            <img src="" alt="company logo" className="w-12 h-12 max-sm:w-10 max-sm:h-10" />
            </div>

            <div>
            <h1 className="text-xl font-semibold max-sm:text-lg">Google</h1>
            <p className="text-sm text-violet-200 pb-2 max-sm:pb-1 max-sm:text-xs">10 days ago</p>
            </div>
        </div>

        {/* Badges - Top Right */}
        <div className="flex gap-4 absolute top-4 right-4 max-sm:gap-2 max-sm:top-3 max-sm:right-3">
            <div className="bg-[#ff8c00] text-xs px-4 py-1.5 rounded-full text-white max-sm:px-3 max-sm:py-1 max-sm:text-[10px]">
            <div>
                <ShinyText 
                text="Interview" 
                disabled={false} 
                speed={3} 
                className='font-semibold text-sm max-sm:text-xs' 
                />
            </div>
            </div>

            <div className="bg-purple-600 text-xs px-4 py-1.5 rounded-full text-white max-sm:px-3 max-sm:py-1 max-sm:text-[10px]">
            <div>
                <ShinyText 
                text="Remote" 
                disabled={false} 
                speed={3} 
                className='font-semibold text-sm max-sm:text-xs' 
                />
            </div>
            </div>
        </div>

        {/* Job Details */}
        <div className="mt-6 max-sm:mt-4">
            <div>
            <h2 className="text-lg font-semibold mb-2 max-sm:text-base max-sm:mb-1">Senior Frontend Developer</h2>
            </div>

            <div className="flex gap-2 items-center mb-2 text-violet-100 max-sm:mb-1 max-sm:text-xs">
            <FiMapPin className="max-sm:w-3.5 max-sm:h-3.5" />
            <p className="text-sm max-sm:text-xs">Bangalore, India</p>
            </div>

            <div className="flex items-center gap-2 justify-start text-sm text-violet-100 mb-2 max-sm:mb-1 max-sm:text-xs">
            <FiCalendar className="h-4 w-4 max-sm:w-3.5 max-sm:h-3.5" />
            <p className="mr-4 max-sm:mr-2">20-10-2025</p>
            </div>

            <div className="flex gap-2 items-center text-violet-100 text-sm mb-4 max-sm:mb-2 max-sm:text-xs">
            <FiDollarSign className="max-sm:w-3.5 max-sm:h-3.5" />
            <p className="font-medium">40L - 45L</p>
            </div>

            <div className="flex flex-wrap gap-4 text-sm font-medium mb-2 max-sm:gap-2 max-sm:text-xs max-sm:mb-8">
            <p>React</p>
            <p>TypeScript</p>
            <p>Remote</p>
            </div>

            {/* Action Buttons - Bottom Right */}
            <div className="flex gap-4 absolute bottom-4 right-4 max-sm:gap-2 max-sm:bottom-3 max-sm:right-3">
            <div className="w-10 h-10 border border-[#392e4e] text-gray-200 rounded-lg flex justify-center items-center max-sm:w-9 max-sm:h-9">
                <FiEdit className="max-sm:w-3.5 max-sm:h-3.5" />
            </div>
            <div className="w-10 h-10 border border-red-800 text-red-600 rounded-lg flex justify-center items-center max-sm:w-9 max-sm:h-9">
                <FiDelete className="max-sm:w-3.5 max-sm:h-3.5" />
            </div>
            </div>
        </div>
    </div>,
  
   <div key="4" className="flex flex-col relative">
        {/* Header */}
        <div className="flex gap-4 mb-2 max-sm:gap-3 max-sm:mb-1">
            <div>
            <img src="" alt="company logo" className="w-12 h-12 max-sm:w-10 max-sm:h-10" />
            </div>

            <div>
            <h1 className="text-xl font-semibold max-sm:text-lg">Google</h1>
            <p className="text-sm text-violet-200 pb-2 max-sm:pb-1 max-sm:text-xs">10 days ago</p>
            </div>
        </div>

        {/* Badges - Top Right */}
        <div className="flex gap-4 absolute top-4 right-4 max-sm:gap-2 max-sm:top-3 max-sm:right-3">
            <div className="bg-[#ff8c00] text-xs px-4 py-1.5 rounded-full text-white max-sm:px-3 max-sm:py-1 max-sm:text-[10px]">
            <div>
                <ShinyText 
                text="Interview" 
                disabled={false} 
                speed={3} 
                className='font-semibold text-sm max-sm:text-xs' 
                />
            </div>
            </div>

            <div className="bg-purple-600 text-xs px-4 py-1.5 rounded-full text-white max-sm:px-3 max-sm:py-1 max-sm:text-[10px]">
            <div>
                <ShinyText 
                text="Remote" 
                disabled={false} 
                speed={3} 
                className='font-semibold text-sm max-sm:text-xs' 
                />
            </div>
            </div>
        </div>

        {/* Job Details */}
        <div className="mt-6 max-sm:mt-4">
            <div>
            <h2 className="text-lg font-semibold mb-2 max-sm:text-base max-sm:mb-1">Senior Frontend Developer</h2>
            </div>

            <div className="flex gap-2 items-center mb-2 text-violet-100 max-sm:mb-1 max-sm:text-xs">
            <FiMapPin className="max-sm:w-3.5 max-sm:h-3.5" />
            <p className="text-sm max-sm:text-xs">Bangalore, India</p>
            </div>

            <div className="flex items-center gap-2 justify-start text-sm text-violet-100 mb-2 max-sm:mb-1 max-sm:text-xs">
            <FiCalendar className="h-4 w-4 max-sm:w-3.5 max-sm:h-3.5" />
            <p className="mr-4 max-sm:mr-2">20-10-2025</p>
            </div>

            <div className="flex gap-2 items-center text-violet-100 text-sm mb-4 max-sm:mb-2 max-sm:text-xs">
            <FiDollarSign className="max-sm:w-3.5 max-sm:h-3.5" />
            <p className="font-medium">40L - 45L</p>
            </div>

            <div className="flex flex-wrap gap-4 text-sm font-medium mb-2 max-sm:gap-2 max-sm:text-xs max-sm:mb-8">
            <p>React</p>
            <p>TypeScript</p>
            <p>Remote</p>
            </div>

            {/* Action Buttons - Bottom Right */}
            <div className="flex gap-4 absolute bottom-4 right-4 max-sm:gap-2 max-sm:bottom-3 max-sm:right-3">
            <div className="w-10 h-10 border border-[#392e4e] text-gray-200 rounded-lg flex justify-center items-center max-sm:w-9 max-sm:h-9">
                <FiEdit className="max-sm:w-3.5 max-sm:h-3.5" />
            </div>
            <div className="w-10 h-10 border border-red-800 text-red-600 rounded-lg flex justify-center items-center max-sm:w-9 max-sm:h-9">
                <FiDelete className="max-sm:w-3.5 max-sm:h-3.5" />
            </div>
            </div>
        </div>
    </div>,

   <div key="5" className="flex flex-col relative">
        {/* Header */}
        <div className="flex gap-4 mb-2 max-sm:gap-3 max-sm:mb-1">
            <div>
            <img src="" alt="company logo" className="w-12 h-12 max-sm:w-10 max-sm:h-10" />
            </div>

            <div>
            <h1 className="text-xl font-semibold max-sm:text-lg">Google</h1>
            <p className="text-sm text-violet-200 pb-2 max-sm:pb-1 max-sm:text-xs">10 days ago</p>
            </div>
        </div>

        {/* Badges - Top Right */}
        <div className="flex gap-4 absolute top-4 right-4 max-sm:gap-2 max-sm:top-3 max-sm:right-3">
            <div className="bg-[#ff8c00] text-xs px-4 py-1.5 rounded-full text-white max-sm:px-3 max-sm:py-1 max-sm:text-[10px]">
            <div>
                <ShinyText 
                text="Interview" 
                disabled={false} 
                speed={3} 
                className='font-semibold text-sm max-sm:text-xs' 
                />
            </div>
            </div>

            <div className="bg-purple-600 text-xs px-4 py-1.5 rounded-full text-white max-sm:px-3 max-sm:py-1 max-sm:text-[10px]">
            <div>
                <ShinyText 
                text="Remote" 
                disabled={false} 
                speed={3} 
                className='font-semibold text-sm max-sm:text-xs' 
                />
            </div>
            </div>
        </div>

        {/* Job Details */}
        <div className="mt-6 max-sm:mt-4">
            <div>
            <h2 className="text-lg font-semibold mb-2 max-sm:text-base max-sm:mb-1">Senior Frontend Developer</h2>
            </div>

            <div className="flex gap-2 items-center mb-2 text-violet-100 max-sm:mb-1 max-sm:text-xs">
            <FiMapPin className="max-sm:w-3.5 max-sm:h-3.5" />
            <p className="text-sm max-sm:text-xs">Bangalore, India</p>
            </div>

            <div className="flex items-center gap-2 justify-start text-sm text-violet-100 mb-2 max-sm:mb-1 max-sm:text-xs">
            <FiCalendar className="h-4 w-4 max-sm:w-3.5 max-sm:h-3.5" />
            <p className="mr-4 max-sm:mr-2">20-10-2025</p>
            </div>

            <div className="flex gap-2 items-center text-violet-100 text-sm mb-4 max-sm:mb-2 max-sm:text-xs">
            <FiDollarSign className="max-sm:w-3.5 max-sm:h-3.5" />
            <p className="font-medium">40L - 45L</p>
            </div>

            <div className="flex flex-wrap gap-4 text-sm font-medium mb-2 max-sm:gap-2 max-sm:text-xs max-sm:mb-8">
            <p>React</p>
            <p>TypeScript</p>
            <p>Remote</p>
            </div>

            {/* Action Buttons - Bottom Right */}
            <div className="flex gap-4 absolute bottom-4 right-4 max-sm:gap-2 max-sm:bottom-3 max-sm:right-3">
            <div className="w-10 h-10 border border-[#392e4e] text-gray-200 rounded-lg flex justify-center items-center max-sm:w-9 max-sm:h-9">
                <FiEdit className="max-sm:w-3.5 max-sm:h-3.5" />
            </div>
            <div className="w-10 h-10 border border-red-800 text-red-600 rounded-lg flex justify-center items-center max-sm:w-9 max-sm:h-9">
                <FiDelete className="max-sm:w-3.5 max-sm:h-3.5" />
            </div>
            </div>
        </div>
    </div>,
];

export default function Applications() {
    return (
        <main className="w-[calc(100vw-0px)] flex flex-col p-20 max-sm:p-6">
            <div className="absolute inset-0 opacity-70 mix-blend-screen">
                <div style={{ width: '100%', height: '600px', position: 'relative' }}>
                    <DarkVeil />
                </div>
            </div>

            <header className="py-8">
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
                <GradientText
                    colors={["#8660fa", "#a855f7", "#8400ff", "#a855f7", "#8660fa"]}
                    animationSpeed={8}
                    showBorder={false}
                    className="custom-class"
                    >
                    <h1 className="text-5xl font-extrabold mt-10 mb-4 max-sm:text-2xl max-sm:mt-4 max-sm:mb-2">My Applications</h1>
                </GradientText>
                <p className="text-purple-100 text-xl font-medium pb-4 max-sm:text-xs max-sm:w-[60%]">Track and manage all your job applications</p>
                
                <div className="absolute bottom-[50%] right-0 ">
                    <RainbowButton className="max-sm:text-xs max-sm:p-2" variant="outline" >+ Add Application</RainbowButton>
                </div>
            </div>

            <div className=" w-[100%]">
                <div className="h-full w-full flex flex-col gap-4 pb-10">
                    <div className="w-full flex gap-4">
                        <div className="border border-[#392e4e] w-[100%] h-[100%] rounded-lg p-8 bg-[#060010] max-sm:p-4">
                            <div className=" flex flex-col items-start justify-center h-full">
                            <GradientText
                                colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                                animationSpeed={3}
                                showBorder={false}
                                className="custom-class"
                                >
                                <p className="text-5xl font-extrabold w-full mb-1 max-sm:text-3xl">100+</p>
                            </GradientText>
                            <div>
                                <h3 className="text-2xl font-bold max-sm:text-sm">Total Applications</h3>
                                <p className="text-xs text-violet-200 max-sm:text-[8px]">All jobs you've applied so far.</p>
                            </div>
                            </div>
                
                        </div>
                        <div className="border border-[#392e4e] w-[100%] h-[100%] rounded-lg p-8 bg-[#060010] max-sm:p-4">
                            <div className=" flex flex-col items-start justify-center h-full">
                            <GradientText
                                colors={["#FF4500", "#DAA520", "#FF4500", "#DAA520", "#FF4500"]}
                                animationSpeed={3}
                                showBorder={false}
                                className="custom-class"
                                >
                                <p className="text-5xl font-extrabold w-full mb-1 max-sm:text-3xl">35+</p>
                            </GradientText>
                            <div>
                                <h3 className="text-2xl font-bold max-sm:text-sm">Interviews</h3>
                                <p className="text-xs text-violet-200 max-sm:text-[8px]">Upcoming interview rounds.</p>
                            </div>
                            </div>
                        </div>
                        </div>
        
                        <div className="w-full h-[50%] flex gap-4">
                        <div className="border border-[#392e4e] w-[100%] h-[100%] rounded-lg p-8 bg-[#060010] max-sm:p-4">
                            <div className=" flex flex-col items-start justify-center h-full ">
                            <GradientText
                                colors={["#DC143C", "#B22222", "#DC143C", "#B22222", "#DC143C"]}
                                animationSpeed={3}
                                showBorder={false}
                                className="custom-class"
                                >
                                <p className="text-5xl font-extrabold w-full mb-1 max-sm:text-3xl">12+</p>
                            </GradientText>
                            <div>
                                <h3 className="text-2xl font-bold max-sm:text-sm">Rejected</h3>
                                <p className="text-xs text-violet-200 max-sm:text-[7px]">Applications that didn't make it through.</p>
                            </div>
                            </div>
                
                        </div>
                        <div className="border border-[#392e4e] w-[100%] h-[100%] rounded-lg p-8 bg-[#060010] max-sm:p-4">
                            <div className=" flex flex-col items-start justify-center h-full ">
                            <GradientText
                                colors={["#32CD32", "#228B22", "#32CD32", "#228B22", "#32CD32"]}
                                animationSpeed={3}
                                showBorder={false}
                                className="custom-class"
                                >
                                <p className="text-5xl font-extrabold w-full mb-1 max-sm:text-3xl">15+</p>
                            </GradientText>
                            <div>
                                <h3 className="text-2xl font-bold max-sm:text-sm">Offers</h3>
                                <p className="text-xs text-violet-200 max-sm:text-[8px]">Jobs you've successfully secured.</p>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search and filter */}
                <div className="w-full gap-4 flex mb-8">
                    <div className="flex items-center gap-2 border bg-[#060010] border-[#392e4e] rounded-md px-4 py-0 w-full max-sm:px-2 max-sm:py-0">
                        <FiSearch className="text-gray-400 text-xl" />
                        <div className="w-[100%]">
                            <input
                                type="text"
                                placeholder="Search companies, positions..."
                                className=" w-full flex-1 bg-transparent text-white placeholder-gray-400 border-none outline-none focus:ring-0 focus:shadow-none p-2 max-sm:text-xs"
                            />
                        </div>
                    </div>
                    <div className="w-[45%] max-sm:w-[35%] ">
                        <DropdownButton className="max-sm:text-xs" />
                    </div>
                </div>

                {/* Applications card */}

                <div className="w-full ">

                    <div className="border border-[#392e4e] bg-[#060010] rounded-lg p-4 h-[calc(100vh-100px)] max-sm:p-0">
                        <AnimatedList
                        items={list1}
                        onItemSelect={(item, index) => console.log(item, index)}
                        showGradients={true}
                        enableArrowNavigation={true}
                        displayScrollbar={true}
                        />
                    </div>

                </div>
            </div>
        </main>
    );
}