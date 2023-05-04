import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// props permite recibir propiedades
export default class PortfolioItem extends Component{
    constructor(props){
        super(props);
        
        this.state = {
            portfolioItemClass:""
        };
    }

    handleMouseEnter(){
        this.setState({portfolioItemClass:"image-blur"})
    }

    handleMouseLeave(){
        this.setState({portfolioItemClass:""})
    }

    render(){
            // Data what we'll need:
        // - background img: 'thumb_image_url'
        // - logo: 'logo_url'
        // - description: description
        // - id: id
        // [ 'url', 'category', 'position' 'column_names_merged_with_images']

            // Desestructuracion
        const { id, description, thumb_image_url, logo_url} = this.props.item;
    return(
        <div className='portfolio-item-wrapper'
            // {/* <h3>{props.title}</h3>
            // <h4>{props.url}</h4> */}
            // {/* <Link to={`/portfolio/${props.slug}`}>Link</Link> */}

            // {/* <img src={thumb_image_url} /> */}
            // {/* <img src={logo} />
            // <div>{description}</div>
            
            // <Link to={`/portfolio/${id}`}>Link</Link> */}

            // {/* Llamamos a los Event Listeners. La sintaxis carga la funcion y espera para ejecutarse. */}
            onMouseEnter={() => this.handleMouseEnter()}
            onMouseLeave={() => this.handleMouseLeave()}

            
        >
            <div 
                className={'portfolio-img-background ' + this.state.portfolioItemClass}
                style={{
                    backgroundImage: "url(" + thumb_image_url +")"
                }}
            />

                <div className='img-text-wrapper'>
                    <div className='logo-wrapper'>
                        <img src={logo_url} />
                    </div>
                    <div className='subtitle'>{description}</div>
                </div>
                

            </div>
    );
            }
}