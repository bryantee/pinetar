/* Pinetar by Eric Stout */
class SingleGame extends React.Component{
  render(){
    return(
      <div>{this.props.homeTeam} vs. {this.props.awayTeam}</div>
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
      return(
        <SingleGame homeTeam={games.home_team_name} awayTeam={games.away_team_name} />
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
