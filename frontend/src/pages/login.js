"use client"

import '../app/globals.css'

import styles from '../app/styles/login.module.css'
import TextComponent from '@/app/components/TextComponent/TextComponent'
import Button from '@mui/material/Button'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import usuarioApi from "../app/api/usuario.js"

export default function LoginPage() {
    const router = useRouter();

    const [value, setValue] = useState({});

    const handleChange = (e) => {
        setValue({...value, [e.target.name] : e.target.value})
    }

    const handleClick = async () => {
        const login = 
        {
            correo: value.correo,
            password: value.password
        }
        console.log(login)

        const result = await usuarioApi.findUserForLogin(login)

        if (result) {
            localStorage.setItem('usuario', result.data.id)
            router.push("/principal")
        }
        else {
            alert("Correo o contraseña invalida. Intente de nuevo")
        }
    }

    const handleRegistrar = () => {
        router.push('/registro')
    }

    return (
        <div className={styles.center}>
            <h1 className={styles.titulo}> Sistema de reserva de libros</h1>
            <div className={styles.texts}>
                <TextComponent
                label={'Correo electronico'}
                name={'correo'}
                width={'291px'}
                onChange={handleChange}
                icon={false} />
                <TextComponent
                label={'Contraseña'}
                name={'password'}
                width={'291px'}
                type={'password'}
                onChange={handleChange}
                icon={false} />
            </div>
            <Link href={'/recuperar'} className={styles.olvidar}>
                Olvidé mi contraseña
            </Link>
            <div className={styles.buttons}>
                <Button sx={{
                    display: 'flex',
                    width: '150px',
                    height: '40px',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '8px',
                    borderRadius: '100px',
                    border: 0,
                    padding: '10px 12px',
                    color: 'var(--m-3-sys-light-primary, #6750A4)',
                    textTransform: 'none',
                    }} 
                variant='outlined'
                onClick={handleRegistrar}>
                    Registrar usuario
                </Button>
                <Button sx={{
                    display: 'flex',
                    width: '100px',
                    height: '40px',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '8px',
                    borderRadius: '25px',
                    background: 'var(--m-3-sys-light-secondary-container, #E8DEF8)',
                    padding: '10px 24px',
                    color: 'var(--m-3-sys-light-on-secondary-container, #1D192B)',
                    textTransform: 'none',
                    }} 
                variant='contained'
                onClick={handleClick}>
                    Ingresar
                </Button>
            </div>
        </div>
    )
}