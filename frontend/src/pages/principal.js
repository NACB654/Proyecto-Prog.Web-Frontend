import '../app/globals.css'

import { useEffect, useState } from 'react';
import styles from '../app/styles/principal.module.css'
import HorizontalCards from '@/app/components/HorizontalCards/HorizontalCards';
import Layout from "@/app/components/Layout/Layout";
import dayjs from 'dayjs';

import reservaApi from "../app/api/reserva.js";
import usuarioApi from "../app/api/usuario.js"

export default function PrincipalPage() {
    const today = dayjs().format("YYYY-MM-DD")

    const [usuario, setUsuario] = useState({"nombre" : '', "tipoUsuario" : '', id: 1})
    const [reservas, setReservas] = useState([]);

    let cards = [];

    const handleOnLoad = async () => {
        const userId = localStorage.getItem('usuario');
        console.log(userId)
        
        const user = await usuarioApi.findOne(userId);
        console.log(user?.data)

        setUsuario(user?.data)

        if (user?.data.tipoUsuario == "usuario"){
            console.log('user')
            const reservas = await reservaApi.findLibrosReservados(user.data.id);
            console.log(reservas?.data);

            setReservas(reservas?.data);
        }
        else if (user?.data.tipoUsuario == "admin"){
            console.log('admin')
            const reservas = await reservaApi.findAll();
            console.log(reservas?.data)    

            setReservas(reservas?.data);
        }
    }

    useEffect(() => {
        handleOnLoad()
    }, [])

    function toogleCards () {
        // if (reservas.length < 3){
        //     for (let i = 0; i < reservas.length; i++) {
        //         cards.push(reservas[i]);
        //     }
        // }
        // else {
        //     for (let i = 0; i < 3; i++) {
        //         cards.push(reservas[i]);
        //     }
        // }
        for (let i = 0; i < reservas.length; i++) {
            cards.push(reservas[i]);
        }
    }

    toogleCards();

    if (usuario?.tipoUsuario !== 'admin'){
        return (
            <>
                <Layout user={usuario?.tipoUsuario}/>
                <main>
                    <div className={styles.mainTitle}>
                        <h1 className={styles.perfilName}>Bienvenido {usuario?.nombre}</h1>
                    </div>
                    <div className={styles.line}>
                        <img src='/horizontal-line.png' alt='linea' width='99%'/>
                    </div>
                    <section className={styles.rect}>
                        <h2 className={styles.subtitle1}>Últimas reservas</h2>
                        <article className={styles.horizontalCards}>
                            {cards?.map(item => {
                                return (
                                    <HorizontalCards 
                                    title={item.Libro.titulo}
                                    fecha={item.fechaReserva}
                                    image={item.Libro.portada}/>    
                                )
                            })}
                        </article>
                    </section>
                    <section className={styles.rect}>
                        <h2 className={styles.subtitle1}>Próximos a vencer</h2>
                        <article className={styles.horizontalCards}>
                            {cards?.filter(item => item.fechaDevolucion >= today).sort((a, b) => {return dayjs(a.fechaDevolucion) - dayjs(b.fechaDevolucion)}).map(item => {
                                return (
                                    <HorizontalCards 
                                    title={item.Libro.titulo}
                                    fecha={item.fechaDevolucion}
                                    image={item.Libro.portada}/>
                                )
                            })}
                        </article>
                    </section>
                </main>
            </>
        )
    }
    else {
        return (
            <>
                <Layout user={usuario.tipoUsuario}/>
                <main>
                    <div className={styles.mainTitle}>
                        <h1 className={styles.perfilName}>Bienvenido {usuario?.nombre}</h1>
                    </div>
                    <div className={styles.line}>
                        <img src='/horizontal-line.png' alt='linea' width='99%'/>
                    </div>
                    <section className={styles.rect}>
                        <h2 className={styles.subtitle1}>Últimas reservas</h2>
                        <article className={styles.horizontalCards}>
                            {cards?.map(item => {
                                return (
                                    <HorizontalCards 
                                    title={item.Libro.titulo}
                                    fecha={item.fechaReserva}
                                    image={item.Libro.portada}/>
                                )
                            })}
                        </article>
                    </section>
                    <section className={styles.rect}>
                        <h2 className={styles.subtitle1}>Lo más pedido</h2>
                        <article className={styles.horizontalCards}>
                            {cards?.sort((a, b) => {return b.Libro.cantidadReservas - a.Libro.cantidadReservas}).map(item => {
                                return (
                                    <HorizontalCards 
                                    title={item.Libro.titulo}
                                    fecha={item.Libro.cantidadReservas}
                                    image={item.Libro.portada}/>
                                )
                            })}
                        </article>
                    </section>
                </main> 
            </>
        )
    }
}