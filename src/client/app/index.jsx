var ReactDOM = require('react-dom');

var MLBScores = React.createClass({
  getInitialState: function() {
    return {
      hometeam: '',
      homescore: '',
      awayteam: '',
      awayscore: ''
    };
  },

  componentDidMount: function() {

    this.serverRequest = $.get(this.props.feed, function(result) {

    var scoreFeed = JSON.parse(result).data;

    if( scoreFeed.games.game[0].linescore ){
    	var homeScore = scoreFeed.games.game[0].linescore.r.home;
      var awayScore = scoreFeed.games.game[0].linescore.r.away;
    }

      this.setState({
        hometeam: scoreFeed.games.game[0].home_team_name,
        homescore: homeScore,
        awayteam: scoreFeed.games.game[0].away_team_name,
        awayscore: awayScore
      });

    }.bind(this));
  },

  componentWillUnmount: function() {
    this.serverRequest.abort();
  },

  render: function() {
    return ( < div >
    {this.state.hometeam}{this.state.homescore} vs. { this.state.awayteam}{this.state.awayscore} < /div>
    );
  }
});

ReactDOM.render( < MLBScores feed= "http://198.199.92.64/src/client/app/mlb-scoreboard.json" / > ,
  document.getElementById('app')
);
