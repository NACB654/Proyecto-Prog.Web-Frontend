import '../app/globals.css'

import styles from '../app/styles/biblioteca.module.css'
import { useEffect, useState } from 'react';
import BigCard from '@/app/components/BigCard/BigCard'
import Layout from '@/app/components/Layout/Layout'
import Buttons from '@/app/components/Buttons/Buttons'
import Paginacion from '@/app/components/Paginacion/Paginacion'
import { useRouter } from 'next/router'
import TextComponent from '@/app/components/TextComponent/TextComponent';
import dayjs from 'dayjs';

import librosApi from "../app/api/libro.js"
import reservaApi from "../app/api/reserva.js"
import usuarioApi from "../app/api/usuario.js"

export default function BibliotecaPage() {
    const router = useRouter();
    const today = dayjs().format("YYYY-MM-DD");

    const [page, setPage] = useState(1);
    const [libros, setLibros] = useState([]);
    const [reservas, setReservas] = useState([]);
    const [filtro, setFiltro] = useState('');
    const [usuario, setUsuario] = useState({"nombre" : '', "tipoUsuario" : 'admin', id : 1})
    
    let cards = [];
    let filterLibros = [];
    let cardsLength = 0;

    const handleOnLoad = async () => {
        const userId = localStorage.getItem('usuario');
        console.log(userId)
        
        const user = await usuarioApi.findOne(userId);
        console.log(user?.data)

        const allLibros = await librosApi.findAll();
        const allReservas = await reservaApi.findAll();
        
        setUsuario(user?.data)
        setLibros(allLibros?.data)
        setReservas(allReservas?.data)
    }

    useEffect(() => {
        handleOnLoad()
    }, [])

    const handleChange = (event, newPage) => {
        setPage(newPage);
    }

    const handleBack = () => {
        router.push('/add');
    }

    const handleText = (e) => {
        setFiltro(e.target.value);
    }

    const handleReserva = (id) => {
        const estaReservado = reservas.filter(item => item.idLibro == id)
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

    const handleClick = (e) => {
        router.push({
            pathname: '/detalleLibro',
            query: {
                id: e.target.id
            }
        })
    }

    const handleMod = (e) => {
        router.push({
            pathname: '/modificar',
            query: {
                id: e.target.id
            }
        });
    }

    const filtrar = () => {
        filterLibros = libros.filter(item => item.titulo.toLowerCase().includes(filtro.toLowerCase()))
        cardsLength = filterLibros.length;
    }

    function toogleCards () {
        for (let i = (page - 1) * 3; i < page * 3; i++){
            if (i < cardsLength)
                cards.push(filterLibros[i]);
        }
    }

    filtrar();
    toogleCards();

    if (usuario?.tipoUsuario === 'admin'){
        return (
            <>
                <Layout user={usuario?.tipoUsuario}/>
                <main>
                    <div className={styles.mainTitle}>
                        <h1 className={styles.perfilName}>Biblioteca</h1>
                        <Buttons 
                        label={'Añadir recurso'}
                        variant={'contained'}
                        width={'168px'}
                        onClick={handleBack}
                        />
                    </div>
                    <div className={styles.divImg}>
                        <img src='/horizontal-line.png' alt="linea" width='99%'/>
                    </div>
                    <section className={styles.mainSection}>
                        <div className={styles.sectionHeader}>
                            <TextComponent 
                            label={'Ingresa una palabra clave'}
                            icon={true}
                            width={'590px'}
                            onChange={handleText}/>
                        </div>
                        <article className={styles.articleCard}>
                            <div className={styles.cards}>
                                {cards.map(item => {
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
                                        date={false}
                                        btn={handleMod}
                                        />
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
}