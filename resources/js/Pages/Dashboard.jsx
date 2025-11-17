// src/pages/Dashboard.jsx
import React from "react";
import DarkVeil from '../Components/DarkVeil';
import MagicBento from '../components/MagicBento';
import GradientText from '../Components/GradientText'
import BlurText from "../Components/BlurText"; 
import { FiFileText, FiBook, FiSearch, FiFilter, FiEdit, FiBarChart2, FiCalendar, FiClock} from 'react-icons/fi';
import GlassIcons from '../Components/GlassIcons'
import AnimatedList from '../Components/AnimatedList';
import ShinyText from '../Components/ShinyText';
import { RainbowButton } from '../Components/rainbow-button';
import CardNav from "@/Components/CardNav";

// Function to handle animation completion

const handleAnimationComplete = () => {
  console.log('Animation completed!');
};

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


// update with your own icons and colors
const group1 = [
  { icon: <FiFileText />, color: 'blue', label: 'Resume builder' },
  { icon: <FiBook />, color: 'purple', label: 'Interview Prep' },
  { icon: <FiBarChart2 />, color: 'green', label: 'Analytics' },
];

const group2 = [
  { icon: <FiCalendar />, color: 'purple' }
];

const group3 = [
  { icon: <FiCalendar />, color: 'blue' }
];

// Animated list items for Upcoming Interviews Grid card!
const list1 = [
  <div key="1" className="flex relative">
    <div>
      <GlassIcons icons={group3} className="p-4"/>
    </div>
    <div className="pt-2">
      <div className=" absolute top-4 right-0 bg-purple-700 text-xs px-4 py-1.5 rounded-full text-white">
        <ShinyText 
        text="Technical Round" 
        disabled={false} 
        speed={3} 
        className='font-semibold text-sm' 
      />
      </div>
      <h1 className="text-1xl font-semibold">Google</h1>
      <p className="text-sm text-violet-200 pb-2">Senior Frontend Developer</p>
      <div className="flex items-center justify-start text-xs text-violet-100">
        <FiCalendar className="h-4 w-4 mr-1" />
        <p className="mr-4">20-10-2025</p>
        <div className="flex ">
          <FiClock className="h-4 w-4 mr-1" />
          <p className="font-medium">2:00 PM</p>
        </div>
      </div>
    </div>
  </div>,

  <div key="2" className="flex relative">
    <div>
      <GlassIcons icons={group3} className="p-4"/>
    </div>
    <div className="pt-2">
      <div className=" absolute top-4 right-0 bg-purple-600 text-xs px-4 py-1.5 rounded-full text-white">
        <ShinyText 
        text="Last Round" 
        disabled={false} 
        speed={3} 
        className='font-semibold text-sm' 
      />
      </div>
      <h1 className="text-1xl font-semibold">Netflix</h1>
      <p className="text-sm text-violet-200 pb-2">Frontend Developer</p>
      <div className="flex items-center justify-start text-xs text-violet-100">
        <FiCalendar className="h-4 w-4 mr-1" />
        <p className="mr-4">10-10-2025</p>
        <div className="flex ">
          <FiClock className="h-4 w-4 mr-1" />
          <p className="font-medium">1:00 PM</p>
        </div>
      </div>
    </div>
  </div>,

  <div key="3" className="flex relative">
    <div>
      <GlassIcons icons={group3} className="p-4"/>
    </div>
    <div className="pt-2">
      <div className=" absolute top-4 right-0 bg-purple-600 text-xs px-4 py-1.5 rounded-full text-white">
        <ShinyText 
        text="First Round" 
        disabled={false} 
        speed={3} 
        className='font-semibold text-sm' 
      />
      </div>
      <h1 className="text-1xl font-semibold">Amazon</h1>
      <p className="text-sm text-violet-200 pb-2">Backend Developer</p>
      <div className="flex items-center justify-start text-xs text-violet-100">
        <FiCalendar className="h-4 w-4 mr-1" />
        <p className="mr-4">20-10-2025</p>
        <div className="flex ">
          <FiClock className="h-4 w-4 mr-1" />
          <p className="font-medium">12:00 PM</p>
        </div>
      </div>
    </div>
  </div>,

  
  <div key="4" className="flex relative">
    <div>
      <GlassIcons icons={group3} className="p-4"/>
    </div>
    <div className="pt-2">
      <div className=" absolute top-4 right-0 bg-purple-600 text-xs px-4 py-1.5 rounded-full text-white">
        <ShinyText 
        text="HR Round" 
        disabled={false} 
        speed={3} 
        className='font-semibold text-sm' 
      />
      </div>
      <h1 className="text-1xl font-semibold">Meta</h1>
      <p className="text-sm text-violet-200 pb-2">Ai engineear</p>
      <div className="flex items-center justify-start text-xs text-violet-100">
        <FiCalendar className="h-4 w-4 mr-1" />
        <p className="mr-4">20-10-2025</p>
        <div className="flex ">
          <FiClock className="h-4 w-4 mr-1" />
          <p className="font-medium">10:00 AM</p>
        </div>
      </div>
    </div>
  </div>,

  <div key="4" className="flex relative">
    <div>
      <GlassIcons icons={group3} className="p-4"/>
    </div>
    <div className="pt-2">
      <div className=" absolute top-4 right-0 bg-purple-600 text-xs px-4 py-1.5 rounded-full text-white">
        <ShinyText 
        text="HR Round" 
        disabled={false} 
        speed={3} 
        className='font-semibold text-sm' 
      />
      </div>
      <h1 className="text-1xl font-semibold">Meta</h1>
      <p className="text-sm text-violet-200 pb-2">Ai engineear</p>
      <div className="flex items-center justify-start text-xs text-violet-100">
        <FiCalendar className="h-4 w-4 mr-1" />
        <p className="mr-4">20-10-2025</p>
        <div className="flex ">
          <FiClock className="h-4 w-4 mr-1" />
          <p className="font-medium">10:00 AM</p>
        </div>
      </div>
    </div>
  </div>,

];


