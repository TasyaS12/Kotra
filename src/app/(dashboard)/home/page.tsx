'use client'

// MUI Imports
import Grid from '@mui/material/Grid'

// Components Imports
import LineAreaDailyViewChart from '@views/home/analytics/LineAreaDailyViewChart'
import VisitorsOverview from '@views/home/analytics/VisitorsOverview'
import BarChartViewsGrowth from '@views/home/analytics/BarChartViewsGrowth'
import DateBarChart from '@views/home/analytics/DateBarChart'
import BasicDataTables from '@views/home/analytics/BasicDataTables'


const DashboardAnalytics = () => {

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} lg={6}>
        <BarChartViewsGrowth />
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <LineAreaDailyViewChart />
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <VisitorsOverview />
      </Grid>
      <Grid item xs={12} md={6}>
        <DateBarChart />
      </Grid>
      <Grid item xs={12} sm={6} lg={6}>
        <BasicDataTables/>
      </Grid>
    </Grid>
  )
}

export default DashboardAnalytics
