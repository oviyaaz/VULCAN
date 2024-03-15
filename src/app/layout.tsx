'use client';

import './globals.css'
import {Inter} from 'next/font/google'
import Moment from 'react-moment';
import 'moment-timezone';
import {createTheme, ThemeProvider} from "@mui/material/styles";

const theme = createTheme({
    typography: {
        allVariants: {
            fontFamily:
                "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
        },
    },
});

const inter = Inter({subsets: ['latin']})


export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <ThemeProvider theme={theme}>
            <body className={inter.className}>{children}</body>
        </ThemeProvider>
        </html>
    )
}
