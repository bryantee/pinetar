/* Pinetar by Eric Stout */
class SingleGame extends React.Component{
  render(){
    return(
      <div>{this.props.homeTeam}</div>
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
      success: (games) => {
        this.setState({games})
      }
    });
  }


  render() {
    return {this.state.games.map((games) => {
      return(
        <SingleGame homeTeam={game.game.home_team_name} />
      );
    });
  }
}

ReactDOM.render(
  <GameBox />, document.getElementById('pinetar')
);
