import React, { useState, useEffect } from 'react';
import { Container, Button } from '@mui/material';
import BookTable from './components/BookTable';
import Search from './components/Search';
import { getBooks } from './services/api';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const App = () => {
    const [books, setBooks] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [orderBy, setOrderBy] = useState('title');
    const [order, setOrder] = useState('asc');
    const [author, setAuthor] = useState('');
    const [numFound, setNumFound] = useState(0);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await getBooks({ page, rowsPerPage, orderBy, order, author });
                setBooks(response.data.books);
                setNumFound(response.data.numFound);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, [page, rowsPerPage, orderBy, order, author]);

    const theme = createTheme({
        palette: {
            primary: {
                main: '#1976d2',
            },
            secondary: {
                main: '#dc004e',
            },
        },
    });

    // const handleDownloadCSV = () => {
    //     const csvData = convertToCSV(books);
    //     const blob = new Blob([csvData], { type: 'text/csv' });
    //     const link = document.createElement('a');
    //     link.href = window.URL.createObjectURL(blob);
    //     link.download = 'books.csv';
    //     link.click();
    // };

    // const convertToCSV = (data) => {
    //     const headers = Object.keys(data[0]);
    //     const csv = [
    //         headers.join(','),
    //         ...data.map((row) => headers.map((header) => row[header]).join(',')),
    //     ];
    //     return csv.join('\n');
    // };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container>
                <Search setAuthor={setAuthor} />
                {/* <Button onClick={handleDownloadCSV}>Download CSV</Button> */}
                <BookTable
                    books={books}
                    page={page}
                    setPage={setPage}
                    rowsPerPage={rowsPerPage}
                    setRowsPerPage={setRowsPerPage}
                    orderBy={orderBy}
                    setOrderBy={setOrderBy}
                    order={order}
                    setOrder={setOrder}
                    numFound={numFound}
                />
            </Container>
        </ThemeProvider>
    );
};

export default App;