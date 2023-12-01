import * as React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import { DialogContent } from '@mui/material';
import Buttons from '../Buttons/Buttons';
import DateComponent from '../DateComponent/DateComponent';
import dayjs from 'dayjs';

import reservaApi from "../../api/reserva.js";
import librosApi from "../../api/libro.js";

const BasicDialog = ({title, btnLabel, width, variant, date, tituloLibro, libro, nuevaFecha, usuario, disabled}) => {
    const today = dayjs().format("YYYY-MM-DD")

    const [open, setOpen] = React.useState(false);
    const [update, setUpdate] = React.useState(false);
    const [fecha, setFecha] = React.useState(dayjs().format('YYYY-MM-DD'));
    const [libreria, setLibreria] = React.useState([]);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = async (e) => {
      setOpen(false);
      setUpdate(true);

      if (e.target.name === "nuevo") {
        const reserva = 
        {
            "fechaReserva": today,
            "fechaDevolucion": nuevaFecha,
            "idUsuario": usuario.id,
            "idLibro": libro.id
        }

        const modificacion = 
        {
            id: libro.id,
            titulo: libro.titulo,
            autor: libro.autor,
            isbn13: libro.isbn13,
            editorial: libro.editorial,
            categoria: libro.categoria,
            cantidadReservas: libro.cantidadReservas + 1,
            portada: libro.portada
        }

        await librosApi.update(modificacion);
        await reservaApi.create(reserva);
      }
    }

    const handleChange = (time) => {
        setFecha(time.format('YYYY-MM-DD'));
    }

    const handleClose2 = async (e) => {
        setUpdate(false);

        if (e.target.name === "nuevo") {
            const reserva = 
            {
                "fechaReserva": today,
                "fechaDevolucion": fecha,
                "idUsuario": usuario.id,
                "idLibro": libro.id
            }
    
            const modificacion = 
            {
                id: libro.id,
                titulo: libro.titulo,
                autor: libro.autor,
                isbn13: libro.isbn13,
                editorial: libro.editorial,
                categoria: libro.categoria,
                cantidadReservas: libro.cantidadReservas + 1,
                portada: libro.portada
            }
    
            await librosApi.update(modificacion);
            await reservaApi.create(reserva);
        }
    }

    if (!date) {
        return (
            <>
                <Buttons
                    label={btnLabel} 
                    variant={variant}
                    onClick={handleClickOpen}
                    width={width}
                />
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
                        {title}
                    </DialogTitle>
                    <DialogContent>
                        <Typography sx={{
                            alignSelf: 'stretch', 
                            fontSize: '14px',
                            fontStyle: 'normal',
                            fontWeight: '400',
                            lineHeight: '20px',
                        }}>
                            Se ha realizado su reserva correctamente.
                            Recuerde que tiene hasta el día {nuevaFecha} para
                            devolverlo.
                        </Typography> 
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleClose} name='nuevo' sx={{
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
            </>
        )
    }
    else {
        return (
            <>
                <Buttons
                    label={btnLabel} 
                    variant={variant}
                    disabled={disabled}
                    onClick={handleClickOpen}
                    width={width}
                />
                <Dialog onClose={handleClose} open={open} sx={{
                    '& .MuiDialog-paper': {display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    width: '312px',
                    borderRadius: '28px',
                    background: 'var(--m-3-sys-light-surface-container-high, #ECE6F0)'}
                }}>
                    <DialogContent sx={{alignSelf: 'flex-start'}}><DateComponent onChange={handleChange}/></DialogContent>
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
                <Dialog onClose={handleClose2} open={update} sx={{
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
                        {title}
                    </DialogTitle>
                    <DialogContent>
                        <Typography sx={{
                            alignSelf: 'stretch', 
                            fontSize: '14px',
                            fontStyle: 'normal',
                            fontWeight: '400',
                            lineHeight: '20px',
                        }}>
                            Se ha realizado su reserva correctamente.
                            Recuerde que tiene hasta el día {fecha} para
                            devolverlo.
                        </Typography> 
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleClose2} name="nuevo" sx={{
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
            </>
        )
    }
}

export default BasicDialog;