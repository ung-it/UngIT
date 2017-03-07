/**
 * Created by ingrskar on 3/6/2017.
 */
import React from "react"
import { connect } from "react-redux"

import { fetchActivities } from "../actions/activitiesActions"

@connect((store) => {
  return {
      title: store.activity.title,
      provider: store.activity.provider,
      adaptions: store.activity.adaptions,
      age: store.activity.age,
      location: ,
      description: data.description,
      price: data.price,
      date: new Date(data.date),
      timeStart: data.time_start.substring(0,data.time_start.lastIndexOf(":")),
      timeEnd: data.time_end.substring(0,data.time_end.lastIndexOf(":")),
      images: data.images.split(","),
      videos: data.videos.split(",")
  };
})
export default class Layout extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchActivities)
  }


  render() {
    const { user, tweets } = this.props;

    if (!tweets.length) {
      return <button onClick={this.fetchTweets.bind(this)}>load tweets</button>
    }

    const mappedTweets = tweets.map(tweet => <li>{tweet.text}</li>)

    return <div>
      <h1>{user.name}</h1>
      <ul>{mappedTweets}</ul>
    </div>
  }
}
