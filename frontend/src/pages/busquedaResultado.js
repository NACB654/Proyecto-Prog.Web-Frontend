import '../app/globals.css'

import styles from '../app/styles/busquedaResultado.module.css'
import BigCard from '@/app/components/BigCard/BigCard'
import Layout from '@/app/components/Layout/Layout'
import Buttons from '@/app/components/Buttons/Buttons'
import Paginacion from '@/app/components/Paginacion/Paginacion'
import { useRouter } from 'next/router'
import { useState, useEffect} from 'react'
import dayjs from 'dayjs'

import librosApi from "../app/api/libro.js"
import reservaApi from "../app/api/reserva.js"
import usuarioApi from "../app/api/usuario.js"

export default function ResultadosPage() {

    const router = useRouter();
    const today = dayjs().format('YYYY-MM-DD');

    const [page, setPage] = useState(1);
    const [libros, setLibros] = useState([]);
    const [reservas, setReservas] = useState([]);
    const [usuario, setUsuario] = useState({"nombre" : '', "tipoUsuario" : '', id : 1})
    
    let cards = [];
    let cardsLength = 0;

    const handleOnLoad = async () => {
        const userId = localStorage.getItem('usuario');
        console.log(userId)
        
        const user = await usuarioApi.findOne(userId);
        console.log(user?.data)

        const filtros = router.query
        console.log(filtros)

        let filterLibros = await librosApi.findFilter(filtros)
        const allReservas = await reservaApi.findAll();
        console.log(filterLibros?.data)
        console.log(allReservas)

        setUsuario(user?.data)
        setLibros(filterLibros?.data);
        setReservas(allReservas?.data);
    }

    const handleReserva = (id) => {
        const estaReservado = reservas?.filter(item => item.idLibro == id)
        console.log(estaReservado)

        if (estaReservado) {
            for (let i = 0; i < estaReservado.length; i++){
                if (estaReservado[i].fechaDevolucion > today)
                    return true
            }
        }
        else {
            return false;
        }
    }

    useEffect(() => {  
        handleOnLoad();
    }, [])

    const handleChange = (event, newPage) => {
        setPage(newPage);
    }

    const handleBack = () => {
        router.push('/busqueda');
    }

    const handleClick = (e) => {
        router.push({
            pathname: '/detalleLibro',
            query: {
                id: e.target.id
            }
        })
    }

    function toogleCards () {
        cardsLength = libros.length
        for (let i = (page - 1) * 3; i < page * 3; i++){
            if (i < cardsLength) {
                cards.push(libros[i]);
            }  
        }
    }
    
    toogleCards();

    return (
        <>
            <Layout user={usuario?.tipoUsuario}/>
            <main>
                <div className={styles.mainTitle}>
                    <h1 className={styles.perfilName}>Búsqueda - Resultados</h1>
                    <Buttons 
                    label={'Volver a buscar'}
                    variant={'contained'}
                    width={'168px'}
                    onClick={handleBack}
                    />
                </div>
                <div className={styles.divImg}>
                    <img src='/horizontal-line.png' alt='linea' width='99%'/>
                </div>
                <section className={styles.mainSection}>
                    <div className={styles.sectionHeader}>
                        <p className={styles.sectionTitle}>Resultados de la búsqueda</p>
                        <Buttons 
                        label={'Ver mis reservas'}
                        variant={'outlined'}
                        width={'162px'}
                        />
                    </div>
                    <article className={styles.articleCard}>
                        <div className={styles.cards}>
                            {cards?.map(item => {
                                return (
                                    <BigCard key={item.id}
                                    id={item.id}
                                    avatar={item.titulo[0]}
                                    title={item.titulo}
                                    image={item.portada}
                                    isbn={item.isbn13}
                                    autor={item.autor}
                                    editor={item.editorial}
                                    onClick={handleClick}
                                    disabled={handleReserva(item.id)}
                                    usuario={usuario}
                                    libro={item}
                                    date={true}/>
                                )
                            })}
                        </div>
                        <div className={styles.pages}>
                            <Paginacion 
                            count={cardsLength}
                            page={page}
                            onChange={handleChange}/>
                        </div>
                    </article>
                </section>
            </main>
        </>
    )
}