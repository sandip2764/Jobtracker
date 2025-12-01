import * as React from "react";
import Stack from "@mui/material/Stack";
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";
import { areaElementClasses, lineElementClasses } from "@mui/x-charts/LineChart";
import { chartsAxisHighlightClasses } from "@mui/x-charts/ChartsAxisHighlight";
import Box from "@mui/material/Box";
import { color } from "motion";

export default function SparkLine({ data }) {
  // parent will pass array → [10, 30, 20, 40, 50, 35]

  const weeks = data.map((_, i) => i + 1); // not shown in tooltip anymore

  const settings = {
    data: data,
    baseline: "min",
    margin: { bottom: 0, top: 5, left: 4, right: 0 },

    xAxis: { id: "week-axis", data: weeks },
    yAxis: {
      domainLimit: (_, maxValue) => ({
        min: -maxValue / 6,
        max: maxValue,
      }),
    },

    sx: {
      // soft bottom fade
      [`& .${areaElementClasses.root}`]: {
        opacity: 0.25,
        maskImage: "linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))",
      },

      // same line thickness
      [`& .${lineElementClasses.root}`]: { strokeWidth: 2 },

      // axis highlight
      [`& .${chartsAxisHighlightClasses.root}`]: {
        stroke: "rgb(137, 86, 255)",
        strokeDasharray: "none",
        strokeWidth: 2,
      },
    },

    // Tooltip override → remove “Point” label → show only value
    slotProps: {
      lineHighlight: { r: 4 },
      tooltip: {
        itemRenderer: (params) => {
          return params.formattedValue; // only show value like "40"
        },
      },
    },

    axisHighlight: { x: "line" },
    showTooltip: true,
    showHighlight: true,
    area: true,
    color: "rgb(137, 86, 255)",
    clipAreaOffset: { top: 2, bottom: 2 },
  };

  return (
    <Box>
      <Stack direction="column" width={100}>
        <SparkLineChart height={80} width={100} {...settings} />
      </Stack>
    </Box>
  );
}
