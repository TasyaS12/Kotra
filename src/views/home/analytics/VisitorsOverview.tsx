'use client'

// MUI Imports
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import MuiLinearProgress from '@mui/material/LinearProgress'
import { styled } from '@mui/material/styles'

// Custom Components Imports
import CustomAvatar from '@core/components/mui/Avatar'

const LinearProgress = styled(MuiLinearProgress)(() => ({
  '&.MuiLinearProgress-colorInfo': { backgroundColor: 'var(--mui-palette-primary-main)' },
  '& .MuiLinearProgress-bar': {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
  }
}))

const VisitorsOverview = () => {
  return (
    <Card>
      <CardContent>
        <div className='flex items-start justify-between gap-3'>
          <div>
            <Typography>Visitors Overview</Typography>
            <Typography variant='h4'>👥42.5k</Typography>
          </div>
          <Typography color='success.main' className='font-medium'>
            +18.2%
          </Typography>
        </div>
        <div className='flex items-center justify-between mlb-[1.4375rem]'>
          <div className='flex flex-col plb-2.25'>
            <div className='flex items-center mbe-2.5 gap-x-[6px]'>
              <CustomAvatar skin='light' color='info' variant='rounded' size={24}>
                <i className='tabler-users text-lg' />
              </CustomAvatar>
              <Typography>Visitors</Typography>
            </div>
            <Typography variant='h5'>45.3K</Typography>
            <Typography variant='body2' color='text.disabled'>
              Increase of 12%
            </Typography>
          </div>
          <Divider flexItem orientation='vertical'>
            <CustomAvatar skin='light' size={24} className='text-xs text-textDisabled bg-actionHover'>
              VS
            </CustomAvatar>
          </Divider>
          <div className='flex items-end flex-col plb-2'>
            <div className='flex items-center mbe-2 gap-x-[6px]'>
              <Typography color='text.secondary' className='m'>
                Registrant
              </Typography>
              <CustomAvatar skin='light' variant='rounded' color='primary' size={24}>
                <i className='tabler-thumb-up text-lg' />
              </CustomAvatar>
            </div>
            <Typography variant='h5'>30.1K</Typography>
            <Typography variant='body2' color='text.disabled'>
              Increase of 8%
            </Typography>
          </div>
        </div>
        <LinearProgress value={65} color='info' variant='determinate' className='bs-2.5' />
      </CardContent>
    </Card>
  )
}

export default VisitorsOverview
