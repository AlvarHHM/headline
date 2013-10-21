var App = function(){
	var Palace = require('Palace');
	Palace.expose();

	register('Headline', startController('Headline'));
	// register('Headline', spawn('Palace', 'startController', ['Headline']));
};
