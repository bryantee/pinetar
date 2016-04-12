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
      success: function(mlbData) {
        if(scores.isMounted()) {
          scores.setState({
            data: mlbData
          });
        }
      }
    });
  },
  render : function(){
    return (
      <div>
        <p>Hold tight...loading the latest scores.</p>
      </div>
    );
  }
});

ReactDOM.render(
  <Scores url="app/mlb-scoreboard.json"/>,
  document.getElementById('app')
);
