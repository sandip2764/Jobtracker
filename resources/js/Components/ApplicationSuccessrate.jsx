import React from "react";
import { Box, Typography } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Custom Tooltip Component with Arrow and Color Box
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
          position: "relative", // For absolute positioning of the arrow
          marginBottom: "10px", // Space for the arrow
        }}
      >
            {/* Company Name */}
            <p style={{ fontWeight: 600, marginBottom: "8px", fontSize: "14px", color: "#fff" }}>
            {label}
            </p>

            {/* Data Row with Color Box */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px" }}>
            {/* Color Square Box */}
            <div
                style={{
                width: "12px",
                height: "12px",
                backgroundColor: "#4f46e5", // Matches Bar Color
                borderRadius: "3px",
                }}
            />
            <span style={{ color: "#9ca3af" }}>Success Rate:</span>
            <span style={{ fontWeight: "bold", color: "#fff" }}>{payload[0].value}%</span>
            </div>
        </div>
    );
  }
  return null;
};

export default function SuccessRateChart() {
  const data = [
    { company: 'TechCorp', rate: 12.5 },
    { company: 'DataSys', rate: 8.3 },
    { company: 'FinTech', rate: 35 },
    { company: 'QuantumLeap', rate: 50 },
    { company: 'WebWeavers', rate: 20 },
  ];

  return (
    <Box
      sx={{
        background: "#0D0716",
        border: "1px solid #392e4e",
        borderRadius: "14px",
        p: 2,
        height: "300px",
        width: "50%",
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
        Success Rate by Company
      </Typography>

      <Box sx={{ flexGrow: 1, width: "100%", minHeight: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 30, left: -10, bottom: 5 }}
          >
            <CartesianGrid 
              vertical={true} 
              stroke="#392e4e" 
              opacity={0.5} 
            />
            
            <XAxis 
              dataKey="company" 
              axisLine={true}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              dy={10}
            />
            
            <YAxis 
              axisLine={true}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              tickFormatter={(value) => `${value}%`}
            />

            {/* Using the CustomTooltip component here */}
            <Tooltip 
              content={<CustomTooltip />} 
              cursor={{ fill: 'rgba(255, 255, 255, 0.03)' }} 
            />

            <Bar 
              dataKey="rate" 
              fill="#4f46e5"
              radius={[6, 6, 0, 0]}
              barSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}