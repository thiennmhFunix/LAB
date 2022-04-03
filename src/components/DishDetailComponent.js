import React from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';


    function RenderDish({dish}) {
        if (dish != null) {
            return(
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <CardBody>
                            <CardTitle>Comments</CardTitle>
                            <CardText>{dish.comments.map((comment) => {
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
                <RenderDish dish={props.dish} />
            </div>
        );
    }


export default DishDetail;