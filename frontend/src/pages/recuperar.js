import '../app/globals.css'
import * as React from 'react'
import { useRouter } from 'next/router'
import styles from '../app/styles/recuperar.module.css'
import TextComponent from '@/app/components/TextComponent/TextComponent'
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import { DialogContent } from '@mui/material';


export default function RecuperarPage() {
    const [open, setOpen] = React.useState(false);
    const router = useRouter();

    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
      router.push('/login')
    };

    return (
        <div className={styles.center}>
            <h1 className={styles.titulo}> Recupera tu contraseña </h1>
            <div className={styles.texts}>
                <TextComponent
                label={'Ingresa tu correo'}
                width={'291px'}
                icon={false} />
            </div>
            <Button sx={{
                display: 'flex',
                width: '100px',
                height: '40px',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '8px',
                borderRadius: '100px',
                border: 0,
                background: 'var(--m-3-sys-light-secondary-container, #E8DEF8)',
                padding: '10px 24px',
                color: 'var(--m-3-sys-light-on-secondary-container, #1D192B)',
                textTransform: 'none',
                }} 
            variant='contained'
            onClick={handleClickOpen}
            >
                Enviar
            </Button>
            <Dialog onClose={handleClose} open={open} sx={{
                '& .MuiDialog-paper': {display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                width: '312px',
                borderRadius: '28px',
                background: 'var(--m-3-sys-light-surface-container-high, #ECE6F0)'}
            }}>
                <DialogTitle sx={{
                    alignSelf: 'stretch', 
                    fontSize: '24px',
                    fontStyle: 'normal',
                    fontWeight: '400',
                    lineHeight: '32px'
                }}>
                    Solicitud enviada
                </DialogTitle>
                <DialogContent>
                    <Typography sx={{
                        alignSelf: 'stretch', 
                        fontSize: '14px',
                        fontStyle: 'normal',
                        fontWeight: '400',
                        lineHeight: '20px',
                    }}>
                        Su solicitud de recuperación fue enviada al
                        correo ingresado
                    </Typography> 
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '8px',
                        color: '#6750A4'
                    }}>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}