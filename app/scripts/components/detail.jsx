var React = require('react');
var SC = require('soundcloud');


var TrackDetail = React.createClass({
  getInitialState() {
    return {
      track: {},
    };
  },

  componentWillMount() {
    this.fetchTrack();
  },

  fetchTrack() {
    var self = this;

    SC.get('/tracks/' + this.props.id).then(function(track){
      self.setState({ track: track });

      SC.oEmbed(track.uri, { auto_play: true }).then(function(oEmbed) {
        console.log('oEmbed response: ', oEmbed);
        self.setState({embed: {__html: oEmbed.html}});
      });

      // SC.stream('/tracks/' + this.props.id).then(function(stream){
      //   console.log(stream);
      //   self.setState({ stream: stream });
      // });
    });
  },

  togglePlaying() {
    this.state.stream && this.state.stream.toggle();
    this.forceUpdate();
  },

  render() {
    return (
      <div>
        <h1>{this.state.track.title}</h1>
        {/*<button onClick={this.togglePlaying}>
          {this.state.stream && this.state.stream.isPlaying() ? "Pause" : "Play"}
        </button>*/}

        <div dangerouslySetInnerHTML={this.state.embed} />
      </div>
    );
  }
});

module.exports = {
  'TrackDetail': TrackDetail
}
