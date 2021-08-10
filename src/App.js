import "./App.css";
import Books from "./components/Books";
import { BrowserRouter as Router, Route } from "react-router-dom";
import BookPage from "./components/BookPage";

function App() {
	return (
		<Router>
			<Route exact path="/" component={Books} />
			<Route exact path="/book/:id" component={BookPage} />
			{/* <Route exact path="/book/:slug" component={BookPage} /> */}
		</Router>
	);
}

export default App;
