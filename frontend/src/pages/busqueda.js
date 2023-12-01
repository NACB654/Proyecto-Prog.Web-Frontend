import '../app/globals.css'

import { useState, useEffect } from 'react';
import styles from '../app/styles/busqueda.module.css'
import Layout from "@/app/components/Layout/Layout";
import TextComponent from '@/app/components/TextComponent/TextComponent';
import RadioButton from '@/app/components/RadioButton/RadioButton'
import Buttons from '@/app/components/Buttons/Buttons';
import TextAuto from '@/app/components/TextAuto/TextAuto';
import { useRouter } from 'next/router';

import librosApi from "../app/api/libro.js"

export default function BusquedaPage() {
    const router = useRouter();
    const [value, setValue] = useState('');
    const [categorias, setCategorias] = useState([]);
    const [recurso, setRecurso] = useState(['']);
    const [check, setCheck] = useState('titulo');

    const handleOnLoad = async () => {
        const allCategorias = await librosApi.findCategorias(); 

        setCategorias(allCategorias);
    }

    useEffect(() => {
        handleOnLoad();
    },[])

    const handleChange = (Event) => {
        setValue(Event.target.value);
    }

    const handleRecursoChange = (event, newRecurso) => {
        setRecurso(newRecurso)
    }

    const handleCheck = (e) => {
        setCheck(e.target.name)
    }

    const handleSubmit = () => {
        if (check.length == 0 && recurso.length == 0){
            alert('Selecione al menos un recurso o filtro de búsqueda')
        }
        else {
            
            router.push({
                pathname: '/busquedaResultado',
                query: {
                    keyword: value,
                    recurso: recurso,
                    checks: check,
                }
            })
        }    
    }

    return (
        <>
            <Layout />
            <main>
                <div className={styles.mainTitle}>
                    <h1 className={styles.perfilName}>Búsqueda</h1>
                </div>
                <div>
                    <img src='/horizontal-line.png' alt='linea' width='99%'/>
                </div>
                <section className={styles.rect}>
                    <article className={styles.fields}>
                        <div className={styles.innerFields}>
                            <TextComponent 
                            label={'Ingrese la palabra clave'} 
                            width={'590px'} 
                            icon={true} 
                            onChange={handleChange}
                            />
                        </div>
                        <div>
                            <TextAuto 
                            options={categorias}
                            onChange={handleRecursoChange}
                            />
                        </div>
                    </article>
                    <article className={styles.filters}>
                        <div className={styles.filtersOptions}>
                            <p className={styles.filterTitle}>Incluir búsqueda en:</p>
                            <RadioButton onChange={handleCheck}/>
                        </div>
                        <div className={styles.buttons}>
                            <Buttons label={'Limpiar'} variant={'outlined'} width={'96px'}/>
                            <Buttons label={'Buscar'} variant={'contained'} width={'96px'} onClick={handleSubmit}/>
                        </div>
                    </article>
                </section>
            </main>
        </>
    )
}