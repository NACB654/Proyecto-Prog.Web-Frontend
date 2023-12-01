import '../app/globals.css'

import Layout from '@/app/components/Layout/Layout'
import styles from '../app/styles/perfil.module.css'
import TabsNav from '@/app/components/Tabs/TabsNav'
import TextComponent from '@/app/components/TextComponent/TextComponent'
import Buttons from '@/app/components/Buttons/Buttons'
import { useState, useEffect} from 'react';
import { useRouter } from 'next/router'
import FileInput from '@/app/components/FileInput/FileInput';

import usuarioApi from "../app/api/usuario.js"

export default function PerfilPage() {
    const router = useRouter();

    const [usuario, setUsuario] = useState(
        {
            "id": 1,
            "nombre": "Juan",
            "apellido": "Lopez",
            "tipoDocumento": "DNI",
            "nroDocumento": 12345678,
            "correo": "user01@sample.com",
            "password": "user01",
            "tipoUsuario": "usuario",
            "foto": "user.png"
        }
    )

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

    let datos;

    const handleFileSelect =  (selectedFile) =>
    {
        const reader = new FileReader();

        reader.readAsDataURL(selectedFile);

        reader.onload = async (e) => {
            const img64 = e.target.result;
            console.log(img64);

            const mod = {
                "id": usuario.id,
                "nombre": usuario.nombre,
                "apellido": usuario.apellido,
                "tipoDocumento": usuario.tipoDocumento,
                "nroDocumento": usuario.nroDocumento,
                "correo": usuario.correo,
                "password": usuario.password,
                "tipoUsuario": usuario.tipoUsuario,
                "foto": img64
            }

            await usuarioApi.update(mod)
            console.log('Imagen guardada');
        }

        router.push("/principal")
    }

    if (usuario.user === 'admin'){
        datos = [
            {
                id: 0,
                label: 'Datos Personales'
            },
            {
                id: 1,
                label: 'Cuenta'
            },  
    
            {
                id: 2,
                label: 'Preferencias'
            }
        ]
    }
    else {
        datos = [
            {
                id: 0,
                label: 'Datos Personales'
            },
            {
                id: 1,
                label: 'Cuenta'
            }
        ]
    }
    
    const campos1 = ['Nombres', 'Tipo de documento', 'Apellidos','Nro de documento'];
    const campos2 = ['Correo electronico', 'Contraseña'];
    const campos3 = ['Idioma', 'Prefijo','Color'];

    const valores1 =['nombre', 'tipoDocumento', 'apellido', 'nroDocumento']
    const valores2 = ['correo', 'password'];

    const [value, setValue] = useState(datos[0].id);
    const [campos, setCampos] = useState(campos1);
    const [valores, setValores] = useState(valores1);
    const [textos, setTextos] = useState({});

    const handleChange = (event, newValue) => {
      setValue(newValue);
      switch (newValue) {
        case 0: 
            setCampos(campos1);
            setValores(valores1)
            break;
        case 1: 
            setCampos(campos2);
            setValores(valores2)
            break;
        case 2:
            setCampos(campos3);
            break;
        default: 
            setCampos(campos1);
            setValores(valores1)
            break;
      }
    };

    const handleText = (e) => {
        setTextos({...textos, [e.target.name] : e.target.value})
    }

    const handleClick = async () => {
        const result =
        {
            id: usuario.id,
            nombre: textos.nombre !== undefined ? textos.nombre : usuario.nombre,
            apellido: textos.apellido !== undefined ? textos.apellido : usuario.apellido,
            tipoDocumento: textos.tipoDocumento !== undefined ? textos.tipoDocumento : usuario.tipoDocumento,
            nroDocumento: textos.nroDocumento !== undefined ? textos.nroDocumento : usuario.nroDocumento,
            correo: textos.correo !== undefined ? textos.correo : usuario.correo,
            password: textos.password !== undefined ? textos.password : usuario.password,
            tipoUsuario: usuario.tipoUsuario,
            foto: usuario.foto
        }
        console.log(result);

        await usuarioApi.update(result);
        alert('Los cambios se han realizado correctamento')
        router.push('/principal');
    }

    return (
        <>
            <Layout user={usuario?.tipoUsuario}/>
            <main>
                <h1 className={styles.titulo}>Hola, {usuario?.nombre}</h1>
                <div>
                    <img src='/horizontal-line.png' alt="linea" width='99%'/>
                </div>
                <section className={styles.section}>
                    <div className={styles.imagen}>
                        <img src={usuario?.foto} alt="Imagen Guardada" width="256px" height="256px"/>
                        <FileInput onFileSelect={handleFileSelect}>Cambiar foto</FileInput>
                    </div>
                    <div className={styles.tabs}>
                        <TabsNav datos={datos} value={value} onChange={handleChange}/>
                        <div className={styles.c2}>
                        {campos.map((item, key) => {
                                return(
                                    <TextComponent
                                    label={item}
                                    width={'300px'}
                                    name={valores[key]}
                                    onChange={handleText}/>
                                )
                            })}  
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