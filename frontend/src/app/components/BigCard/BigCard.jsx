import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import BasicDialog from '../BasicDialog/BasicDialog';
import Link from 'next/link';
import Buttons from '../Buttons/Buttons';

export default function BigCard({id, avatar, title, image, isbn, autor, editor, onClick, usuario, libro, btn, date, disabled}) {

  if (date) {
    return (
      <Card sx={{ 
          width: '314px', 
          display: 'flex', 
          flexDirection: 'column',
          borderRadius: '12px',
          paddingBottom: '18px',
          border: '1px solid var(--m-3-sys-light-outline-variant, #CAC4D0)'
      }}>
        <CardHeader sx={{
          display: 'flex',
          height: '52px',
          padding: '12px 4px 12px 16px',
          alignItems: 'center',
          alignSelf: 'stretch',
          '& .MuiTypography-root': {
              fontSize: '16px',
              fontStyle: 'normal',
              fontWeight: '500',
              lineHeight: '24px',
          }
        }}
          avatar={
            <Avatar sx={{ bgcolor: '#6750A4' }} aria-label="recipe">
              {avatar}
            </Avatar>
          }
          title={title}
        />
        {/* <Link href={'/detalleLibro'}> */}
          <CardMedia sx={{
            width: '314px', 
            height: '178px', 
            objectFit: 'contain',
            background: 'url(<path-to-image>), lightgray 50% / cover no-repeat'
          }}
            component="img"
            image={image}
            id={id}
            alt='libros'
            onClick={onClick}
          />
        {/* </Link> */}
        <CardContent sx={{
          display: 'flex',
          height: '126px',
          padding: '16px',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '12px',
          alignSelf: 'stretch'
        }}>
          <Typography sx={{
              fontSize: '16px',
              fontStyle: 'normal',
              fontWeight: '700',
              lineHeight: '24px'
          }}>
            ISBN: {isbn}
          </Typography>
          <Typography sx={{
              fontSize: '14px',
              fontStyle: 'normal',
              fontWeight: '700',
              lineHeight: '24px',
              textDecoration: 'underline'          
          }}>
            Autor: {autor}
          </Typography>
          <Typography sx={{
              fontSize: '14px',
              fontStyle: 'normal',
              fontWeight: '700',
              lineHeight: '24px',
              textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          }}>
            Editor: {editor}
          </Typography>
        </CardContent>
        <CardContent sx={{
          '&: last-child': {paddingBottom: 0},
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'stretch',
          padding: 0,
        }}>
          <BasicDialog 
          title={'Reserva completada'} 
          text={'Se ha realizado con exito'}
          btnLabel={'Reservar'}
          width={'104px'}
          variant={'contained'}
          date={true}
          tituloLibro={title}
          libro={libro}
          disabled={disabled}
          usuario={usuario}
          />
        </CardContent>
      </Card>
    );
  }
  else {
    return (
      <Card sx={{ 
          width: '314px', 
          display: 'flex', 
          flexDirection: 'column',
          borderRadius: '12px',
          paddingBottom: '18px',
          border: '1px solid var(--m-3-sys-light-outline-variant, #CAC4D0)'
      }}>
        <CardHeader sx={{
          display: 'flex',
          height: '52px',
          padding: '12px 4px 12px 16px',
          alignItems: 'center',
          alignSelf: 'stretch',
          '& .MuiTypography-root': {
              fontSize: '16px',
              fontStyle: 'normal',
              fontWeight: '500',
              lineHeight: '24px',
          }
        }}
          avatar={
            <Avatar sx={{ bgcolor: '#6750A4' }} aria-label="recipe">
              {avatar}
            </Avatar>
          }
          title={title}
        />
        {/* <Link href={'/detalleLibro'}> */}
          <CardMedia sx={{
            width: '314px', 
            height: '178px', 
            objectFit: 'contain',
            background: 'url(<path-to-image>), lightgray 50% / cover no-repeat'
          }}
            component="img"
            image={image}
            id={id}
            alt='libros'
            onClick={onClick}
          />
        {/* </Link> */}
        <CardContent sx={{
          display: 'flex',
          height: '126px',
          padding: '16px',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '12px',
          alignSelf: 'stretch'
        }}>
          <Typography sx={{
              fontSize: '16px',
              fontStyle: 'normal',
              fontWeight: '700',
              lineHeight: '24px'
          }}>
            ISBN: {isbn}
          </Typography>
          <Typography sx={{
              fontSize: '14px',
              fontStyle: 'normal',
              fontWeight: '700',
              lineHeight: '24px',
              textDecoration: 'underline'          
          }}>
            Autor: {autor}
          </Typography>
          <Typography sx={{
              fontSize: '14px',
              fontStyle: 'normal',
              fontWeight: '700',
              lineHeight: '24px',
              textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          }}>
            Editor: {editor}
          </Typography>
        </CardContent>
        <CardContent sx={{
          '&: last-child': {paddingBottom: 0},
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'stretch',
          padding: 0,
        }}>
          <Buttons
          id={id}
          label={'Modificar'}
          width={'104px'}
          variant={'contained'}
          disabled={disabled}
          onClick={btn}
          />
        </CardContent>
      </Card>
    );
  }
}