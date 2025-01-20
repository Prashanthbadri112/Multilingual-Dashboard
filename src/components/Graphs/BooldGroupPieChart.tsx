import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { UserData } from '../../Apidata';
import {useTranslation} from 'react-i18next'
 
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'];
 
const BloodGroupPieChart: React.FC = () => {
  const [data, setData] = useState<{ name: string; value: number }[]>([]);
  const {t}=useTranslation()

  const fetchData = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/users');
      const users: UserData[] = response.data.users;
      const bloodGroupData = users.reduce((acc: { [key: string]: number }, user) => {
        acc[user.bloodGroup] = (acc[user.bloodGroup] || 0) + 1;
        return acc;
      }, {});
      const formattedData = Object.keys(bloodGroupData).map((key) => ({
        name: key,
        value: bloodGroupData[key],
      }));
      setData(formattedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
 
  useEffect(() => {
    fetchData();
  }, []);
 
  return (
    <>     

    <Box sx={{ py: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
      <Box sx={{ width: '100%', height: 300 }}>
          <Typography
              variant="h6"
              sx={{
                marginBottom: 3,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
{t('pch')}            </Typography>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              labelLine={true}
              label={({ name }) => name}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </Box></>
  );
};
 
export default BloodGroupPieChart;