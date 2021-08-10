import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default class BookItem extends Component {
	static propTypes = {
		book: PropTypes.object.isRequired,
	};
	state = {
		imageUrl: "",
		author: "",
		isLoaded: false,
	};

	componentDidMount() {
		const { featured_media, author } = this.props.book;
		const getImageUrl = axios.get(`/wp-json/wp/v2/media/${featured_media}`);
		const getAuthor = axios.get(`/wp-json/wp/v2/users/${author}`);

		Promise.all([getImageUrl, getAuthor]).then((res) => {
			// console.log(res)
			this.setState({
				imageUrl: res[0].data.media_details.sizes.full.source_url,
				author: res[0].data.name,
				isLoaded: true,
			});
		});

		console.log("getMedia", getImageUrl);
	}
	render() {
		const { id, slug, title, excerpt } = this.props.book;
		const { author, imageUrl, isLoaded } = this.state;
		// console.log(this.props.book)

		if (isLoaded) {
			return (
				<div className="book__single_item">
					<h3>{title.rendered}</h3>
					<small>{author}</small>
					<img src={imageUrl} alt={title.rendered} />
					<div
						dangerouslySetInnerHTML={{
							__html: excerpt.rendered,
						}}></div>
					<Link className="linkTo" to={`/book/${id}`}>
						Read Review
					</Link>
				</div>
			);
		}

		return null;
	}
}
