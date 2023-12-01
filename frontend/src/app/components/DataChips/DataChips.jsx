import * as React from 'react';
import Chip from '@mui/material/Chip';
import CloseIcon from '@mui/icons-material/Close';

const DataChips = ({text, variant, onDelete}) => {

    if (variant === 'normal') {
        return (
            <Chip sx={{
                display: 'inline-flex',
                justifyContent: 'center',
                height: '32px',
                alignItems: 'center',
                borderRadius: '8px',
                fontSize: '14px',
                fontStyle: 'normal',
                fontWeight: '500',
                lineHeight: '20px',
                textTransform: 'uppercase',
                color: '#1D192B',
                backgroundColor: '#E8DEF8',
                textTransform: 'capitalize'
            }} 
                label={text}
            />
        )
    }
    else if (variant === 'outlined') {
        return (
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
                label={text}
                variant={variant}
                deleteIcon={<CloseIcon style={{color: '#79747E'}}/>}
                onDelete={onDelete}
            />
        )
    }
}

export default DataChips;