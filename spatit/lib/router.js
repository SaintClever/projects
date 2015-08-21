Router.configure({
  layoutTemplate: "layout"
});



Router.map(function(){


  // Home
  this.route('home', {
    path: '/',
    template: 'home',
    data: function(){
      templateData = {
        products: Products.find({is_featured: "1"})
      };
      return templateData;
    }
  });


  // Products
  this.route('products', {
    path: '/products',
    template: 'products',
    data: function(){
      templateData = {
        products: Products.find()
      };
      return templateData;
    }
  });


  // Add Product
  this.route('add_product', {
    path: '/add_product',
    template: 'add_product',
    data: function(){
      templateData = {
        categories: Categories.find()
      };
      return templateData;
    }
  });


});

