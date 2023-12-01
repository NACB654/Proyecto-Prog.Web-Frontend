import '../app/globals.css'

import Layout from '@/app/components/Layout/Layout'
import styles from '../app/styles/add.module.css'
import TabsNav from '@/app/components/Tabs/TabsNav'
import TextComponent from '@/app/components/TextComponent/TextComponent'
import Buttons from '@/app/components/Buttons/Buttons'
import {useState, useEffect} from 'react';
import { useRouter } from 'next/router'

import librosApi from "../app/api/libro.js"
import usuarioApi from "../app/api/usuario.js"

export default function addPage() {
    const router = useRouter();

    const [usuario, setUsuario] = useState({"nombre" : '', "tipoUsuario" : 'admin'})
    const [textos, setTextos] = useState({});

    const datos = [
        {
            id: 0,
            label: 'Insertar nuevo libro'
        }
    ]

    const handleOnLoad = async () => {
        const userId = localStorage.getItem('usuario');
        console.log(userId)
        
        const user = await usuarioApi.findOne(userId);
        console.log(user?.data)

        setUsuario(user?.data)
    }

    useEffect(() => {
        handleOnLoad()
    }, [])

    const handleText = (e) => {
        setTextos({...textos, [e.target.name] : e.target.value})
    }

    const handleClick = async () => {
        const nuevoLibro = 
        {
            titulo: textos.titulo !== undefined ? textos.titulo : "No definido",
            autor: textos.autor !== undefined ? textos.autor : "No definido",
            isbn13: textos.isbn13 !== undefined ? textos.isbn13 : "No definido",
            editorial: textos.editorial !== undefined ? textos.editorial : "No definido",
            categoria: "Progamacion Web",
            cantidadReservas: 0,
            portada: "book.png"
        }
        alert('Se ha añadido el libro correctamente');
        console.log(nuevoLibro);
        await librosApi.create(nuevoLibro);
        router.push('/biblioteca');
    }

    if (usuario.tipoUsuario === 'admin'){
        return (
            <>
                <Layout user={usuario.user}/>
                <main>
                    <h1 className={styles.titulo}>Hola, {usuario.nombre}</h1>
                    <div>
                        <img src='/horizontal-line.png' alt="linea" width='99%'/>
                    </div>
                    <section className={styles.section}>
                        <div className={styles.imagen}>
                            <img src='libreria.png' alt='libreria'/>
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
                            </div>
                        </div>
                    </section>
                </main>
            </>
        )
    }
}