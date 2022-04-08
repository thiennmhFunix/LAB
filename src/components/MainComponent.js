import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import DishDetail from './DishDetailComponent';
import Header  from './HeaderComponent';
import Footer from './FooterComponent';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { LEADERS } from '../shared/leaders';
import { PROMOTIONS } from '../shared/promotions';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';

class Main extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dishes: DISHES,
            comments: COMMENTS,
            leaders: LEADERS,
            promotions: PROMOTIONS
        };
    }

    
    render() {       
        
        const DishWithId = () => {

            const params = useParams();

            return (
                <DishDetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(params.dishId, 10))[0]} comments={this.state.comments.filter((comment) => comment.dishId === parseInt(params.dishId, 10))} />
            );
        }
        
        return (
            <div>
                <Header />
                <Routes>
                    <Route path="home" element={<Home dish={this.state.dishes.filter((dish) => dish.featured)[0]} 
                    promotion={this.state.promotions.filter((promotion) => promotion.featured)[0]}
                    leader={this.state.leaders.filter((leader) => leader.featured)[0]}
                    />} />
                    <Route exact path="menu" element={<Menu dishes={this.state.dishes} />} />
                    <Route path="menu/:dishId" element={<DishWithId />} />
                    <Route exact path="contactus" element={<Contact />} />
                    <Route path="*" element={<Navigate to="/home" replace />} />
                </Routes>
                <Footer />
            </div>
        );
    }
}

export default Main;
