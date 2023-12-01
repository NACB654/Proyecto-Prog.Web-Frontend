import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardMedia } from '@mui/material';
import Avatar from '@mui/material';

export default function Cards({title, fecha, image}) {
  return (
    <Card sx={{ 
      width: '470px', 
      height: '101px', 
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      alignSelf: 'stretch'
    }}>
      <CardContent sx={{
        padding: '16px',
        '&: last-child':{paddingBottom: '16px'},
        gap: '16px',
        display: 'flex',
        alignItems: 'center',
        flex: '1 0 0'
      }}>
        <svg xmlns="http://www.w3.org/2000/svg"  width="40" height="41" viewBox="0 0 40 41" fill="none">
          <circle cx="20" cy="20.5" r="20" fill="#6750A4"/>
        </svg>
        <CardContent sx={{
          padding: 0,
          '&: last-child':{paddingBottom: 0},
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '4px',
          flex: '1 0 0',
        }}>
          <Typography sx={{
            fontSize: '16px',
            fontStyle: 'normal',
            fontWeight: '500',
            lineHeight: '24px',
            color: 'var(--m-3-sys-light-on-surface, #1D1B20)',
            alignSelf: 'stretch'
          }}>
            {title}
          </Typography>
          <Typography sx={{
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: '400',
            lineHeight: '20px',
            color: 'var(--m-3-sys-light-on-surface, #1D1B20)',
            alignSelf: 'stretch'
          }}>
            {fecha}
          </Typography>
        </CardContent>
      </CardContent>
      <CardMedia 
        sx={{width: '80px', height: '101px'}}
        image={image}
      />
    </Card>
  );
}