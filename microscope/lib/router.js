// Everytemplate gets displayed in the layout
Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound', // Displays a 404
  waitOn: function() {
    return [Meteor.subscribe('notifications')];
  }
});

// OUR pagination logic is hanlde within our route...PostsListController

// Iron Router's: Route Controllers
PostsListController = RouteController.extend({
  template: 'postsList',
  increment: 5,
  postsLimit: function() {
    return parseInt(this.params.postsLimit) || this.increment;
  },
  findOptions: function() {
    return {sort: this.sort, limit: this.postsLimit()};
  },
  subscriptions: function() {
    this.postsSub = Meteor.subscribe('posts', this.findOptions());
  },
  posts: function() {
    return Posts.find({}, this.findOptions());
  },
  data: function() {
    var hasMore = this.posts().count() === this.postsLimit();
    var nextPath = this.route.path({postsLimit: this.postsLimit() + this.increment});
    return {
      posts: this.posts(),
      ready: this.postsSub.ready,
      nextPath: hasMore ? this.nextPath() : null
    };
  }
});

NewPostsController = PostsListController.extend({
  sort: {submitted: -1, _id: -1},
  nextPath: function() {
    return Router.routes.newPosts.path({postsLimit: this.postsLimit() + this.increment})
  }
});

BestPostsController = PostsListController.extend({
  sort: {votes: -1, submitted: -1, _id: -1},
  nextPath: function() {
    return Router.routes.bestPosts.path({postsLimit: this.postsLimit() + this.increment})
  }
});

+Router.route('/', {
  name: 'home',
  controller: NewPostsController
});

Router.route('/new/:postsLimit?', {name: 'newPosts'});

Router.route('/best/:postsLimit?', {name: 'bestPosts'});

// This is used to display the entire list, hence postsList
// postsList route (which will inherit from the PostsListController controller) takes a postsLimit parameter
// Router.route('/:postsLimit?', {
//   name: 'postsList'
// });

// This is for an idiviual ids or URL paths, hence /posts/:_id
Router.route('/posts/:_id', {
  name: 'postPage',
  waitOn: function() {
    return [
    Meteor.subscribe('singlePost', this.params._id),
    Meteor.subscribe('comments', this.params._id)
    ];
  },
  data: function() { return Posts.findOne(this.params._id); }
});

Router.route('/posts/:_id/edit', {
  name: 'postEdit',
  waitOn: function() {
    return Meteor.subscribe('singlePost', this.params._id);
  },
  data: function() { return Posts.findOne(this.params._id); }
});

Router.route('/submit', {name: 'postSubmit'});

var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) { 
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
}

/*
This tells Iron Router to show the “not found” page not just for invalid routes but also for the postPage route, whenever the data function returns a “falsy” (i.e. null, false, undefined, or empty) object.
*/
Router.onBeforeAction('dataNotFound', {only: 'postPage'});
Router.onBeforeAction(requireLogin, {only: 'postSubmit'});

/*** NOTES ***/
/*
The special :_id syntax tells the router two things: first, to match any route of the form /posts/xyz/, where “xyz” can be anything at all. Second, to put whatever it finds in this “xyz” spot inside an _id property in the router's params array.
*/

/*
Within the data function for a route, this corresponds to the currently matched route, and we can use this.params to access the named parts of the route (which we indicated by prefixing them with : inside our path).
*/


/* Sessions */
// Sessions are reactive data sources
// Session.set(); <- Set data (similar to personal RAM)
// Session.get(); <- Read data (similar to personal RAM)
/* 
Sessions store some ephemeral state that is only relevant to the current user's version of the application (for example, whether an element is shown or hidden).
*/