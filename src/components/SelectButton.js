import React from 'react'
import { createTheme, ThemeProvider, styled } from '@mui/material/styles'

const SelectButton = ({children,selected,onClick}) => {

    const Selected = styled('span')({
      border: '1px solid gold',
      borderRadius: 5,
      padding: 10,
      paddingLeft: 20,
      paddingRight: 20,
      fontFamily: 'Montserrat',
      cursor: 'pointer',
      backgroundColor: selected ? 'gold' : '',
      color: selected ? 'black' : '',
      fontWeight: selected ? 700 : 500,
      '&:hover': {
        backgroundColor: 'gold',
        color: 'black',
      },
      width: '22%',
    })

  return (
    <Selected onClick={onClick}>{children}</Selected>
  )
}

export default SelectButton