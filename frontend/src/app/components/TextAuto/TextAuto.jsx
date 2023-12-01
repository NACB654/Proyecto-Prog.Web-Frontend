import * as React from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';

export default function TextAuto({options, onChange}) {
    return (
        <Autocomplete
          multiple
          id="tags-outlined"
          options={options}
          filterSelectedOptions
          onChange={onChange}
          renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip variant="outlined" 
                label={option}
                deleteIcon={<CloseIcon style={{color: '#79747E'}}/>}
                {...getTagProps({ index })} />
              ))
            }
          renderInput={(params) => (
           <TextField
              {...params}
              label="Tipo de recurso"
              variant='outlined'
              sx={{
                  width: '392px',
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
          />
          )}
        />
    )
}