import * as React from 'react';
import Button from '@mui/material/Button'

const Buttons = ({id, label, variant, onClick, width, disabled}) => {

    if (variant === 'outlined') {
        return(
            <>
                <Button sx={{
                    display: 'flex',
                    width: {width},
                    height: '40px',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '8px',
                    borderRadius: '100px',
                    border: '1px solid var(--m-3-sys-light-outline, #79747E)',
                    padding: '10px 24px',
                    color: 'var(--m-3-sys-light-primary, #6750A4)',
                    textTransform: 'none',
                }}
                id={id}
                variant={variant}
                onClick={onClick}>
                    {label}
                </Button>
            </>
        )
    }
    else if (disabled){
        return(
            <>
                <Button sx={{
                    display: 'flex',
                    width: {width},
                    height: '40px',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '8px',
                    borderRadius: '100px',
                    border: '1px solid var(--m-3-sys-light-outline, #79747E)',
                    padding: '10px 24px',
                    color: 'var(--m-3-sys-light-on-primary, #FFF)',
                    background: 'var(--m-3-sys-light-primary, #6750A4)',
                    textTransform: 'none',
                }} 
                id={id}
                variant={variant}
                disabled
                onClick={onClick}>
                    {label}
                </Button>
            </>
        )
    }
    else if (variant === 'contained'){
        return(
            <>
                <Button sx={{
                    display: 'flex',
                    width: {width},
                    height: '40px',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '8px',
                    borderRadius: '100px',
                    border: '1px solid var(--m-3-sys-light-outline, #79747E)',
                    padding: '10px 24px',
                    color: 'var(--m-3-sys-light-on-primary, #FFF)',
                    background: 'var(--m-3-sys-light-primary, #6750A4)',
                    textTransform: 'none',
                }} 
                id={id}
                variant={variant}
                onClick={onClick}>
                    {label}
                </Button>
            </>
        )
    }
}

export default Buttons;