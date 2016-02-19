require("dotenv").load();

var mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || "mongodb://localhost/test",
  expect = require("chai").expect,
  mongoose = require("mongoose"),
  clearDB = require("mocha-mongoose")(mongoUri, {noClear: true});

var ServiceController = require(process.cwd()+"/app/controllers/serviceController.js");

describe("serviceController", function() {

    var serviceController;

    before(function(done) {
      var connection = mongoose.connect(mongoUri);
      serviceController = new ServiceController();
      mongoose.connection.on("connected", function() {
        console.log("test connection successful");
        done();
      });
    });

    before(function(done) {
      clearDB(done);
    })

    describe("#shortenUrl", function() {

        it("should return null when null URL is added", function(done) {
            var url = null;
            serviceController.shortenUrl(url, function(shortenedUrl) {
                expect(shortenedUrl).to.equal(null);
                done();
            });
        })

        it("should return null when blank URL is added", function(done) {
            var url = "";
            serviceController.shortenUrl(url, function(shortenedUrl) {
                expect(shortenedUrl).to.equal(null);
                done();
            });
        })

        it("should return null when invalid URL is added", function(done) {
            var url = "this is not a url";
            serviceController.shortenUrl(url, function(shortenedUrl) {
                expect(shortenedUrl).to.equal(null);
                done();
            });
        })

        it("should not return null when valid URL is added", function(done) {
            var url = "http://www.google.com";
            serviceController.shortenUrl(url, function(shortenedUrl) {
                expect(shortenedUrl.extension).to.be.a("string");
                done();
            });
        })

        it("should have different extensions if multiple URLs entered", function(done) {
            var url1 = "http://www.testurl1.com";
            var url2 = "http://www.testurl2.com";

            serviceController.shortenUrl(url1, function(shortenedUrl1) {
                expect(shortenedUrl1.extension).to.be.a("string");
                serviceController.shortenUrl(url2, function(shortenedUrl2) {
                    expect(shortenedUrl2.extension).to.be.a("string");
                    expect(shortenedUrl2.extension).not.to.be.equal(shortenedUrl1.extension);
                    done();
                });
            });
        })

        it("should return same url extension of same url added", function(done) {
            var url = "https://www.testurl.com";
            serviceController.shortenUrl(url, function(newUrl1) {
                serviceController.shortenUrl(url, function(newUrl2) {
                    expect(newUrl1.extension).to.equal(newUrl2.extension);
                    done();
                });
            });
        })
    });


    describe("#getUrl", function() {

        it("should return null when invalid url extension is entered", function(done) {
            var extension = "invalid entry";
            serviceController.getUrl(extension, function(url) {
                expect(url).to.equal(null);
                done();
            });
        })

        it("should return url extension for new added url", function(done) {
            var url = "https://www.google.com";
            serviceController.shortenUrl(url, function(newUrl) {
                serviceController.getUrl(newUrl.extension, function(returnedUrl) {
                    expect(returnedUrl.url).to.equal(url);
                    done();
                });
            });
        })
    });

    after(function(done) {
        mongoose.modelSchemas = {};
        mongoose.models = {};
        mongoose.connection.close();
        mongoose.disconnect()
        mongoose.connection.on('disconnected', function() {
            console.log("done disconnecting");
            done();
        });
    });
});
