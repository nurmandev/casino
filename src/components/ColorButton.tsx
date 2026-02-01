import { styled } from '@mui/material/styles';

import Button, { ButtonProps } from '@mui/material/Button';

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    borderRadius: '0.5rem',
    textTransform: 'capitalize',
    height: '2.5rem',
    color: '#000',
    fontWeight: '800',
    backgroundImage: 'linear-gradient(90deg, rgb(36, 238, 137), rgb(159, 232, 113))',
    boxShadow: 'rgba(35, 238, 136, 0.3) 0px 0px 12px, rgb(29, 202, 106) 0px -2px inset'
}));

export default ColorButton;
