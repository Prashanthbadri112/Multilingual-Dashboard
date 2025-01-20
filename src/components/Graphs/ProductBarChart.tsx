import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { fetchProductData, Product } from "../../Apidata";
import { useTranslation } from "react-i18next";
import { Typography } from "@mui/material";

const Chart: React.FC = () => {
  const [data, setData] = useState<Product[]>([]);
  const {t}=useTranslation()

  useEffect(() => {
    const getData = async () => {
      const result = await fetchProductData();
      setData(result);
    };
    getData();
  }, []);

  return (
    <>
       <Typography
                    variant="h6"
                    sx={{
                      marginBottom: 3,
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >{t('Prbc')}</Typography>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="id"
            label={{ position: "insideBottom", offset: -5 }}
          />
          <YAxis
            label={{
              value: "Price",
              angle: -90,
              position: "insideLeft",
              offset: -10,
            }}
          />
          <Tooltip />
          <Legend />
          <Bar dataKey="price" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default Chart;
