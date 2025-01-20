import Box from "@mui/material/Box";
import { createTheme } from "@mui/material/styles";

import { AppProvider, type Navigation } from "@toolpad/core/AppProvider";
import { DashboardLayout, ThemeSwitcher } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";
import Chart from "./Graphs/LatandLongChart.tsx";
import Barchart from "./Graphs/ProductBarChart.tsx";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import BackupTableIcon from "@mui/icons-material/BackupTable";
import Table from "./Table.tsx";
import Linechart from "./Graphs/Linechart.tsx";
import BloodGroupPieChart from "./Graphs/BooldGroupPieChart.tsx";
import LanguageSelector from "./Language/LanguageSelector.tsx";
import { useTranslation } from "react-i18next";
import { Grid, Stack, useTheme } from "@mui/material";


function ToolbarActionsSearch() {
  return (
    <Stack direction="row">
      <LanguageSelector/>
       
      <ThemeSwitcher />
    </Stack>
  );
}
const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

const ChartLayout: React.FC = () => {
  const theme = useTheme(); 
  
  return (
    <Box sx={{ padding: 2, maxWidth: '100%', margin: '0 auto' }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              padding: 2,
              backgroundColor: theme.palette.background.paper,
              borderRadius: '8px',
              boxShadow: 3,
            }}
          >
        
            <Linechart  />
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box
            sx={{
              padding: 2,
              backgroundColor: theme.palette.background.paper,
              borderRadius: '8px',
              boxShadow: 3,
            }}
          >
          
            <Barchart />
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box
            sx={{
              padding: 2,
              backgroundColor: theme.palette.background.paper,
              borderRadius: '8px',
              boxShadow: 3,
            }}
          >
            
            <Chart/>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box
            sx={{
              padding: 2,
              backgroundColor: theme.palette.background.paper,
              borderRadius: '8px',
              boxShadow: 3,
            }}
          >
          
            <BloodGroupPieChart />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};




function DemoPageContent({ pathname }: { pathname: string }) {
  return (

    <>
      {pathname === "/charts" && (
        <>

          <ChartLayout/>
        </>
      )}
      {pathname === "/table" && (
        <>
          <Table />
        </>
      )}
      </>
  );
}


export default function DashboardLayoutBranding() {

  const router = useDemoRouter("/charts");
  const {t}=useTranslation()
  const NAVIGATION: Navigation = [
    {
      segment: "charts",
      title: t("ch"),
      icon: <AnalyticsIcon />,
    },
    {
      segment: "table",
      title:  t("tb"),
      icon: <BackupTableIcon />,
    },
  ];
  
  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        logo: (
          <img
            src="https://th.bing.com/th/id/OIP.DuiEzebjgoRPWscHhtGibwHaHa?w=175&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
            alt="Dashboard logo"
          />
        ),
        title: t("dashboard"),
        homeUrl: "/toolpad/core/introduction",
      }}
      router={router}
      theme={demoTheme}
    >


      <DashboardLayout  slots={{
          toolbarActions: ToolbarActionsSearch,
        }}>
        <DemoPageContent pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}

