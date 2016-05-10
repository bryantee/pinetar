/* Pinetar by Eric Stout */

class IntroContent extends React.Component{
  render(){
    return(
      <div className="row">
        <div className="col-8 col-centered text-center">
          <h1>Games for {this.props.date}</h1>
        </div>
      </div>
    );
  }
}

class Postponed extends React.Component{
  render(){
    return(
      <div className="col-6 text-center game-card">
        <div className="game-card--container container">

          <div className="row">
            <div className="sm-col-8 col-8 text-left">
              <h2>
                {this.props.awayTeam}
              </h2>
            </div>
            <div className="sm-col-4 col-4 text-center">
              <h2>
                {this.props.awayScore}
              </h2>
            </div>
          </div>

          <div className="row">
            <div className="sm-col-8 col-8 text-left">
              <h2>
                {this.props.homeTeam}
              </h2>
            </div>
            <div className="sm-col-4 col-4 text-center">
              <h2>
                {this.props.homeScore}
              </h2>
            </div>
          </div>

          <div className="row">
            <div className="col-12 text-left">
              <h4>
                {this.props.status} ({this.props.reason}) {this.props.inningState} {this.props.inning}
              </h4>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

class FinalGame extends React.Component{
  render(){
    return(
      <div className="col-6 text-center game-card">
        <div className="game-card--container container">

          <div className="row">
            <div className="sm-col-8 col-8 text-left">
              <h2>
                {this.props.awayTeam}
              </h2>
            </div>
            <div className="sm-col-4 col-4 text-center">
              <h2>
                {this.props.awayScore}
              </h2>
            </div>
          </div>

          <div className="row">
            <div className="sm-col-8 col-8 text-left">
              <h2>
                {this.props.homeTeam}
              </h2>
            </div>
            <div className="sm-col-4 col-4 text-center">
              <h2>
                {this.props.homeScore}
              </h2>
            </div>
          </div>

          <div className="row">
            <div className="col-12 text-left">
              <h4>
                {this.props.status} {this.props.inningState} {this.props.inning}
              </h4>
            </div>
          </div>

          <div className="row">
            <div className="col-12 text-left game-notes">
              <p>
                <strong>Winning Pitcher:</strong> {this.props.winningPitcher} <br />
                <strong>Losing Pitcher: </strong> {this.props.losingPitcher}
              </p>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

class CurrentGame extends React.Component{
  render(){
    if( this.props.outs > 1 ){
      let outText = 'Outs';
    } else{
      let outText = 'Out';
    }
    return(
      <div className="col-6 text-center game-card">
        <div className="game-card--container container">

          <div className="row">
            <div className="sm-col-8 col-8 text-left">
              <h2>
                {this.props.awayTeam}
              </h2>
            </div>
            <div className="sm-col-4 col-4 text-center">
              <h2>
                {this.props.awayScore}
              </h2>
            </div>
          </div>

          <div className="row">
            <div className="sm-col-8 col-8 text-left">
              <h2>
                {this.props.homeTeam}
              </h2>
            </div>
            <div className="sm-col-4 col-4 text-center">
              <h2>
                {this.props.homeScore}
              </h2>
            </div>
          </div>

          <div className="row">
            <div className="col-12 text-left">
              <h4>
                {this.props.inningState} {this.props.inning} - {this.props.outs} Outs
              </h4>
            </div>
          </div>

          <div className="row">
            <div className="col-12 text-left game-notes">
              <p>
                <strong>Current Pitcher:</strong> {this.props.currentPitcher} <br />
                <strong>Current Batter: </strong> {this.props.currentBatter} ({this.props.batterHits}-{this.props.batterAtBats} Avg: {this.props.batterAVG})
              </p>
            </div>
          </div>

          <div className="row">
            <div className="col-12 text-left game-notes game-pbp">
              <p>
                <strong>Play by Play:</strong> <br />
                {this.props.pbp}
              </p>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

class UpcomingGame extends React.Component{
  render(){
    return(
      <div className="col-6 text-center game-card">
        <div className="game-card--container container">
          <div className="row">
            <div className="sm-col-8 col-8 text-left">
              <h2>
              {this.props.awayTeam} at {this.props.homeTeam}
              </h2>
            </div>
            <div class="sm-col-4 col-4 text-center">
              <h4>
                {this.props.status}
              </h4>
            </div>
          </div>

          <div className="row">
            <div className="col-12 text-left game-notes">
              <p>
                <strong>{this.props.homeAbbrev} Starting Pitcher:</strong> {this.props.homeStartingPitcher} ({this.props.homePitcherERA} ERA - {this.props.homePitcherRecord}) <br />
                <strong>{this.props.awayAbbrev} Starting Pitcher:</strong> {this.props.awayStartingPitcher} ({this.props.awayPitcherERA} ERA - {this.props.awayPitcherRecord})
              </p>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

class GameBox extends React.Component{

  constructor() {
    super();

    this.state = {
      games: [],
      date: ''
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

  _getDate(){
    let     d = new Date(),
        month = d.getMonth()+1,
        day   = d.getDate();

    if( month == 3 ){
      month = 'March';
    } else if ( month == 4 ) {
      month = 'April';
    } else if ( month == 5 ) {
      month = 'May';
    } else if ( month == 6 ) {
      month = 'June'
    } else if ( month == 7 ) {
      month = 'July';
    } else if ( month == 8 ) {
      month = 'August';
    } else if ( month == 9 ) {
      month = 'September';
    } else if ( month == 10 ) {
      month = 'October';
    } else if ( month == 11 ) {
      month = 'November';
    } else{
      console.log('Baseball is over :-( ');
    }

    let today = month + '' + day;

    this.setState({date: today});

    return(
      <IntroContent date={this.state.date} />
    );
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
            awayStartingPitcher = games.away_probable_pitcher.name_display_roster,
            homeAbbrev          = games.home_name_abbrev,
            awayAbbrev          = games.away_name_abbrev,
            homePitcherERA      = games.home_probable_pitcher.era,
            homePitcherRecord   = games.home_probable_pitcher.s_wins + '-' + games.home_probable_pitcher.s_losses,
            awayPitcherERA      = games.away_probable_pitcher.era,
            awayPitcherRecord   = games.away_probable_pitcher.s_wins + '-' + games.away_probable_pitcher.s_losses;

        return(
          <UpcomingGame
            key={games.home_team_id}
            homeTeam={homeTeam}
            homeAbbrev={homeAbbrev}
            awayTeam={awayTeam}
            awayAbbrev={awayAbbrev}
            status={status}
            homeStartingPitcher={homeStartingPitcher}
            homePitcherERA={homePitcherERA}
            homePitcherRecord={homePitcherRecord}
            awayStartingPitcher={awayStartingPitcher}
            awayPitcherERA={awayPitcherERA}
            awayPitcherRecord={awayPitcherRecord}
          />
        );

      } else if ( status == 'Final' || status == 'Game Over') {
        // if the game is final
        let status = 'Final',
            awayScore = games.linescore.r.away,
            homeScore = games.linescore.r.home,
            winningPitcher = games.winning_pitcher.name_display_roster,
            losingPitcher  = games.losing_pitcher.name_display_roster;

        return(
          <FinalGame
            key={games.home_team_id}
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
      } else if ( status == 'Postponed') {
        let reason = games.status.reason;
        if( games.linescore ){
          let   awayScore = games.linescore.r.away,
                homeScore = games.linescore.r.home;
          return(
            <Postponed
              key={games.home_team_id}
              homeTeam={homeTeam}
              awayTeam={awayTeam}
              status={status}
              inningState={inningState}
              inning={inning}
              homeScore={homeScore}
              awayScore={awayScore}
              reason={reason}
            />
          );
        } else{
          return(
            <Postponed
              key={games.home_team_id}
              homeTeam={homeTeam}
              awayTeam={awayTeam}
              status={status}
              inningState={inningState}
              awayTeam={awayTeam}
              status={status}
              inningState={inningState}
              inning={inning}
              reason={reason}
            />
          );
        }

      } else{

        // if the game is current
        let currentPitcher  = games.pitcher.name_display_roster,
            awayScore       = games.linescore.r.away,
            homeScore       = games.linescore.r.home,
            currentBatter   = games.batter.name_display_roster,
            batterAtBats    = games.batter.ab,
            batterHits      = games.batter.h,
            batterAVG       = games.batter.avg,
            pbp             = games.pbp.last,
            outs            = games.status.o;

        return(
          <CurrentGame
            key={games.home_team_id}
            homeTeam={homeTeam}
            awayTeam={awayTeam}
            status={status}
            inningState={inningState}
            inning={inning}
            currentBatter={currentBatter}
            batterAtBats={batterAtBats}
            batterHits={batterHits}
            batterAVG={batterAVG}
            currentPitcher={currentPitcher}
            homeScore={homeScore}
            awayScore={awayScore}
            pbp={pbp}
            outs={outs}
          />
        );
      }

    });
  }

  render() {
    const gameList = this._mapGameScores(),
          introContent = this._getDate();

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
