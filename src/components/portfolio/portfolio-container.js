import React, { Component } from "react";
import axios from 'axios';

import PortfolioItem from "./portfolio-item";



export default class PortfolioContainer extends Component {
    constructor(){
        super();

        this.state = {
            pageTitle: "Welcome to my portfolio",
            isLoading: false,
            data: []

            // Una vez importados de la api lo de abajo no hace falta
            // data: [
            //     {title:"Quip",category: "eCommerce", slug: 'quip'}, 
            //     {title:"Evenbrite", category: "Scheduling", slug: 'eventBrite'}, 
            //     {title:"Minsitry Safe", category: "Enterprise", slug: 'ministry-safe'}, 
            //     {title:"SwingAway", category: "eCommerce", slug: 'swingAway'}
            //     ]
        }
        // this.handlePageTitleUpdate = this.handlePageTitleUpdate.bind(this);
        this.handleFilter = this.handleFilter.bind(this);

        // this.getPortfolioItems = this.getPortfolioItems.bind(this)
    }

    handleFilter(filter){
        this.setState({
            data: this.state.data.filter(item => {
                return item.category === filter;
            })
        })
    }

    getPortfolioItems(){
        axios.get('https://davidgm.devcamp.space/portfolio/portfolio_items')
      .then(response => {
        // handle success
         console.log("response data", response);
        this.setState({
            data: response.data.portfolio_items
        })
      })
      .catch(error => {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
      }

    portfolioItems(){

        return this.state.data.map(item => {
            // debugger;
            // console.log("portfolio item", item)
            return (
            <PortfolioItem 
            key={item.id} 
            item={item}
            />
            );
        })
    }

    // handlePageTitleUpdate(){
    //     this.setState({
    //         pageTitle: "Something Else"
    //     })
    // }

componentDidMount(){
    this.getPortfolioItems();
}

    render() {
        if (this.state.isLoading){
            return <div>Loading...</div>
        }

        return (
            <div className="portfolio-items-wrapper">
                {/* <h2>
                    {this.state.pageTitle}
                </h2> */}
                

                <button className="btn" onClick={()=> this.handleFilter('eCommerce')}>eCommerce</button>
                <button className="btn" onClick={()=> this.handleFilter('Scheduling')}>Scheduling</button>
                <button className="btn" onClick={()=> this.handleFilter('Enterprise')}>Enterprise</button>

                {/* <hr/> */}
                {/* <button onClick={this.handlePageTitleUpdate}>Change Title</button> */}

                
                    {this.portfolioItems()}
                </div>

        )
    }
}