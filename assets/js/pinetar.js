/* Pinetar by Eric Stout */

class FinalGame extends React.Component{
  render(){
    return(
      <div className="col-4 text-center game-card">
        <div className="game-card--container container">
          <div className="row">
            <div className="sm-col-5 col-5 text-center">
              <h2>
                {this.props.awayTeam}
              </h2>
            </div>
            <div className="sm-col-2 col-2 text-center">
              <h2> vs. </h2>
            </div>
            <div className="sm-col-5 col-5 text-center">
              <h2>
                {this.props.homeTeam}
              </h2>
            </div>
          </div>
          <div className="row">
            <div className="col-12 text-center">
              <h4>
                {this.props.status} {this.props.inningState} {this.props.inning}
              </h4>
            </div>
          </div>
          <div className="row">
            <div className="sm-col-5 col-5 text-center">
              <h2>
                {this.props.awayScore}
              </h2>
            </div>
            <div className="sm-col-5 col-5 text-center">
              <h2>
                {this.props.homeScore}
              </h2>
            </div>
          </div>


        <p>
          Winning Pitcher: {this.props.winningPitcher} <br />
          Losing Pitcher: {this.props.losingPitcher}
        </p>
        </div>
      </div>
    );
  }
}

class CurrentGame extends React.Component{
  render(){
    return(
      <div className="col-4 text-center game-card">
        <div className="game-card--container">
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
      </div>
    );
  }
}

class UpcomingGame extends React.Component{
  render(){
    return(
      <div className="col-4 text-center game-card">
        <div className="game-card--container">
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
            homeScore = games.linescore.r.home,
            awayTeam =  games.away_team_name,
            awayScore = games.linescore.r.away,
            status   = games.status.status,
            inningState =  games.status.inning_state,
            inning   =  games.status.inning;


      // if game is in preview
      if( status == 'Preview' || status == 'Pre-Game'){

        let status = games.home_time + ' ' + games.home_time_zone, // Change the Preview status text to show Start Time
            homeStartingPitcher = games.home_probable_pitcher.name_display_roster,
            awayStartingPitcher = games.away_probable_pitcher.name_display_roster,
            awayScore           = '0',
            homeScore           = '0';

        return(
          <UpcomingGame
            homeTeam={homeTeam}
            awayTeam={awayTeam}
            status={status}
            homeStartingPitcher={homeStartingPitcher}
            awayStartingPitcher={awayStartingPitcher}
            homeScore={homeScore}
            awayScore={awayScore}
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
            homeScore={homeScore}
            awayScore={awayScore}
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
            homeScore={homeScore}
            awayScore={awayScore}
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
