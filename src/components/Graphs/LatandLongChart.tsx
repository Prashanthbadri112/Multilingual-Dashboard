import React, { useEffect, useState } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { fetchData, User } from "../../Apidata";
import { Typography, Box, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";

const Chart: React.FC = () => {
  const [data, setData] = useState<User[]>([]);
  const { t } = useTranslation();
  const theme = useTheme(); // Access theme (light/dark mode)

  useEffect(() => {
    const getData = async () => {
      const result = await fetchData();
      setData(result);
    };
    getData();
  }, []);

  // Define colors based on the current theme
  const chartColors = {
    grid: theme.palette.mode === "dark" ? "#444" : "#e0e0e0",
    axis: theme.palette.mode === "dark" ? "#bbb" : "#555",
    tooltipBg: theme.palette.mode === "dark" ? "#333" : "#fff",
    tooltipBorder: theme.palette.mode === "dark" ? "#555" : "#ddd",
    scatter: theme.palette.mode === "dark" ? "#82ca9d" : "#8884d8",
  };

  // Calculate min/max for longitude and latitude to adjust axis domains
  const minLng = Math.min(...data.map((item) => parseFloat(item.address.geo.lng)));
  const maxLng = Math.max(...data.map((item) => parseFloat(item.address.geo.lng)));
  const minLat = Math.min(...data.map((item) => parseFloat(item.address.geo.lat)));
  const maxLat = Math.max(...data.map((item) => parseFloat(item.address.geo.lat)));
  
  return (
    <Box sx={{ padding: 3 }}>
      <Typography
        variant="h6"
        sx={{
          marginBottom: 3,
          fontWeight: "bold",
          color: theme.palette.mode === "dark" ? "#fff" : "#333",
          textAlign: "center",
        }}
      >
        {t("llc")}
      </Typography>

      <ResponsiveContainer width="100%" height={260}>
        <ScatterChart margin={{ top: 20, right: 30, left: 40, bottom: 50 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
          <XAxis
            dataKey="address.geo.lng"
            type="number"
            domain={[minLng - 1, maxLng + 1]} // Extend the domain to make sure points are visible
            tick={{ fontSize: 12 }}
            tickLine={false}
            padding={{ left: 10, right: 10 }}
            stroke={chartColors.axis}
            label={{
              value: t("Longitude"),
              position: "insideBottom",
              offset: -10,
              fill: chartColors.axis,
            }}
          />
          <YAxis
            dataKey="address.geo.lat"
            type="number"
            domain={[minLat - 1, maxLat + 1]} // Extend the domain to make sure points are visible
            stroke={chartColors.axis}
            label={{
              value: t("Latitude"),
              angle: -90,
              position: "insideLeft",
              offset: -10,
              fill: chartColors.axis,
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: chartColors.tooltipBg,
              borderRadius: "8px",
              border: `1px solid ${chartColors.tooltipBorder}`,
            }}
            labelStyle={{ fontWeight: "bold", color: chartColors.axis }}
            formatter={(value, _) => [`${value}`, "name"]}
          />
          <Scatter name="Locations" data={data} fill={chartColors.scatter} />
        </ScatterChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default Chart;
