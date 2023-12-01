import '../app/globals.css'

import styles from '../app/styles/registro.module.css'
import TextComponent from '@/app/components/TextComponent/TextComponent'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import usuariosApi from "../app/api/usuario.js"

export default function RegistroPage() {
    const router = useRouter();

    const personales = ['Nombres', 'Apellidos', 'Tipo de documento', 'Nro de documento'];
    const cuenta = ['Correo electronico', 'Contraseña', 'Ingrese la contraseña nuevamente'];
    const [value, setValue] = useState({});

    const handleChange = (e) => {
        setValue({...value, [e.target.name] : e.target.value})
    }

    const handleClick = async () => {
        if (value["Contraseña"] === value['Ingrese la contraseña nuevamente']) {

            const nuevoUsuario = 
            {
                nombre: value["Nombres"] !== undefined ? value["Nombres"] : "Sin nombre",
                apellido: value["Apellidos"] !== undefined ? value["Apellidos"] : "Sin apellido",
                tipoDocumento: value["Tipo de documento"] !== undefined ? value["Tipo de documento"] : "DNI",
                nroDocumento: value["Nro de documento"] !== undefined ? value["Nro de documento"] : "99999999",
                correo: value["Correo electronico"]  !== undefined ? value["Correo electronico"] : "sincorreo@sample.com",
                password: value["Contraseña"],
                tipoUsuario: "usuario",
                foto: "user.png"
            }

            console.log(nuevoUsuario)
            alert("Se ha registrado correctamente")
            await usuariosApi.create(nuevoUsuario);

            router.push("/login")
        }
        else {
            alert("Las constraseñas no coiciden. Vuelve a intentarlo")
        }
    }

    return (
        <div className={styles.center}>
            <h1 className={styles.titulo}> Sistema de reserva de libros</h1>
            <h2 className={styles.subtitulo}>Registro de usuario</h2>
            <div className={styles.campos}>
                <div className={styles.personales}>
                    <p className={styles.nombreCampo}>Datos personales</p>
                    {personales.map(item => {
                        return (
                            <TextComponent 
                                label={item}
                                name={item}
                                width={'291px'}
                                onChange={handleChange}
                            />
                        )
                    })}
                </div>
                <div className={styles.cuenta}>
                    <p className={styles.nombreCampo}>Datos de la cuenta</p>
                    {cuenta.map(item => {
                        return (
                            <TextComponent
                                label={item}
                                name={item}
                                width={'291px'}
                                onChange={handleChange}
                            />
                        )
                    })}
                    <Button sx={{
                        display: 'flex',
                        width: '291px',
                        height: '40px',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '8px',
                        borderRadius: '100px',
                        marginTop: '15px',
                        background: 'var(--m-3-sys-light-secondary-container, #E8DEF8)',
                        padding: '10px 12px',
                        color: 'var(--m-3-sys-light-on-secondary-container, #1D192B)',
                        textTransform: 'none',
                        }} 
                    variant='contained'
                    onClick={handleClick}>
                        Registrar
                    </Button>
                </div>
            </div>
        </div>
    )
}