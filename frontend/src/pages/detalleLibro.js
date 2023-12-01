import '../app/globals.css'

import { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import Layout from '@/app/components/Layout/Layout'
import styles from '../app/styles/detalle.module.css'
import { Avatar } from '@mui/material'
import DataChips from '@/app/components/DataChips/DataChips'
import { Chip } from '@mui/material'
import DateComponent from '@/app/components/DateComponent/DateComponent'
import BasicDialog from '@/app/components/BasicDialog/BasicDialog'
import { useRouter } from 'next/router'

import librosApi from "../app/api/libro.js"
import reservaApi from "../app/api/reserva.js"
import usuarioApi from "../app/api/usuario.js"

export default function DetallePage() {
    const router = useRouter();
    const today = dayjs().format('YYYY-MM-DD');

    const [libro, setLibro] = useState({titulo: '', editorial: '', portada:'/book.png'});
    const [reserva, setReserva] = useState({fechaReserva: '', fechaDevolucion: ''});
    const [fecha, setFecha] = useState(dayjs().format('YYYY-MM-DD'));
    const [usuario, setUsuario] = useState({"nombre" : '', "tipoUsuario" : '', id : 1})

    const handleOnLoad = async () => {
        const userId = localStorage.getItem('usuario');
        console.log(userId)
        
        const user = await usuarioApi.findOne(userId);
        console.log(user?.data)
        
        const id = router.query.id
        console.log(id)

        const book = await librosApi.findOne(id)
        const resultReserva = await reservaApi.findLibro(id)
        console.log(book?.data);
        console.log(resultReserva?.data);

        setUsuario(user?.data)
        setLibro(book?.data)
        setReserva(resultReserva?.data)
    }

    const handleChange = (time) => {
        setFecha(time.format('YYYY-MM-DD'));
    }

    const handleReserva = () => {
        if (reserva?.fechaDevolucion < today || reserva?.fechaDevolucion === undefined){
            return(
                <>
                    <div className={styles.date}>
                        <DateComponent onChange={handleChange}/>
                    </div>
                    <div className={styles.button}>
                        <BasicDialog
                        title={'Reserva completada'}
                        btnLabel={'Reservar'}
                        width={'168px'}
                        variant={'contained'}
                        libro={libro}
                        nuevaFecha={fecha}
                        usuario={usuario}
                        />
                    </div>
                </>
            )
        }
        // else {
        //     return(
        //         <div className={styles.downSection}>
        //             <p className={styles.reservar}>
        //                 {'Reservado por ' + userReserva?.nombre + ' ' + userReserva?.apellido}
        //             </p>
        //         </div>
        //     )
        // }
    }

    useEffect(() => {
        handleOnLoad();
    }, [])

        return (
            <>
                <Layout user={usuario?.tipoUsuario}/>
                <main>
                    <div className={styles.mainTitle}>
                        <h1 className={styles.title}>Citas</h1>
                    </div>
                    <section className={styles.rect}>
                        <div className={styles.sectionHeader}>
                            <div className={styles.contentHeader}>
                                <Avatar sx={{ 
                                    bgcolor: '#EADDFF', 
                                    color: '#1D1B20',
                                    marginTop: '5px',
                                }} 
                                aria-label="recipe">
                                    {libro?.titulo[0]}
                                </Avatar>
                                <p className={styles.libro}>{libro?.titulo}</p>
                            </div>
                            <div className={styles.chip}>
                                <DataChips text={reserva?.fechaDevolucion > today ? 'Reservado' : 'Disponible'} variant={'normal'}/>
                            </div>
                        </div>
                        <div className={styles.sectionContent}>
                            <img src={libro?.portada} alt='portada'/>
                            <p className={styles.description}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dapibus, odio sed suscipit rhoncus, 
                                massa nibh ultricies urna, a viverra tortor orci id dolor. Suspendisse id odio tortor. Nullam eu sapien ipsum. 
                                Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Duis aliquam dignissim libero suscipit finibus. 
                                Morbi placerat euismod erat, ut sodales dolor porta in. Proin sed velit a augue ultrices efficitur pulvinar suscipit tortor. 
                                Etiam sodales dolor sed maximus tincidunt. Ut ac mauris risus. Sed iaculis accumsan elit eget iaculis. Fusce suscipit sem metus, 
                                sit amet aliquet enim sagittis nec. Quisque et nunc est
                            </p>
                            <div className={styles.divEditorial}>
                                <p className={styles.editorial}>Editorial:</p>
                                <p className={styles.description2}>{libro?.editorial}</p>
                            </div>
                        </div>
                        <div className={styles.sectionFooter}>
                            <p className={styles.topicos}>Tópicos</p>
                            <div className={styles.topicChips}>
                                <Chip sx={{
                                    display: 'inline-flex',
                                    justifyContent: 'center',
                                    height: '32px',
                                    alignItems: 'center',
                                    border: '1px solid var(--m-3-sys-light-outline, #79747E)',
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    fontStyle: 'normal',
                                    fontWeight: '500',
                                    lineHeight: '20px',
                                    textTransform: 'capitalize',
                                    color: '#1D192B',
                                }}
                                label={libro?.categoria}
                                variant='outlined'
                                />
                            </div>
                        </div>
                    </section>
                    <div className={styles.downSection}>
                        <p className={styles.reservar}>Reservar</p>
                        <img src='/horizontal-line.png' width='99%'/>
                        {handleReserva()}
                    </div>
                </main>
            </>
        )
 
    }