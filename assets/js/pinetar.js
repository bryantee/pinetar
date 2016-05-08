/* Pinetar by Eric Stout */
class SingleGame extends React.Component{
  render(){
    if( this.props.status == 'In Progress' || this.props.status == 'Final'){
      return(
        <div style="display: inline-block; width: 50%; float: left; margin: 10px;">
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
    } else{
      return(
        <div style="display: inline-block; width: 50%; float: left; margin: 10px;">
          <h2>
          {this.props.homeTeam} vs. {this.props.awayTeam}
          </h2>
          <h4>
            {this.props.status} | {this.props.inningState} {this.props.inning}
          </h4>
          <p>Starting Pitcher: {this.props.homeStartingPitcher} <br />
            Starting Pitcher: {this.props.awayStartingPitcher}
          </p>

        </div>
      );
    }

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
            inningState = '',
            inning = '',
            homeStartingPitcher = games.home_probable_pitcher.name_display_roster,
            awayStartingPitcher = games.away_probable_pitcher.name_display_roster;

        return(
          <SingleGame
            homeTeam={homeTeam}
            awayTeam={awayTeam}
            status={status}
            inningState={inningState}
            inning={inning}
            homeStartingPitcher={homeStartingPitcher}
            awayStartingPitcher={awayStartingPitcher}
          />
        );

      } else{

        // if the game is current or final
        let currentPitcher  = games.pitcher.name_display_roster,
            currentBatter   =  games.batter.name_display_roster;

        return(
          <SingleGame
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
      <div>
      {gameList}
      </div>
    );
  }
}

ReactDOM.render(
  <GameBox />, document.getElementById('pinetar')
);
