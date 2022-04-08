import React from "react";
import { CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

function RenderDish(props) {
    if (props.dish != null) {
        return(
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <CardImg width="100%" src={props.dish.image} alt={props.dish.name} />
                    <CardBody>
                        <CardTitle>{props.dish.name}</CardTitle>
                        <CardText>{props.dish.description}</CardText>
                    </CardBody>
                </div>
                <div className="col-12 col-md-5 m-1">
                    <CardBody>
                        <CardTitle>Comments</CardTitle>
                        <CardText>{props.comments.map((comment) => {
                            return (
                                <div key={comment.id}>
                                    <p>{comment.comment}</p>
                                    <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                                </div>
                            );
                        })}</CardText>
                    </CardBody>
                </div>
            </div>
        );
    }
    else {
        return(
            <div></div>    
            );
        }
}

const DishDetail = (props) => {

    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>
            </div>
            <RenderDish dish={props.dish} comments={props.comments} />
        </div>
    );
}


export default DishDetail;