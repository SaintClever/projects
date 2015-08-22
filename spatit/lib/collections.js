// Categories
Categories = new Mongo.Collection("categories");

// Products
Products = new Mongo.Collection("products");

// Product Image
ProductsImages = new FS.Collection("ProductsImages", {
  stores: [new FS.Store.GridFS("ProductsImages")]
});

// This allows inserts and downloads of the images
ProductsImages.allow({
  insert: function(fileId, doc){
    return true;
  },
  download: function(fileId, doc){
    return true;
  }
});