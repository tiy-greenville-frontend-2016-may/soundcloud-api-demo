var React = require('react');
var SC = require('soundcloud');


var TrackList = React.createClass({

  getInitialState() {
    return {
      search: "",
      results: []
    };
  },

  handleChange(event) {
    this.setState({search: event.target.value});
  },

  handleSubmit(event) {
    event.preventDefault();

    var self = this;

    SC.get('/tracks', {
      limit: 10,
      q: this.state.search,
      order: 'hotness'
    }).then(function(tracks){
      self.setState({results: tracks});
    });
  },

  render() {
    return (
      <div>
        <h1>Search</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="search"
            value={this.state.search}
            onChange={this.handleChange}
          />
        </form>

        <ul>
          {this.state.results.map(function(result){
            return (
              <li key={result.id}>
                <a href={'#tracks/' + result.id + '/'}>
                  {result.title}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
});

module.exports = {
  'TrackList': TrackList
}
