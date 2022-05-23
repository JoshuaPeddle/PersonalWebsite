import * as React from 'react';
import { styled } from '@mui/material/styles';
import { red, green, blue } from '@mui/material/colors';

/*
xs, extra-small: 0px
sm, small: 600px
md, medium: 900px
lg, large: 1200px
xl, extra-large: 1536px
*/

const Root = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    backgroundColor: red[500],
  },
  [theme.breakpoints.up('md')]: {
    backgroundColor: blue[500],
  },
  [theme.breakpoints.up('lg')]: {
    backgroundColor: green[500],
  },
}));


export default function MediaQuery() {
  return (
    <Root>
        <br>
        </br>
    </Root>
  );
}