//Animated list items for All Applications Grid card!
const list2 = [
  <div key="1" className="flex relative">
    <div>
      <GlassIcons icons={group3} className="p-4"/>
    </div>
    <div className="pt-2">
      <div className=" absolute top-4 right-0 bg-[#ff8c00] text-xs px-4 py-1.5 rounded-full text-white">
        <ShinyText 
        text="Interview" 
        disabled={false} 
        speed={3} 
        className='font-semibold text-sm' 
        />
      </div>
      <h1 className="text-1xl font-semibold">Google</h1>
      <p className="text-sm text-violet-200 pb-2">Senior Frontend Developer</p>
      <div className="flex items-center justify-start text-xs text-violet-100">
        <FiCalendar className="h-4 w-4 mr-1" />
        <p className="mr-4">20-10-2025</p>
        <p className="font-medium">90 LPA</p>
      </div>

    </div>
  </div>,

  <div key="2" className="flex relative">
    <div>
      <GlassIcons icons={group3} className="p-4"/>
    </div>
    <div className="pt-2">
      <div className=" absolute top-4 right-0 bg-purple-600 text-xs px-4 py-1.5 rounded-full text-white">
        <ShinyText 
        text="Applied" 
        disabled={false} 
        speed={3} 
        className='font-semibold text-sm' 
      />
      </div>
      <h1 className="text-1xl font-semibold">Netflix</h1>
      <p className="text-sm text-violet-200 pb-2">Frontend Developer</p>
      <div className="flex items-center justify-start text-xs text-violet-100">
        <FiCalendar className="h-4 w-4 mr-1" />
        <p className="mr-4">10-10-2025</p>
        <p className="font-medium">40 LPA</p>
      </div>
    </div>
  </div>,

  <div key="3" className="flex relative">
    <div>
      <GlassIcons icons={group3} className="p-4"/>
    </div>
    <div className="pt-2">
      <div className=" absolute top-4 right-0 bg-[#32cd32] text-xs px-4 py-1.5 rounded-full text-white">
        <ShinyText 
        text="Offer" 
        disabled={false} 
        speed={3} 
        className='font-semibold text-sm' 
      />
      </div>
      <h1 className="text-1xl font-semibold">Amazon</h1>
      <p className="text-sm text-violet-200 pb-2">Backend Developer</p>
      <div className="flex items-center justify-start text-xs text-violet-100">
        <FiCalendar className="h-4 w-4 mr-1" />
        <p className="mr-4">20-10-2025</p>
        <p className="font-medium">20 LPA</p>
      </div>
    </div>
  </div>,

  
  <div key="4" className="flex relative">
    <div>
      <GlassIcons icons={group3} className="p-4"/>
    </div>
    <div className="pt-2">
      <div className=" absolute top-4 right-0 bg-[#ff0000] text-xs px-4 py-1.5 rounded-full text-white">
        <ShinyText 
        text="Rejected" 
        disabled={false} 
        speed={3} 
        className='font-semibold text-sm' 
      />
      </div>
      <h1 className="text-1xl font-semibold">Meta</h1>
      <p className="text-sm text-violet-200 pb-2">Ai engineear</p>
      <div className="flex items-center justify-start text-xs text-violet-100">
        <FiCalendar className="h-4 w-4 mr-1" />
        <p className="mr-4">20-10-2025</p>
        <p className="font-medium">50 LPA</p>
      </div>
    </div>
  </div>,

  <div key="3" className="flex relative">
    <div>
      <GlassIcons icons={group3} className="p-4"/>
    </div>
    <div className="pt-2">
      <div className=" absolute top-4 right-0 bg-[#32cd32] text-xs px-4 py-1.5 rounded-full text-white">
        <ShinyText 
        text="Offer" 
        disabled={false} 
        speed={3} 
        className='font-semibold text-sm' 
      />
      </div>
      <h1 className="text-1xl font-semibold">Amazon</h1>
      <p className="text-sm text-violet-200 pb-2">Backend Developer</p>
      <div className="flex items-center justify-start text-xs text-violet-100">
        <FiCalendar className="h-4 w-4 mr-1" />
        <p className="mr-4">20-10-2025</p>
        <p className="font-medium">20 LPA</p>
      </div>
    </div>
  </div>,


];


