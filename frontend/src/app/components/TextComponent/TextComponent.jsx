import * as React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

const TextComponent = ({label, type, name, width, icon, onChange}) => {

  if (icon) return (
    <TextField 
      id="outlined-basic"
      label={label}
      name={name}
      variant="outlined"
      sx={{
        width: {width},
        '& label.Mui-focused': {
            color: '#6750A4',
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            border: '2px solid #6750A4'
          },
          '&:hover fieldset': {
            border: '2px solid #6750A4'
          },
          '&.Mui-focused fieldset': {
            borderColor: '#6750A4',
          },
        },
      }} 
      InputProps={{
        startAdornment: 
        <InputAdornment position='start'>
          <SearchIcon />
        </InputAdornment>
      }}
      onChange={onChange}
    />
  )
  else return (
    <TextField 
      id="outlined-basic"
      label={label}
      name={name}
      type={type}
      variant="outlined"
      sx={{
        width: {width},
        '& label.Mui-focused': {
            color: '#6750A4',
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            border: '2px solid #6750A4'
          },
          '&:hover fieldset': {
            border: '2px solid #6750A4'
          },
          '&.Mui-focused fieldset': {
            borderColor: '#6750A4',
          },
        },
      }}
      onChange={onChange}
    />
  )
}

export default TextComponent;