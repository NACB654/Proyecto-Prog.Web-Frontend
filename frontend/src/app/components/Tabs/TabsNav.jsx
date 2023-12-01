import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

const TabsNav = ({datos, value, onChange}) => {

    return (
        <Box sx={{ 
            width: '753px',
            height: '43px',
            border: '1px solid #6750A4',
            borderRadius: '10px',
            background: '#FEF7FF'
        }}>
            <Tabs sx={{
                '& button': {padding: '0px 65px'},
                "& button.Mui-selected": {color: '#6750A4'}
            }}
                value={value}
                onChange={onChange}
                centered
                TabIndicatorProps={{style: {backgroundColor: '#6750A4', marginBottom: '5px'}}}
                aria-label="secondary tabs example"
            >
                {datos.map(item => {
                    return (
                        <Tab value={item.id} label={item.label}/>
                    )
                })
                }
            </Tabs>
        </Box>
    )
}

export default TabsNav;