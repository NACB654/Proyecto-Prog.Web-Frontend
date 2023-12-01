import '../app/globals.css'

import Layout from '@/app/components/Layout/Layout'
import styles from '../app/styles/modificar.module.css'
import TabsNav from '@/app/components/Tabs/TabsNav'
import TextComponent from '@/app/components/TextComponent/TextComponent'
import Buttons from '@/app/components/Buttons/Buttons'
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import { DialogContent } from '@mui/material';
import {useState, useEffect} from 'react';
import { useRouter } from 'next/router'

import libroApi from "../app/api/libro.js";
import usuarioApi from "../app/api/usuario.js"

export default function addPage() {
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [usuario, setUsuario] = useState({"nombre" : '', "tipoUsuario" : 'admin'})
    const [libro, setLibro] = useState({});
    const [textos, setTextos] = useState({});

    const datos = [
        {
            id: 0,
            label: 'Modificar libro'
        }
    ]

    const handleOnLoad = async () => {
        const userId = localStorage.getItem('usuario');
        console.log(userId)
        
        const user = await usuarioApi.findOne(userId);
        console.log(user?.data)

        const id = router.query.id;
        const book = await libroApi.findOne(id)

        setUsuario(user?.data)
        setLibro(book?.data)
    }

    useEffect(() => {
        handleOnLoad();
    }, [])

    const handleText = (e) => {
        setTextos({...textos, [e.target.name] : e.target.value})
    }

    const handleClickOpen = () => {
        setOpen(true);
      };

    const handleClose = async (e) => {
        console.log(e.target.name)
        if (e.target.name !== undefined) {
            await libroApi.remove(libro.id)
        }
        setOpen(false);

        router.push("/biblioteca")
    }

    const handleClick = async () => {
        const modificacion = 
        {
            id: libro.id,
            titulo: textos.titulo !== undefined ? textos.titulo : libro.titulo,
            autor: textos.autor !== undefined ? textos.autor : libro.autor,
            isbn13: textos.isbn13 !== undefined ? textos.isbn13 : libro.isbn13,
            editorial: textos.editorial !== undefined ? textos.editorial : libro.editorial,
            categoria: libro.categoria,
            cantidadReservas: libro.cantidadReservas,
            portada: libro.portada
        }
        alert('Modificación realizada');
        console.log(modificacion);

        await libroApi.update(modificacion);
        router.push('/biblioteca');
    }

    if (usuario.tipoUsuario === 'admin'){
        return (
            <>
                <Layout user={usuario.tipoUsuario}/>
                <main>
                    <h1 className={styles.titulo}>Hola, {usuario.nombre}</h1>
                    <div>
                        <img src='/horizontal-line.png' alt="linea" width='99%'/>
                    </div>
                    <section className={styles.section}>
                        <div className={styles.imagen}>
                            <img src={libro?.portada}/>
                        </div>
                        <div className={styles.tabs}>
                            <TabsNav datos={datos} value={0}/>
                            <div className={styles.c2}>
                                <TextComponent 
                                label={'Titulo'}
                                name={'titulo'}
                                width={'300px'}
                                onChange={handleText}/>
                                <TextComponent 
                                label={'Autor, autores'}
                                name={'autor'}
                                width={'300px'}
                                onChange={handleText}/> 
                                <TextComponent 
                                label={'ISBN'}
                                name={'isbn13'}
                                width={'300px'}
                                onChange={handleText}/> 
                                <TextComponent 
                                label={'Editorial'}
                                name={'editorial'}
                                width={'300px'}
                                onChange={handleText}/>  
                                <Buttons
                                label={'Guardar'}
                                variant={'outlined'}
                                onClick={handleClick}
                                width={'300px'}
                                />
                                <Button
                                    sx={{
                                        display: 'flex',
                                        width: '100px',
                                        height: '40px',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap: '8px',
                                        borderRadius: '100px',
                                        border: 0,
                                        padding: '10px 24px',
                                        color: 'var(--m-3-sys-light-primary, red)',
                                        textTransform: 'none',
                                    }}
                                    variant='outlined'
                                    onClick={handleClickOpen}
                                >
                                    Eliminar
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
                                        Eliminar libro
                                    </DialogTitle>
                                    <DialogContent>
                                        <Typography sx={{
                                            alignSelf: 'stretch', 
                                            fontSize: '14px',
                                            fontStyle: 'normal',
                                            fontWeight: '400',
                                            lineHeight: '20px',
                                        }}>
                                            Estas seguro que desea eliminar
                                            el libro?
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
                                        }}
                                        name='Eliminar'
                                        >
                                            Si
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </div>
                        </div>
                    </section>
                </main>
            </>
        )
    }
}