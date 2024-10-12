
import Grid from '@mui/material/Grid'

import RegistrantTable from '@views/registrant/RegistrantTable'
import DownloadPdfButton from '@views/registrant/DownloadPdfButton'
import DonwloadExcelButton from '@views/registrant/DownloadExcelButton'

export default function Page() {
  return(
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <DownloadPdfButton />
      </Grid>
      <Grid item xs={6}>
        <DonwloadExcelButton />
      </Grid>
      <Grid item xs={12}>
        <RegistrantTable />
      </Grid>
    </Grid>
  )
}
