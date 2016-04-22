var ReactDOM = require('react-dom');

var scoreBox = React.createClass({
  render: function(){
    var gameDetails = this.props.scoreFeed.map(function(game){
      return <div className="game-detail">{game.home_team_name}</div>
    });
    return <div><h2>Game</h2>{gameDetails}</div>;
  }
});

var MLBScores = React.createClass({
  updateUI(props){
    this.serverRequest = $.get(props.feed, function(result){
      var scoreFeed = result.data.games;
    })
  },

  componentDidMount: function(){
    this.updateUI(this.props);
  },

  componentWillReceiveProps: function(newProps){
    this.updateUI(newProps);
  },

  componentWillUnmount: function(){
    this.serverRequest.abort();
    console.log('Aborted.');
  },

  render: function() {
    return (
      <scoreBox />
    );
  }
});

function render(){
  ReactDOM.render( < MLBScores feed= "http://198.199.92.64/src/client/app/mlb-scoreboard.json" / > ,
    document.getElementById('app')
  );
}

setInterval(function(){
  console.log('Scores were rendered.')
  render();
}, 30000);
render();
