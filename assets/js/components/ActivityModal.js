//React Component import
import React, {Component} from 'react';
//Bootstrap import
import {Glyphicon, Modal, Button, Form, FormGroup, ControlLabel, FormControl,} from 'react-bootstrap';
//Project component import
import CalendarDateBox from './CalendarDateBox';
//Image gallery
import ImageGallery from 'react-image-gallery';

//CSS
import "../../../node_modules/react-image-gallery/styles/css/image-gallery.css";


//CSS import
import '../../styles/modal.css';
import {SUITED_FOR_TYPES} from './SuitedForPicker';
import StarRatingComponent from "react-star-rating-component";
import {
    signupActivity,
    signoffActivity,
    checkIfSignedUp,
    postNewRating,
    postNewComment,
    getComments,
    getHost
} from "../APIFunctions";

class ActivityModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            hasChecked: false,
            attending: false,
            loggedIn: false,
            noComments: true,
            hosting: false,
            comments: []
        }
    }

    shouldComponentUpdate(nextProps, nextState){
        if(this.state.show != nextState.show){
            return true
        }
        if(this.state.comments == nextState.comments){
            return false
        }
        return true
    }


    componentWillReceiveProps(props) {
        this.setState({
            show: props.show
        });
    }

    showMap = () => {
        window.open('https://www.google.no/maps/place/' + this.props.activity.location, '_blank');
    };

    editActivity = () => {
        window.location = "/activity/" + this.props.id;
    };

    closeActivityModal = () => {
        this.setState({
            show: false,
            hasChecked: false,
            hosting: false
        });
    };

    onSignup = () => {
        const request = {
            id: this.props.id
        };
        signupActivity(request, response => {
            if (response.attending == false) {
                this.setState({
                    attending: true
                });
            }
        });
    };

    onSignOf = () => {
        const request = {
            id: this.props.id
        };
        signoffActivity(request, response => {
            if (response.attending == true) {
                this.setState({
                    attending: false
                });
            }
        });
    };
    

    checkIfSignUp = () => {
        const request = {
            id: this.props.id
        };
        checkIfSignedUp(request, response => {
            if (response.attending == true) {
                this.setState({
                    attending: true,
                    hasChecked: true,
                    loggedIn: true
                });
            } else if (response.attending == false) {
                this.setState({
                    loggedIn: true,
                    hasChecked: true
                })
            } else {
                this.setState({
                    loggedIn: false,
                    hasChecked: true
                })
            }
        })
    };

    onRateChange = (nextValue, prevValue, name) => {
        const obj = {
            id: this.props.id,
            rating: nextValue
        };
        postNewRating(obj);
        $("#ratingFeedback").html("Takk for din vurdering.");

    };

    fetchComments = () => {
        getComments(this.props.id,(result) => {
            if (result.message == "ingen kommentar funnet") {
            }
            else {
                 this.setState({
                    comments: result.reverse()
                });
            }
        });
    };



    onPostComment = () => {
        if($("#commentInput").val().trim().length == 0){
            $("#postError").html("En kommentar kan ikke være tom.");
        }else {
            const obj = {
                id: this.props.id,
                comment2: $("#commentInput").val()
            };
            $("#commentInput").val("");
            $("#postError").html("");
            postNewComment(obj);
            this.fetchComments();
        }


    };

    fetchHost = () => {
        getHost(this.props.id,(result) => {
            if(result.host == 'true'){
                this.setState({
                    hosting: true
                });
            }
        });
    };


    render() {
        const {date, activityName, facebook, activityType, suitedForType, provider, adaptions, age, time_start, time_end, location, description, videos, rating, number_of_ratings} = this.props.activity;

        const starRating = rating / number_of_ratings;
        let suitedForContainer = [];
        let carouselContainer = null;
        let attendingContainer = null;
        let ratingContainer = null;
        let postCommentContainer = null;
        let changeActivityContainer = null;
        let commentsContainer = <div id="commentDiv"><h4>Ingen kommentarer</h4></div>;
        let allComments = this.state.comments;

        if (suitedForType >= 0) {
            suitedForContainer = SUITED_FOR_TYPES.filter(type => parseInt(type.value) === suitedForType)[0];
        }

        let videoContainer = null;
        if (videos.length > 0) {
           const videos = this.state.videos.map((video, i) => {
               const path = "/media/video/" + video;
               return (
                   <video className="modal-video" controls="controls" key={i}>
                       <source src={path}/>
                   </video>
               )
               });
           videoContainer =
               <div>
                   <h3 className="modal-image-header">Video fra arrangementet</h3>
                   {videos}
               </div>;
        }

        let images = this.props.images.map(image => {
            {/*<img  key={image} className="modal-image" src={image} alt="Et bilde fra arrangementet"></img>*/}
            return {original: image, thumbnail: image}
        });

        if (this.state.show && !this.state.hasChecked) {
            this.checkIfSignUp();
            if(this.state.loggedIn){
                this.fetchHost()
            }
            if(allComments.length < 1){
                this.fetchComments();
            }
        }

        if (!this.state.loggedIn) {
            attendingContainer =
                <div className="modal-infobox2">
                    <div className="modal-infobox2-element">
                        <h4>Påmelding til {activityName}</h4>
                        <p>Du må være logget inn for å kunne melde deg på dette arrangementet</p>
                    </div>
                </div>;
        } else if (this.state.attending == false) {
            attendingContainer =
                <div className="modal-infobox2">
                    <div className="modal-infobox2-element">
                        <h4>Påmelding til {activityName}</h4>
                        <Button className="btn btn-success" onClick={this.onSignup}>Meld på!</Button>
                    </div>
                </div>;

        } else {
            attendingContainer =
                <div className="modal-infobox2">
                    <div className="modal-infobox2-element">
                        <h4>Du er påmeldt {activityName}</h4>
                        <Button onClick={this.onSignOf} className="btn btn-danger">Meld av</Button>
                    </div>
                </div>;
        }

        let facebookContainer = null;
        if (facebook) {
            // console.log(facebook)
            let fImages = facebook.photos.data.map(image => {
                return <img src={image.images[0].source} key={image.id} className="modal-image"/>
            });

            images = images.concat(fImages);

            facebookContainer = (
                <div className="modal-facebook-container">
                    <h3>Informasjon om arrangementet fra Facebook</h3>
                    <div className="modal-facebook-image">
                    </div>
                </div>
            );
        }

        if (images.length > 0 && this.state.hasChecked) {
            carouselContainer =
                <div>
                    <h3 className="modal-image-header">Bilder fra arrangementet</h3>
                    {/*<Carousel carouselImages={images}/>*/}
                    <div id="imageContainer">
                        <ImageGallery
                            items={images}
                            slideInterval={2000}
                            originalClass="pictureClass"
                            showFullscreenButton={false}
                        />
                    </div>
                </div>;
        }

        if (this.state.loggedIn) {
            ratingContainer =
                <div id="ratingContainer">
                    <StarRatingComponent id="activityRating" name="activityRating" emptyStarColor="#BBB" value={starRating}
                                     onStarClick={this.onRateChange.bind(this)}/>
                    <span id="ratingFeedback"></span>
                </div>;

            postCommentContainer =

                <div id="postComment">
                    <form className="comment-form" method="POST" action="/postComment/">
                        <div className="input-group">
                            <textarea placeholder="Skriv inn din kommentar her" id="commentInput"
                                      className="form-control custom-control">
                            </textarea>
                           <span id="postError"> </span>

                            <span className="input-group-addon btn btn-primary"
                                  onClick={this.onPostComment.bind(this)}>Send</span>
                        </div>
                    </form>
                </div>;
        }

        if(this.state.hosting){
            changeActivityContainer =
                <Button onClick={this.editActivity}>Endre aktivitet</Button>;
        }

        if (allComments.length > 0) {
            commentsContainer =
                <div id="commentDiv">
                    {allComments.map((com, i) =>
                        <div className="commentBackground" key={com.pk}>
                            <p className="date"><span><b>{com.fields.userProfile_name}</b></span> - {com.fields.date}
                            </p>
                            <p className="comment">{com.fields.comment}</p>
                        </div>
                    )}
                </div>;
        }

        return (
            <Modal
                show={this.state.show}
                onHide={this.closeActivityModal}
                bsSize="large"
                aria-labelledby="contained-modal-title-lg">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-lg">
                        <CalendarDateBox date={new Date(date)}/>
                        <div className="modal-title-style">
                            <h1><b>{activityName}</b></h1>
                            <div className="modal-provider-title">Arrangeres av: <b>{provider}</b>
                            </div>
                        </div>
                        {ratingContainer}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-adapted">
                        Dette arrangementet er tilpasset for: <b>{suitedForContainer.label}</b>
                    </div>
                    <div>
                        Antall assistenter: Ikke oppgitt
                    </div>
                    <div className="modal-info-container">
                        <div className="modal-infobox1">
                            <div className="modal-infobox1-element"><Glyphicon glyph="glyphicon glyphicon-user"/>
                                Alder: {age}</div>
                            <div className="modal-infobox1-element"><Glyphicon glyph="glyphicon glyphicon-time"/>
                                Tid: {time_start} - {time_end}</div>
                            <div className="modal-infobox1-element">
                                <Glyphicon glyph="glyphicon glyphicon-map-marker"/>
                                Sted: {location}
                            </div>
                            <div className="modal-infobox1-map">
                                <a onClick={this.showMap}>Vis på kart</a>
                            </div>
                        </div>
                        {attendingContainer}
                    </div>
                    <div>
                        <h2 className="modal-description-header">Om arrangementet</h2>
                        <p className="modal-description">{description}</p>
                    </div>
                    {videoContainer}
                    {carouselContainer}
                    {facebookContainer}
                    <hr/>
                    <h2 className="modal-comments">Kommentarer</h2>
                    {postCommentContainer}
                    {commentsContainer}
                </Modal.Body>
                <Modal.Footer>
                    {changeActivityContainer}
                    <Button onClick={this.closeActivityModal}>Lukk</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default ActivityModal;
