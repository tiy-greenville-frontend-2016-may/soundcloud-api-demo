var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');
var SC = require('soundcloud');

var TrackList = require('./components/list.jsx').TrackList;
var TrackDetail = require('./components/detail.jsx').TrackDetail;


var Router = Backbone.Router.extend({
  routes: {
    '': 'index',
    'tracks/:id/': 'detail'
  },
  initialize: function(){
    SC.initialize({
      client_id: '12d9d542217a07bc72024b031c74f4fc'
    });
  },
  index: function(){
    ReactDOM.render(
      React.createElement(TrackList),
      document.getElementById('app')
    );
  },
  detail: function(id){
    ReactDOM.render(
      React.createElement(TrackDetail, {id: id}),
      document.getElementById('app')
    );
  }

});

var router = new Router();
