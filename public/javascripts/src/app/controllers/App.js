var App = function(){
	var Palace = require('Palace');
	Palace.expose();

	register('Headline', startController('Headline'));
  register('Search', startController('Search'));
	// register('Headline', spawn('Palace', 'startController', ['Headline']));
};
