var ReactDOM = require('react-dom');

var MLBScores = React.createClass({
  getInitialState: function() {
    return {
      hometeam: '',
      homescore: '',
      awayteam: '',
      awayscore: '',
      status: 'Pre-game',
      inning: '1',
      inningState: 'Top'
    };
  },

  componentWillReceiveProps: function() {

    this.serverRequest = $.get(this.props.feed, function(result) {

    var scoreFeed = result.data,
        status  = scoreFeed.games.game[4].status.status,
        inning  = scoreFeed.games.game[4].status.inning,
        inningState  = scoreFeed.games.game[4].status.inning_state;

    if( scoreFeed.games.game[4].linescore ){
      var homeScore = scoreFeed.games.game[4].linescore.r.home;
      var awayScore = scoreFeed.games.game[4].linescore.r.away;
    }

      this.setState({
        hometeam: scoreFeed.games.game[4].home_team_name,
        homescore: homeScore,
        awayteam: scoreFeed.games.game[4].away_team_name,
        awayscore: awayScore,
        status: status,
        inning: inning,
        inningState: inningState
      });

    }.bind(this));
  },

  componentDidMount: function() {

    this.serverRequest = $.get(this.props.feed, function(result) {

    var scoreFeed = result.data,
        status  = scoreFeed.games.game[4].status.status,
        inning  = scoreFeed.games.game[4].status.inning,
        inningState  = scoreFeed.games.game[4].status.inning_state;

    if( scoreFeed.games.game[4].linescore ){
    	var homeScore = scoreFeed.games.game[4].linescore.r.home;
      var awayScore = scoreFeed.games.game[4].linescore.r.away;
    }

      this.setState({
        hometeam: scoreFeed.games.game[4].home_team_name,
        homescore: homeScore,
        awayteam: scoreFeed.games.game[4].away_team_name,
        awayscore: awayScore,
        status: status,
        inning: inning,
        inningState: inningState
      });

    }.bind(this));
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
