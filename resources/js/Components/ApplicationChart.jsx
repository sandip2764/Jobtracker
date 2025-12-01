import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Briefcase, FileText, CheckCircle, XCircle, LayoutDashboard, Bell, Search, User } from 'lucide-react';

// --- ApplicationChart Component (Inline) ---
const ApplicationChart = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  // Data for the chart
  const data = [
    { name: 'Applied', value: 45, color: '#305CDE', icon: FileText }, // 
    { name: 'Interview', value: 12, color: '#8A00C4', icon: Briefcase }, // 
    { name: 'Offer', value: 4, color: '#0BDA51', icon: CheckCircle }, // 
    { name: 'Rejected', value: 15, color: '#E84B3D', icon: XCircle }, // 
  ];

  // Calculate total for center text
  const totalApplications = data.reduce((acc, curr) => acc + curr.value, 0);

  // Custom Tooltip Component
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload;
      
      return (
        <div className="bg-black/80 backdrop-blur-md border border-white/10 p-4 rounded-xl shadow-xl transform transition-all duration-300 flex justify-center items-center gap-2">
          <div className="flex items-center gap-2 ">
            <div 
              className="w-3 h-3 rounded-full shadow-[0_0_8px_currentColor]" 
              style={{ backgroundColor: dataPoint.color, color: dataPoint.color }}
            />
            <p className="font-medium text-slate-200">{dataPoint.name}</p>
          </div>
          <div className="">
            <p className="text-xl font-bold text-white">{dataPoint.value}</p>
          </div>
        </div>
      );
    }
    return null;
  };

  // Handle hover effects
  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  return (
    <div className="w-full h-full font-sans">
      {/* Chart Section */}
      <div className="relative h-64 w-full mt-4 group">
        <ResponsiveContainer width="100%" height="50%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="100%" // Moves center to bottom
              startAngle={180} // Starts at 9 o'clock
              endAngle={0}     // Ends at 3 o'clock
              innerRadius={80} // Inner hole size
              outerRadius={120} // Size of the ring
              paddingAngle={4} // Gap between segments
              dataKey="value"
              onMouseEnter={onPieEnter}
              onMouseLeave={onPieLeave}
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color}
                  className="transition-all duration-300 focus:outline-none"
                  style={{
                    filter: activeIndex === index ? `drop-shadow(0px 0px 10px ${entry.color})` : 'none',
                    opacity: activeIndex !== null && activeIndex !== index ? 0.6 : 1,
                    transform: activeIndex === index ? 'scale(1.02)' : 'scale(1)',
                    transformOrigin: 'center bottom'
                  }}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
          </PieChart>
        </ResponsiveContainer>

        {/* Center Text (Inside the Donut) */}
        <div className="absolute bottom-14 left-0 w-full flex flex-col items-center justify-end pointer-events-none">
          <span className="text-5xl font-black text-gray-200 leading-none">{totalApplications}</span>
          <span className="text-slate-400 text-sm font-medium mt-1 mb-6">Total Apps</span>
          
          {/* Simple Legends */}
          <div className="grid grid-cols-2 gap-2 gap-x-14">
            {data.map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                {/* Color Box */}
                <div
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: item.color }}
                ></div>

                {/* Label */}
                <span className="text-xs text-white">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ApplicationChart;