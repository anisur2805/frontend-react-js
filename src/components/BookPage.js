import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class BookPage extends Component {
	state = {
		book: {},
		isLoaded: false,
	};

	componentDidMount() {
		axios
			.get(`/wp-json/wp/v2/books/${this.props.match.params.id}`)
			.then((res) => {
				this.setState({
					book: res.data,
					isLoaded: true,
				});
			})
			.catch((err) => console.log(err));
	}
	render() {
		const { book, isLoaded } = this.state;
		console.log("Book ", book);
		if (isLoaded) {
			return (
				<div className="book__single_page">
					<Link to="/">Go Back</Link>
					{/* <img src={book} /> */}
					<h1>{book.title.rendered}</h1>
					<div
						dangerouslySetInnerHTML={{
							__html: book.content.rendered,
						}}></div>
				</div>
			);
		}
		return <h3>Loading...</h3>;
	}
}
