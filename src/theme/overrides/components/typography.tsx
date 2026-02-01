import { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function Typography(theme: Theme) {
    return {
        MuiTypography: {
            defaultProps: {
                // Prevent invalid HTML nesting: render common text variants as <div> or <span>
                variantMapping: {
                    h1: 'h1',
                    h2: 'h2',
                    h3: 'h3',
                    h4: 'h4',
                    h5: 'h5',
                    h6: 'h6',
                    subtitle1: 'div',
                    subtitle2: 'div',
                    body1: 'div',
                    body2: 'div',
                    caption: 'span',
                    overline: 'span'
                }
            },
            styleOverrides: {
                paragraph: {
                    marginBottom: theme.spacing(2)
                },
                gutterBottom: {
                    marginBottom: theme.spacing(1)
                }
            }
        }
    };
}
