
import React from 'react';
import { Select, MenuItem, FormControl,SelectChangeEvent, Box } from '@mui/material';
import { useStore } from '../../store/zustand.ts';
import { useTranslation } from 'react-i18next';

const LanguageSelector: React.FC = () => {
  const { setLanguage } = useStore();
  const { i18n } = useTranslation();

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    const lang = event.target.value;
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  return (
    <Box sx={{
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      marginRight: 2,
      borderRadius: '5px',
      padding: '0px 5px',
    }}>
      <FormControl variant="outlined" sx={{
        minWidth: 100,
        '& .MuiOutlinedInput-root': {
          borderRadius: '20px', 
        },
      }}>
        <Select
          value={i18n.language}
          onChange={handleLanguageChange}
          displayEmpty
          sx={{
            padding: '5px 10px',
            fontSize: '14px',
            height: '35px',
            '& .MuiSelect-icon': {
              color: '#3f51b5',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#3f51b5',
            },
          }}
        >
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="es">Español</MenuItem>
          <MenuItem value="tl">తెలుగు</MenuItem>
      
        </Select>
      </FormControl>
    </Box>
  );
};

export default LanguageSelector;
