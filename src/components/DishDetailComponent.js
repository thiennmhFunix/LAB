import React, { Component} from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {

    constructor(props) {
        super(props);
    }

    renderDish(dish) {
        if (dish != null) {
            return(
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <Card>
                            <CardImg width="100%" src={dish.image} alt={dish.name} />
                            <CardBody>
                                <CardTitle>{dish.name}</CardTitle>
                                <CardText>{dish.description}</CardText>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <Card>
                            <CardBody>
                                <CardTitle>Comments</CardTitle>
                                <CardText>{dish.comments.map((comment) => {
                                    return (
                                        <div key={comment.id}>
                                            <p>{comment.comment}</p>
                                            <p>-- {comment.author}, {comment.date}</p>
                                        </div>
                                    );
                                })}</CardText>
                            </CardBody>
                        </Card>
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

    render() {

        return (
            <div className="container">
                {this.renderDish(this.props.selectedDish)}
            </div>
        );
    }

}

export default DishDetail;