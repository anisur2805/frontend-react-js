import React, { Component } from 'react';
import axios from "axios"
import BookItem from './BookItem';

export default class Books extends Component {
    state = {
        books: [],
        isLoaded: false
    }

    componentDidMount() {
        axios.get("/wp-json/wp/v2/books")
            .then((res) => {
                this.setState({
                    books: res.data,
                    isLoaded: true,
                })
            })
            .catch((err) => console.log(err))
    }
    render() {
        const { books, isLoaded } = this.state;
        if (isLoaded) {
            return (
                <div className="book">
                    { books.map(book => (
                        <BookItem key={ book.id } book={ book } />
                    )) }
                </div>
            )
        }

        return <h1>Loading...</h1>
    }
}
