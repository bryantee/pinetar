/* Pinetar by Eric Stout */


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
    return( <div>Hello World</div> );
  }
}

ReactDOM.render(
  <GameBox />, document.getElementById('pinetar')
);
