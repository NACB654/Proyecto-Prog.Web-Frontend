import * as React from 'react';
import Pagination from '@mui/material/Pagination';

export default function Paginacion({count, page, onChange}) {

    return (
        <Pagination 
        count={count % 3 === 0 ? count / 3 : ~~(count / 3) + 1} size="small" 
        page={page}
        onChange={onChange}/>
    )
}