export default function Dashboard() {
  return (
    
    <div className="relative min-h-screen overflow-hidden bg-black">
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
      


      <main className="relative z-10 text-white p-6 flex justify-center items-center min-h-screen flex-col">
        <div className="h-96 flex justify-center items-center flex-col">
          <div className="flex flex-col justify-center items-center">
            <BlurText
              text="Redefine Your Job Hunt."
              delay={150}
              animateBy="words"
              direction="top"
              onAnimationComplete={handleAnimationComplete}
              className="text-6xl font-bold mb-2"
            />

            <BlurText
              text="A modern dashboard to plan, track,"
              delay={160}
              animateBy="words"
              direction="top"
              onAnimationComplete={handleAnimationComplete}
              className="text-3xl font-light text-neutral-200"
            />

            <BlurText
              text="and win your next opportunity."
              delay={170}
              animateBy="words"
              direction="top"
              onAnimationComplete={handleAnimationComplete}
              className="text-3xl font-light text-neutral-200 mb-12"
            />
          </div>

          <div className="flex gap-6">
            <div>
              <RainbowButton className="" variant="default" >Add New Applications</RainbowButton>
            </div>
            <div>
              <RainbowButton className="" variant="outline" >View Analytics</RainbowButton>
            </div>
          </div>

        </div>

        <MagicBento 
          textAutoHide={true}
          enableStars={true}
          enableSpotlight={true}
          enableBorderGlow={true}
          enableTilt={false}
          enableMagnetism={false}
          clickEffect={true}
          spotlightRadius={400}
          particleCount={12}
          glowColor="132, 0, 255"
        >
          <div className="h-[calc(62vh-0px)]">
            <div className="h-full w-full flex flex-col gap-4">
              <div className="w-full h-[50%] flex gap-4">
                <div className="border border-[#392e4e] w-[100%] h-[100%] rounded-lg p-4">
                  <div className=" flex flex-col items-start justify-center h-full">
                    <GradientText
                      colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                      animationSpeed={3}
                      showBorder={false}
                      className="custom-class"
                      >
                      <p className="text-5xl font-extrabold w-full mb-1">100+</p>
                    </GradientText>
                    <div>
                      <h3 className="text-2xl font-bold">Total Applications</h3>
                      <p className="text-xs text-violet-200">All jobs you've applied so far.</p>
                    </div>
                  </div>
        
                </div>
                <div className="border border-[#392e4e] w-[100%] h-[100%] rounded-lg p-4">
                  <div className=" flex flex-col items-start justify-center h-full">
                    <GradientText
                      colors={["#FF4500", "#DAA520", "#FF4500", "#DAA520", "#FF4500"]}
                      animationSpeed={3}
                      showBorder={false}
                      className="custom-class"
                      >
                      <p className="text-5xl font-extrabold w-full mb-1">35+</p>
                    </GradientText>
                    <div>
                      <h3 className="text-2xl font-bold">Interviews</h3>
                      <p className="text-xs text-violet-200">Upcoming interview rounds.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full h-[50%] flex gap-4">
                <div className="border border-[#392e4e] w-[100%] h-[100%] rounded-lg p-4">
                  <div className=" flex flex-col items-start justify-center h-full ">
                    <GradientText
                      colors={["#DC143C", "#B22222", "#DC143C", "#B22222", "#DC143C"]}
                      animationSpeed={3}
                      showBorder={false}
                      className="custom-class"
                      >
                      <p className="text-5xl font-extrabold w-full mb-1">12+</p>
                    </GradientText>
                    <div>
                      <h3 className="text-2xl font-bold">Rejected</h3>
                      <p className="text-xs text-violet-200">Applications that didn't make it through.</p>
                    </div>
                  </div>
        
                </div>
                <div className="border border-[#392e4e] w-[100%] h-[100%] rounded-lg p-4">
                  <div className=" flex flex-col items-start justify-center h-full ">
                    <GradientText
                      colors={["#32CD32", "#228B22", "#32CD32", "#228B22", "#32CD32"]}
                      animationSpeed={3}
                      showBorder={false}
                      className="custom-class"
                      >
                      <p className="text-5xl font-extrabold w-full mb-1">15+</p>
                    </GradientText>
                    <div>
                      <h3 className="text-2xl font-bold">Offers</h3>
                      <p className="text-xs text-violet-200">Jobs you've successfully secured.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="h-full">
            <div className="flex flex-col items-end">
              <GradientText
                colors={["#8660fa", "#a855f7", "#8400ff", "#a855f7", "#8660fa"]}
                animationSpeed={3}
                showBorder={false}
                className="custom-class"
                >
                <p className="text-6xl font-extrabold mt-10">100%</p>
              </GradientText>
              <h3 className="text-3xl font-bold ml-2">Success Rate</h3>
              <p className="text-xs text-violet-200">Based on your weekly activities.</p>
            </div>
          </div>

          {/* upcoming interviews */}

          <div className="h-full">
            <div className="flex">
              <GlassIcons icons={group2} className="py-6"/>
              <div>
                <h2 className="text-4xl font-extrabold p-4 pt-6 pb-0">Next Interviews</h2>
                <p className="pl-4 text-violet-100 text-sm">next 7 days</p>
              </div>
            </div>

            <div className="h-full w-full">
              <div className="h-[100%] pb-28">
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

          <div>
            <h3 className="text-2xl font-bold text-end">Tools</h3>
            <GlassIcons icons={group1} className="py-8"/>
          </div>
          
          {/* recent interview */}

          <div className="h-[calc(100vh-0px)] pb-56 ">
            <div className="p-2 mb-6 relative">
              <div className="mb-8">
                <h2 className="text-2xl font-extrabold pb-0">Recent Applications</h2>
                <p className=" text-violet-100 text-sm">Your latest job Applications</p>
              </div>
              <div className="flex items-center gap-2 border border-[#392e4e] rounded-lg px-4 py-2 w-full">
                <FiSearch className="text-gray-400 text-xl" />
                <input
                  type="text"
                  placeholder="Search companies, positions..."
                  className="flex-1 bg-transparent text-white placeholder-gray-400 border-none outline-none focus:ring-0 focus:shadow-none p-2"
                />
              </div>

              <RainbowButton className="absolute right-0 top-4" >Add New</RainbowButton>
            </div>

            <div className="h-full w-full">
              <div className="h-[100%]">
                <AnimatedList
                  items={list2}
                  onItemSelect={(item, index) => console.log(item, index)}
                  showGradients={true}
                  enableArrowNavigation={true}
                  displayScrollbar={true}
                />
              </div>
            </div>

          </div>

        </MagicBento>

      
      </main>
    </div>

  );
}
