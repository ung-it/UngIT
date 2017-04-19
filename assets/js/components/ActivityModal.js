//React Component import
import React, {Component} from 'react';
//Paper import
import Paper from 'material-ui/Paper';
//Bootstrap import
import {Glyphicon, Modal, Button, Form, FormGroup, ControlLabel, FormControl,} from 'react-bootstrap';
//Project component import
import CalendarDateBox from './CalendarDateBox';
//Image gallery
import ImageGallery from 'react-image-gallery';

//CSS
import "../../../node_modules/react-image-gallery/styles/css/image-gallery.css";

import { getProvider, isNumeric } from '../APIFunctions';

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
            myrating: 0,
            comments: [],
            provider: "",
            fullDescription: false,
        }
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
            hosting: false,
            fullDescription: false,
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
                this.fetchHost();
            } else if (response.attending == false) {
                this.setState({
                    loggedIn: true,
                    hasChecked: true
                });
                this.fetchHost();
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
        this.setState({
            myrating: nextValue
        });
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
            postNewComment(obj).then(this.fetchComments());

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

    fullDes = () => {
        this.setState({
            fullDescription: true
        });
    };

    render() {
        let {date, activityName, assistants_number, assistants_text, facebook, facebookInfo, activityType, suitedForType, provider, adaptions, age, time_start, time_end, location, description, videos, rating, number_of_ratings} = this.props.activity;


        let starRating = rating / number_of_ratings;
        let suitedForContainer = [];
        let carouselContainer = null;
        let attendingContainer = null;
        let ratingContainer = null;
        let postCommentContainer = null;
        let changeActivityContainer = null;
        let commentsContainer = <div id="commentDiv"><h4>Ingen kommentarer</h4></div>;
        let allComments = this.state.comments;
        let descriptionContainer = null;


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

        if(this.state.myrating > 0){
            starRating =
                (rating + this.state.myrating)/(number_of_ratings+1);

            ratingContainer =
                <span id="ratingFeedback">Takk for din vurdering.</span>;
        }

        let images = this.props.images.map(image => {
            {/*<img  key={image} className="modal-image" src={image} alt="Et bilde fra arrangementet"></img>*/}
            return {original: image, thumbnail: image}
        });

        if (this.state.show && !this.state.hasChecked) {
            this.checkIfSignUp();
            if (allComments.length < 1) {
                this.fetchComments();
            }
        }


        if (!this.state.loggedIn) {
            attendingContainer =
                <Paper className="modal-infobox2">
                    <div className="modal-infobox2-element">
                        <h4>Påmelding til {activityName}</h4>
                        <p>Du må være logget inn for å kunne melde deg på dette arrangementet</p>
                    </div>
                </Paper>;
        } else if (this.state.attending == false) {
            attendingContainer =
                <Paper className="modal-infobox2">
                    <div className="modal-infobox2-element">
                        <h4>Påmelding til {activityName}</h4>
                        <Button className="btn btn-success" onClick={this.onSignup}>Meld på!</Button>
                    </div>
                </Paper>;

        } else {
            attendingContainer =
                <Paper className="modal-infobox2">
                    <div className="modal-infobox2-element">
                        <h4>Du er påmeldt {activityName}</h4>
                        <Button onClick={this.onSignOf} className="btn btn-danger">Meld av</Button>
                    </div>
                </Paper>;
        }

        let facebookContainer = null;
        if (facebook && facebookInfo) {
            let fImages = facebook.photos.data.map(image => {
                return {original: image.images[0].source, thumbnail: image.images[0].source}
            });
            images = images.concat(fImages);

            let admins = facebook.admins.data.map(admin => {
                let link = "https://facebook.com/" + admin.id;
                return <a href={link} key={admin.id} target="_blank" title="Åpner Facebooksiden knyttet til denne personen/organisasjonen" className="modal-facebook-admin-link">{admin.name}</a>
            });

            facebookContainer = (
                <div className="modal-facebook-container">
                    <h2 className="modal-facebook-header">Informasjon om arrangementet fra Facebook</h2>
                    <div className="modal-facebook-wrapper">
                        <div className="modal-facebook-info">
                            <div>Ansvarlige for arrangementet:</div>
                            <div>Antall påmeldte:</div>
                            <div>Antall interesserte:</div>
                        </div>
                        <div className="modal-facebook-data">
                            <div>{admins}</div>
                            <div>{facebook.attending_count}</div>
                            <div>{facebook.maybe_count}</div>
                        </div>
                    </div>
                </div>
            );
        }
        if (this.state.show && images.length != 0) {

            carouselContainer =
                <div>
                    <h3 className="modal-image-header">Bilder fra arrangementet</h3>
                    {/*<Carousel carouselImages={images}/>*/}
                    <div id="imageContainer">
                        <ImageGallery
                            items={images}
                            slideInterval={1900}
                            originalClass="pictureClass"
                            showFullscreenButton={false}
                            showPlayButton={false}
                            thumbnailPosition="right"
                        />
                    </div>
                </div>;
        }

        if (this.state.loggedIn) {
            if(this.state.myrating > 0){
                starRating =
                    (rating + this.state.myrating)/(number_of_ratings+1);

                ratingContainer =
                    <span id="ratingFeedback">Takk for din vurdering.</span>;
            }else{
                ratingContainer =
                    <div>
                        <p className="activityRating">Gi din vurdering</p>
                        <StarRatingComponent className="activityRating" name="activityRating" emptyStarColor="#BBB" onStarClick={this.onRateChange.bind(this)}/>;
                    </div>
            }
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

        let assistantsInfo = null;
        if (assistants_text != "") {
            assistantsInfo = (
                <div>
                    Ekstra informasjon om assistentene: {assistants_text}
                </div>
            );
        }

        if (this.state.provider !== "") {
            provider = this.state.provider.aktordatabase.Navn;
        }



        if(description.length > 300){
            if(this.state.fullDescription){
                descriptionContainer =
                    <div>
                        <pre className="modal-description">{description}</pre>
                    </div>
            }
            else{
                let des = description.substring(0,300) + "...";
                descriptionContainer =
                    <div>
                        <pre className="modal-description">{des}</pre> <a onClick={this.fullDes}>Les mer</a>
                    </div>
            }
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
                            <div className="modal-provider-title"><span className="bold-info-text"> Arrangeres av: </span> {provider}
                            </div>
                        </div>
                        <div id="ratingContainer">
                            <StarRatingComponent id="userRating" name="userRating" emptyStarColor="#BBB" value={starRating} editing={false}/>
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <span className="bold-small-info-text"> Type aktivitet: </span>{activityType}
                    </div>
                    <div className="modal-adapted">
                        <span className="bold-small-info-text"> Dette arrangementet er tilpasset for:</span> {adaptions}
                    </div>
                    <div>
                        <span className="bold-small-info-text"> Antall assistenter: </span> {assistants_number}
                        {assistantsInfo}
                    </div>
                    <div className="modal-info-container">
                        <Paper className="modal-infobox1">
                            <div className="modal-infobox1-element"><Glyphicon glyph="glyphicon glyphicon-user"/> <span className="bold-info-text"> Alder: </span> {age}</div>
                            <div className="modal-infobox1-element"><Glyphicon glyph="glyphicon glyphicon-time"/> <span className="bold-info-text"> Tid: </span> {time_start.slice(0, 5)} - {time_end.slice(0, 5)}</div>
                            <div className="modal-infobox1-element">
                                <Glyphicon glyph="glyphicon glyphicon-map-marker"/> <span className="bold-info-text"> Sted:</span> {location}
                            </div>
                            <div className="modal-infobox1-map">
                                <a onClick={this.showMap}>Vis på kart</a>
                            </div>
                        </Paper>
                        {attendingContainer}
                    </div>
                    <div>
                        <h2 className="modal-description-header">Om arrangementet</h2>
                        {descriptionContainer}
                    </div>
                    {videoContainer}
                    {carouselContainer}
                    {facebookContainer}
                    <hr/>
                    <div id="commentAndRating">
                        <h2 className="modal-comments">Kommentarer</h2>
                        {ratingContainer}
                    </div>
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

    componentDidMount() {
        if (isNumeric(this.props.activity.provider)) {
            getProvider(this.props.activity.provider, provider => {
                this.setState({provider});
            })
        }
    }
}

export default ActivityModal;
