import React, { Component } from "react";
import Home from "./HomeComponent";
import Menu from "./MenuComponent";
import Contact from "./ContactComponent";
import Aboutus from "./AboutusComponent";
import DishDetail from "./DishDetailComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import {
	Routes,
	Route,
	Navigate,
	useParams,
	useLocation,
	useNavigate,
} from "react-router-dom";
import { connect } from "react-redux";
import {
	postComment,
	fetchDishes,
	fetchComments,
	fetchPromos,
} from "../redux/ActionCreators";
import { actions } from "react-redux-form";
import { TransitionGroup, CSSTransition } from "react-transition-group";

function withRouter(Component) {
	function ComponentWithRouterProp(props) {
		let location = useLocation();
		let navigate = useNavigate();
		let params = useParams();
		return (
			<Component
				{...props}
				router={{ location, navigate, params }}
				location={location}
			/>
		);
	}

	return ComponentWithRouterProp;
}

const mapStateToProps = (state) => {
	return {
		dishes: state.dishes,
		comments: state.comments,
		promotions: state.promotions,
		leaders: state.leaders,
	};
};

const mapDispatchToProps = (dispatch) => ({
	postComment: (dishId, rating, author, comment) => {
		dispatch(postComment(dishId, rating, author, comment));
	},
	fetchDishes: () => {
		dispatch(fetchDishes());
	},
	fetchComments: () => {
		dispatch(fetchComments());
	},
	fetchPromos: () => {
		dispatch(fetchPromos());
	},
	// reset form after submitting
	resetFeedbackForm: () => {
		dispatch(actions.reset("feedback"));
	},
});

class Main extends Component {
	componentDidMount() {
		this.props.fetchDishes();
		this.props.fetchComments();
		this.props.fetchPromos();
	}

	render() {
		const DishWithId = () => {
			const params = useParams();

			return (
				<DishDetail
					dish={
						this.props.dishes.dishes.filter(
							(dish) => dish.id === parseInt(params.dishId, 10)
						)[0]
					}
					isLoading={this.props.dishes.isLoading}
					errMess={this.props.dishes.errMess}
					comments={this.props.comments.comments.filter(
						(comment) => comment.dishId === parseInt(params.dishId, 10)
					)}
					postComment={this.props.postComment}
					commentsErrMess={this.props.comments.errMess}
				/>
			);
		};

		return (
			<div>
				<Header />
				<TransitionGroup>
					<CSSTransition
						key={this.props.location.key}
						classNames="page"
						timeout={300}
					>
						<Routes location={this.props.location}>
							<Route
								path="home"
								element={
									<Home
										dish={
											this.props.dishes.dishes.filter(
												(dish) => dish.featured
											)[0]
										}
										dishesLoading={this.props.dishes.isLoading}
										dishesErrMess={this.props.dishes.errMess}
										promotion={
											this.props.promotions.promotions.filter(
												(promotion) => promotion.featured
											)[0]
										}
										promosLoading={this.props.promotions.isLoading}
										promosErrMess={this.props.promotions.errMess}
										leader={
											this.props.leaders.filter((leader) => leader.featured)[0]
										}
									/>
								}
							/>
							<Route
								exact
								path="menu"
								element={<Menu dishes={this.props.dishes} />} // this.props.dishes.dishes is defined in MenuComponent!
							/>
							<Route path="menu/:dishId" element={<DishWithId />} />
							<Route exact path="aboutus" element={<Aboutus />} />
							<Route
								exact
								path="contactus"
								element={
									<Contact resetFeedbackForm={this.props.resetFeedbackForm} />
								}
							/>
							<Route path="*" element={<Navigate to="/home" replace />} />
						</Routes>
					</CSSTransition>
				</TransitionGroup>
				<Footer />
			</div>
		);
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
