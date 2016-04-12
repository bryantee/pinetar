var React = require('react');
var ReactDOM = require('react-dom');

var Scores = React.createClass({
  getInitialState: function() {
    return {
         data : undefined
    };
  },
  componentDidMount: function() {
    var scores = this;
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data) {
        if(scores.isMounted()) {
          scores.setState({
            data: data
          });
        }
      }
    });
  },
  render : function(){
  if(this.state.data.data.games.game[0]){
    var homeTeam = this.state.data.data.games.game[0].home_team_name;

    return(
      <div>
        <p>{homeTeam}</p>
      </div>
    );
  } else{
    return (
      <div>
        <p>Hold tight...loading the latest scores.</p>
      </div>
    );
  }

  }
});

ReactDOM.render(
  <Scores url="app/mlb-scoreboard.json"/>,
  document.getElementById('app')
);
