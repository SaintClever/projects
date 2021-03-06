Package.describe({
  name: 'saintclever:errors',
  version: '1.1.0',
  // Brief, one-line summary of the package.
  summary: 'A pattern to display application errors to the user',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/SaintClever/projects/tree/master/microscope/lib/packages/errors',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');
  api.use(['minimongo', 'mongo-livedata', 'templating'], 'client');
  api.addFiles(['errors.js', 'errors_list.html', 'errors_list.js'], 'client');

  if (api.export)
    api.export('Errors');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('saintclever:errors');
  api.addFiles('errors-tests.js');
});

/* This is from Discover Meteor, however this is not needed because new versions of Meteor generates a tinytest Package.onTest

Package.onTest(function(api) {
  api.use('saintclever:errors', 'client');
  api.use(['tinytest', 'test-helpers'], 'client');

  api.addFiles('errors_tests.js', 'client');
});
*/
