import React from "react";
import { Box, Typography } from "@mui/material";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "rgba(13, 7, 22, 0.95)", // Dark background
          border: "1px solid #392e4e",
          borderRadius: "8px",
          padding: "12px",
          color: "#fff",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
        }}
      >
        <p style={{ fontWeight: 600, marginBottom: "8px", fontSize: "14px", color: "#fff" }}>
          {label}
        </p>
        {payload.map((entry, index) => (
          <div key={index} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", marginBottom: "4px" }}>
            {/* Square Color Box */}
            <div
              style={{
                width: "12px",
                height: "12px",
                backgroundColor: entry.color, // Pick up the stroke color automatically
                borderRadius: "3px",
              }}
            />
            <span style={{ color: "#9ca3af" }}>{entry.name}:</span>
            <span style={{ fontWeight: "bold", color: "#fff" }}>{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function ApplicationTimeline() {
  const appliedData = [5, 12, 18, 25, 22, 30, 28, 35, 40, 38, 40, 40];
  const interviewData = [1, 3, 5, 15, 7, 19, 6, 8, 10, 12, 14, 20];
  const offerData = [0, 1, 0, 2, 1, 3, 2, 4, 5, 7, 4, 10];

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  const chartData = appliedData.map((val, index) => ({
    name: months[index],
    Applied: val,

  }));

  return (
    <Box
      sx={{
        background: "#0D0716",
        border: "1px solid #392e4e",
        borderRadius: "14px",
        p: 2,
        height: "400px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        sx={{
          fontSize: "18px",
          fontWeight: 600,
          color: "white",
          mb: 3,
        }}
      >
        Monthly Volume
      </Typography>

      <Box sx={{ flexGrow: 1, width: "100%", minHeight: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 30, left: -20, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorApplied" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#305CDE" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#305CDE" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid 
              vertical={true} 
              stroke="#392e4e" 
              opacity={0.5} 
            />

            <XAxis 
              dataKey="name" 
              axisLine={true}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              dy={10}
            />

            <YAxis 
              axisLine={true}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
            />

            {/* Custom Tooltip Used Here */}
            <Tooltip content={<CustomTooltip />} />

            <Area
              type="monotone"
              dataKey="Applied"
              stroke="#305CDE"
              strokeWidth={1}
              fillOpacity={1}
              fill="url(#colorApplied)"
              dot={true} 
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}