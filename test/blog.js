// Generated by CoffeeScript 1.4.0
(function() {
  var blog, helper;

  require('should');

  helper = (require('../modules/helper'))();

  blog = (require(__dirname + '/init')).blog;

  describe('Blog', function() {
    describe('findPost', function() {
      var expected, _id;
      expected = 'test post';
      _id = '';
      beforeEach(function(done) {
        var promise,
          _this = this;
        promise = blog.create({
          title: expected,
          author: 'Mehfuz Hossain',
          body: 'Empty body'
        });
        return promise.then(function(result) {
          _id = result._id;
          return done();
        });
      });
      it('should return expected for permaLink', function(done) {
        var promise;
        promise = blog.findPost(helper.linkify('test post'));
        return promise.then(function(data) {
          data.post.title.should.equal(expected);
          console.log(data);
          return done();
        });
      });
      return afterEach(function(done) {
        return blog.deletePost(_id, function() {
          return done();
        });
      });
    });
    return describe('update post', function() {
      var expected, id;
      id = '';
      expected = 'test post';
      beforeEach(function(done) {
        var promise,
          _this = this;
        promise = blog.create({
          title: expected,
          author: 'Mehfuz Hossain',
          body: 'Empty body',
          permaLink: '1900/01/test'
        });
        return promise.then(function(result) {
          id = result._id;
          return done();
        });
      });
      it('should not update permaLink when title is same', function(done) {
        var body, promise,
          _this = this;
        body = 'updated';
        promise = blog.updatePost({
          id: id,
          title: expected,
          body: body
        });
        return promise.then(function(result) {
          result.permaLink.should.equal('1900/01/test');
          result.body.should.equal(body);
          return done();
        });
      });
      it('should update the permalink when title is different', function(done) {
        var promise,
          _this = this;
        promise = blog.updatePost({
          id: id,
          title: 'updated post',
          body: 'nothing'
        });
        return promise.then(function(result) {
          result.permaLink.should.equal(helper.linkify('updated post'));
          return done();
        });
      });
      return afterEach(function(done) {
        return blog.deletePost(id, function() {
          return done();
        });
      });
    });
  });

}).call(this);
