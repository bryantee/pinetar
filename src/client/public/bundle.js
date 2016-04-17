/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!**********************************!*\
  !*** ./src/client/app/index.jsx ***!
  \**********************************/
/***/ function(module, exports) {

	'use strict';
	
	var MLBScores = React.createClass({
	  displayName: 'MLBScores',
	
	  getInitialState: function getInitialState() {
	    return {
	      hometeam: '',
	      homescore: '',
	      awayteam: '',
	      awayscore: ''
	    };
	  },
	
	  componentDidMount: function componentDidMount() {
	
	    this.serverRequest = $.get(this.props.feed, function (result) {
	
	      var scoreFeed = JSON.parse(result).data;
	
	      if (scoreFeed.games.game[0].linescore) {
	        var homeScore = scoreFeed.games.game[0].linescore.r.home;
	        var awayScore = scoreFeed.games.game[0].linescore.r.away;
	      }
	
	      this.setState({
	        hometeam: scoreFeed.games.game[0].home_team_name,
	        homescore: homeScore,
	        awayteam: scoreFeed.games.game[0].away_team_name,
	        awayscore: awayScore
	      });
	    }.bind(this));
	  },
	
	  componentWillUnmount: function componentWillUnmount() {
	    this.serverRequest.abort();
	  },
	
	  render: function render() {
	    return React.createElement(
	      'div',
	      null,
	      this.state.hometeam,
	      this.state.homescore,
	      ' vs. ',
	      this.state.awayteam,
	      this.state.awayscore,
	      ' '
	    );
	  }
	});
	
	ReactDOM.render(React.createElement(MLBScores, { feed: 'http://198.199.92.64/src/client/app/mlb-scoreboard.json' }), document.getElementById('app'));

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map