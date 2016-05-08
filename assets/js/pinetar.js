/* Pinetar by Eric Stout */

class FinalGame extends React.Component{
  render(){
    return(
      <div className="col-4 text-center">
        <h2>
        {this.props.homeTeam} vs. {this.props.awayTeam}
        </h2>
        <h4>
          {this.props.status} | {this.props.inningState} {this.props.inning}
        </h4>
        <p>
          Winning Pitcher: {this.props.winningPitcher} <br />
          Losing Pitcher: {this.props.losingPitcher}
        </p>
      </div>
    );
  }
}

class CurrentGame extends React.Component{
  render(){
    return(
      <div className="col-4 text-center">
        <h2>
        {this.props.homeTeam} vs. {this.props.awayTeam}
        </h2>
        <h4>
          {this.props.status} | {this.props.inningState} {this.props.inning}
        </h4>
        <p>Current Batter: {this.props.currentBatter} <br />
          Current Pitcher: {this.props.currentPitcher}
        </p>
      </div>
    );
  }
}

class UpcomingGame extends React.Component{
  render(){
    return(
      <div className="col-4 text-center">
        <h2>
        {this.props.homeTeam} vs. {this.props.awayTeam}
        </h2>
        <h4>
          {this.props.status}
        </h4>
        <p>
          Starting Pitcher: {this.props.homeStartingPitcher} <br />
          Starting Pitcher: {this.props.awayStartingPitcher}
        </p>
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
      if( status == 'Preview' || status == 'Pre-Game'){

        let status = games.home_time + ' ' + games.home_time_zone, // Change the Preview status text to show Start Time
            homeStartingPitcher = games.home_probable_pitcher.name_display_roster,
            awayStartingPitcher = games.away_probable_pitcher.name_display_roster;

        return(
          <UpcomingGame
            homeTeam={homeTeam}
            awayTeam={awayTeam}
            status={status}
            homeStartingPitcher={homeStartingPitcher}
            awayStartingPitcher={awayStartingPitcher}
          />
        );

      } else if ( status == 'Final' || status == 'Game Over') {
        // if the game is final
        let status = 'Final',
            winningPitcher = games.winning_pitcher.name_display_roster,
            losingPitcher  = games.losing_pitcher.name_display_roster;

        return(
          <FinalGame
            homeTeam={homeTeam}
            awayTeam={awayTeam}
            status={status}
            inningState={inningState}
            inning={inning}
            winningPitcher={winningPitcher}
            losingPitcher={losingPitcher}
          />
        );
      } else{

        // if the game is current
        let currentPitcher  = games.pitcher.name_display_roster,
            currentBatter   =  games.batter.name_display_roster;

        return(
          <CurrentGame
            homeTeam={homeTeam}
            awayTeam={awayTeam}
            status={status}
            inningState={inningState}
            inning={inning}
            currentBatter={currentBatter}
            currentPitcher={currentPitcher}
          />
        );
      }

    });
  }

  render() {
    const gameList = this._mapGameScores();
    return(
      <div className="row">
        {gameList}
      </div>
    );
  }
}

ReactDOM.render(
  <GameBox />, document.getElementById('pinetar')
);
