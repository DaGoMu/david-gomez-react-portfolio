import React, { Component } from 'react';
import axios from 'axios';

import PortfolioSidebarList from '../portfolio/portfolio-sidebar-list';
import PortfolioForm from '../portfolio/portfolio-form';

export default class PortfolioManager extends Component {
    constructor(){
        super();

        this.state= {
            portfolioItems: [],
            portfolioToEdit: {}
        };

        this.handleNewFormSubmission = this.handleNewFormSubmission.bind(this);
        this.handleEditFormSubmission = this.handleEditFormSubmission.bind(this);
        this.handleFormSubmissionError = this.handleFormSubmissionError.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.clearPortfolioToEdit = this.clearPortfolioToEdit.bind(this)
    }

    clearPortfolioToEdit(){
        this.setState({
            portfolioToEdit: {}
        })
    }

    handleEditClick(portfolioItem){
        this.setState({
            portfolioToEdit: portfolioItem
        })
    }

    handleDeleteClick(portfolioItem){
        // console.log("handleDeleteClick", portfolioItem)
                
        axios.delete(`https://api.devcamp.space/portfolio/portfolio_items/${portfolioItem.id}`, 
        { withCredentials: true }
        ).then(response => {
            // console.log("response from delete", response);
            this.setState({
                // Actualizar lo que se muestra
                // Filtramos la colección y nos deshacemos del que acabamos de eliminar.
                portfolioItems:this.state.portfolioItems.filter(item => {
                    return item.id !== portfolioItem.id;
                })
            })

            return response.data;

        }).catch(error => {
            console.log("handleDeleteClick error", error);
        })
    }

    handleEditFormSubmission(){
        this.getPortfolioItems();
    }

    handleNewFormSubmission(portfolioItem){
        this.setState({
            portfolioItems: [portfolioItem].concat(this.state.portfolioItems)
        })

        // console.log("handleSuccessfulFormSubmission", portfolioItem)
    }
    handleFormSubmissionError(error){
        console.log("handleFormSubmissionError", error)
    }




    getPortfolioItems(){
        axios.get("https://davidgm.devcamp.space/portfolio/portfolio_items?order_by=created_at&direction=desc", 
        {withCredentials: true}
        ). then(response => {
            // console.log("response from get portfolio items", response);
            this.setState({
                portfolioItems: [...response.data.portfolio_items]
            })

        }).catch(error => {
            console.log("Error in getPorftolioItems")
        })
    }

    componentDidMount(){
        this.getPortfolioItems();
    }

    render() {
        return (
            <div className='portfolio-manager-wrapper'>
                <div className='left-column'>
                    <PortfolioForm
                    handleNewFormSubmission={this.handleNewFormSubmission}
                    handleEditFormSubmission={this.handleEditFormSubmission}
                    handleFormSubmissionError={this.handleFormSubmissionError}
                    clearPortfolioToEdit={this.clearPortfolioToEdit}
                    portfolioToEdit={this.state.portfolioToEdit}
                    />
                </div>
                
                <div className='right-column'>
                    <PortfolioSidebarList 
                    handleDeleteClick={this.handleDeleteClick}
                    data= {this.state.portfolioItems} 
                    handleEditClick={this.handleEditClick}
                    />
                </div>
                
            </div>
        );
    }
}