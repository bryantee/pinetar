/* Pinetar by Eric Stout */
class SingleGame extends React.Component{
  render(){
    return(
      <div>
        <h2>
        {this.props.homeTeam} vs. {this.props.awayTeam}
        </h2>
        <h4>
          {this.props.status} | {this.props.inningState} {this.props.inning}
        </h4>
      </div>
    );
  }
}

class GameBox extends React.Component{

  constructor() {
    super();

    this.state = {
      games: []
    };
  }

  componentWillMount() {
    this._getGameScores();
  }

  componentDidMount() {
    this._timer = setInterval(() => this._getGameScores(), 45000);
  }

  componentWillUnmount() {
    clearInterval(this._timer);
  }

  _getGameScores(){
    jQuery.ajax({
      method: 'GET',
      url: 'http://pinetar-app.com/src/client/app/mlb-scoreboard.json',
      success: function(games){
        this.setState({games: games.data.games.game});
      }.bind(this)
    });
  }

  _mapGameScores(){
    const games = this.state.games;

    return games.map((games) => {
        let homeTeam =  games.home_team_name,
            awayTeam =  games.away_team_name,
            status   = games.status.status,
            inningState =  games.status.inning_state,
            inning   =  games.status.inning;

      // if game is in preview
      if( status == 'Preview'){
        status = games.home_time + '' + games.home_time_zone;
      }

      return(
        <SingleGame
          homeTeam={homeTeam}
          awayTeam={awayTeam}
          status={status}
          inningState={inningState}
          inning={inning}
        />
      );
    });
  }

  render() {
    const gameList = this._mapGameScores();
    return(
      <div>
      {gameList}
      </div>
    );
  }
}

ReactDOM.render(
  <GameBox />, document.getElementById('pinetar')
);
