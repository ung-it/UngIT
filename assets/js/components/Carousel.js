import React from "react"
import {Thumbnail, Glyphicon} from 'react-bootstrap';

class Carousel extends React.Component{

    constructor(props){
        super(props);

    }

    render (){
        let imagesContainer = null;
        /*let images = this.props.images.map(image => {
            return <img  key={image} className="modal-image" src={image} alt="Et bilde fra arrangementet"></img>
        });*/

        if(this.props.carouselImages.length > 0){
            console.log(this.props.carouselImages);
            imagesContainer =
                <div id="myCarousel" class="carousel slide" data-ride="carousel">
                    <ol className="carousel-indicators">
                        {this.props.carouselImages.map((image, i) =>
                            console.log(image.key)
                        )}
                    </ol>
                    <div className="carousel-inner" role="listbox">
                        {this.props.carouselImages.map((image, i) =>
                            <div className="item active">
                            </div>
                        )}
                    </div>
                </div>;
        }
        return(
            <p>hallo</p>
        )
    }
}
export default Carousel;
