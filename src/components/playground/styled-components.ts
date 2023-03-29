import styled from 'styled-components';
import { Container, Typography } from '@mui/material';

export const StyledContainer = styled(Container)({
  display: 'flex !important',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
});

export const StyledParagraph = styled(Typography)`
  && {
    margin-bottom: 16px;
    text-align: center;
    & strong {
      text-transform: capitalize;
    }
  }
`;

export const StyledLoader = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
