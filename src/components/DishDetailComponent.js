import React, { useState } from "react";
import {
	CardImg,
	CardText,
	CardBody,
	CardTitle,
	Breadcrumb,
	BreadcrumbItem,
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	Label,
	Row,
	Col,
} from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Link } from "react-router-dom";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";

function CommentForm(props) {
	const { dishId, addComment } = props;

	const [isModalOpen, setModalOpen] = useState(false);
	const [newRating, setNewRating] = useState("");
	const [newAuthor, setNewAuthor] = useState("");
	const [newComment, setNewComment] = useState("");

	const required = (val) => val && val.length;
	const maxLength = (len) => (val) => !val || val.length <= len;
	const minLength = (len) => (val) => val && val.length >= len;

	function toggleModal() {
		setModalOpen(!isModalOpen);
	}

	function handleAdd() {
		toggleModal();
		addComment(dishId, newRating, newAuthor, newComment);
	}

	return (
		<div className="col-12 col-md-5 m-1">
			<Button onClick={toggleModal}>Submit Comment</Button>
			<Modal isOpen={isModalOpen} toggle={toggleModal}>
				<ModalHeader>Submit Comment</ModalHeader>
				<ModalBody>
					<LocalForm onSubmit={handleAdd}>
						<Row className="form-group">
							<Label htmlFor="rating">Rating</Label>
							<Col md={12}>
								<Control.select
									model=".rating"
									id="rating"
									name="rating"
									className="form-control"
									value={newRating}
									onChange={(e) => setNewRating(e.target.value)}
								>
									<option value="1">1</option>
									<option value="2">2</option>
									<option value="3">3</option>
									<option value="4">4</option>
									<option value="5">5</option>
								</Control.select>
							</Col>
						</Row>
						<Row className="form-group">
							<Label htmlFor="author">Your Name</Label>
							<Col md={12}>
								<Control.text
									model=".author"
									id="author"
									name="author"
									className="form-control"
									value={newAuthor}
									onChange={(e) => setNewAuthor(e.target.value)}
									validators={{
										required,
										minLength: minLength(3),
										maxLength: maxLength(15),
									}}
								/>
							</Col>
							<Errors
								className="text-danger"
								model=".author"
								show="touched"
								messages={{
									required: "Required",
									minLength: "Must be greater than 2 characters",
									maxLength: "Must be 15 characters or less",
								}}
							/>
						</Row>
						<Row className="form-group">
							<Label htmlFor="comment">Comment</Label>
							<Col md={12}>
								<Control.textarea
									rows="5"
									model=".comment"
									id="comment"
									name="comment"
									className="form-control"
									value={newComment}
									onChange={(e) => setNewComment(e.target.value)}
								/>
							</Col>
						</Row>
						<Row className="form-group">
							<Col md={{ size: 10, offset: 5 }}>
								<Button type="submit" color="primary">
									Submit
								</Button>
							</Col>
						</Row>
					</LocalForm>
				</ModalBody>
			</Modal>
		</div>
	);
}

function RenderComment(comment) {
	return (
		<div key={comment.id}>
			<p>{comment.comment}</p>
			<p>
				-- {comment.author},{" "}
				{new Intl.DateTimeFormat("en-US", {
					year: "numeric",
					month: "short",
					day: "2-digit",
				}).format(new Date(Date.parse(comment.date)))}
			</p>
		</div>
	);
}

function RenderDish(props) {
	if (props.dish != null) {
		return (
			<div className="row">
				<div className="col-12 col-md-5 m-1">
					<CardImg
						width="100%"
						src={baseUrl + props.dish.image}
						alt={props.dish.name}
					/>
					<CardBody>
						<CardTitle>{props.dish.name}</CardTitle>
						<CardText>{props.dish.description}</CardText>
					</CardBody>
				</div>
				<div className="col-12 col-md-5 m-1">
					<CardBody>
						<CardTitle>Comments</CardTitle>
						<CardText>
							{props.comments.map((comment) => RenderComment(comment))}
						</CardText>
						<CommentForm dishId={props.dishId} addComment={props.addComment} />
					</CardBody>
				</div>
			</div>
		);
	} else {
		return <div></div>;
	}
}

const DishDetail = (props) => {
	if (props.isLoading) {
		return (
			<div className="container">
				<div className="row">
					<Loading />
				</div>
			</div>
		);
	} else if (props.errMess) {
		return (
			<div className="container">
				<div className="row">
					<h4>{props.errMess}</h4>
				</div>
			</div>
		);
	} else {
		return (
			<div className="container">
				<div className="row">
					<Breadcrumb>
						<BreadcrumbItem>
							<Link to="/menu">Menu</Link>
						</BreadcrumbItem>
						<BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
					</Breadcrumb>
					<div className="col-12">
						<h3>{props.dish.name}</h3>
						<hr />
					</div>
				</div>
				<RenderDish
					dish={props.dish}
					comments={props.comments}
					addComment={props.addComment}
					dishId={props.dish.id}
				/>
			</div>
		);
	}
};

export default DishDetail;
