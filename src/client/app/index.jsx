var ReactDOM = require('react-dom');

var MLBScores = React.createClass({
  updateUI(props){

      this.serverRequest = $.get(props.feed, function(result) {

    var scoreFeed = result.data;

    var scorebox = this.props.scoreFeed.map(function(game){
      return <div className="scorebox">{game.home_team_name}</div>;
    });



      this.setState({
        hometeam: scoreFeed.games.game[7].home_team_name,
        homescore: homeScore,
        awayteam: scoreFeed.games.game[7].away_team_name,
        awayscore: awayScore,
        status: status,
        inning: inning,
        inningState: inningState
      });

    }.bind(this));

  },


  componentDidMount: function() {
     this.updateUI(this.props);

  },

  componentWillReceiveProps : function(newProps){
     this.updateUI(newProps);
  },

  componentWillUnmount: function() {
    this.serverRequest.abort();
  },

  render: function() {
    return (
      <div>
        {this.state.hometeam} {this.state.homescore} vs. { this.state.awayteam} {this.state.awayscore}
        <hr />
        {this.state.status} {this.state.inningState} {this.state.inning}
      </div>
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
}, 60000);
render();
