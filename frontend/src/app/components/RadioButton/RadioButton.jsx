import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

export default function RadioButtons({onChange}) {
  return (
    <FormGroup sx={{
        '& .MuiSvgIcon-root': {fontSize: 30},
        '& .MuiRadio-root.Mui-checked': {color: '#6750A4'},
        color: '#6750A4',
        fontSize: '14px',
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: '20px'
    }}>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
      >
        <FormControlLabel value='titulo' control={<Radio onChange={onChange} name='titulo'/>} label="Título" />
        <FormControlLabel value='autor' control={<Radio onChange={onChange} name='autor'/>} label="Autor, autores" />
        <FormControlLabel value='editorial'control={<Radio onChange={onChange} name='editorial'/>} label="Editorial" />
        <FormControlLabel value='isbn' control={<Radio onChange={onChange} name='isbn13'/>} label="ISBN" />
      </RadioGroup>
    </FormGroup>
  );
}