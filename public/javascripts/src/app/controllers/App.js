define([
  'Palace',
  'Search',
  'Socket',
  'Repo',
  'Headline',
  'Results'
], function(Palace, Search) {
  return function(){
    Palace.register('Headline', startController('Headline'));
    Palace.register('Search', startController('Search', Search));
    Palace.register('Results', startController('Results'));
    // register('Headline', spawn('Palace', 'startController', ['Headline']));
  }
});
