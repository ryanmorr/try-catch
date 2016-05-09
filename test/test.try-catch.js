describe('try-catch', function(){
    'use strict';

    var expect = chai.expect;

    it('should call the catch function with the error if the try function throws an error', function(done) {
        // Use async code so that we can test before the browser
        // halts execution because of the error
        setTimeout(function() {
            var tryFn = sinon.spy(function() {
                (0)();
            });
            var catchFn = sinon.spy(function(error) {
                expect(tryFn.calledOnce).to.equal(true);
                expect(tryFn.threw('TypeError')).to.equal(true);
                expect(catchFn.calledOnce).to.equal(true);
                expect(error).to.be.an('error');
                done();
            });
            tryCatch(tryFn, catchFn);
        }, 100);
    });

    it('should use window.onerror to handler the error', function(done) {
        setTimeout(function() {
            var prev = window.onerror;
            var spy;
            var tryFn = sinon.spy(function() {
                spy = sinon.spy(window, 'onerror');
                (0)();
            });
            var catchFn = sinon.spy(function() {
                expect(spy.calledOnce).to.equal(true);
                expect(window.onerror).to.equal(prev);
                spy.restore();
                done();
            });
            tryCatch(tryFn, catchFn);
        }, 100);
    });

    it('should be able to suppress errors by default', function(done) {
        setTimeout(function() {
            var spy;
            var tryFn = sinon.spy(function() {
                spy = sinon.spy(window, 'onerror');
                (0)();
            });
            var catchFn = sinon.spy(function() {
                setTimeout(function() {
                    expect(spy.returnValues[0]).to.equal(true);
                    spy.restore();
                    done();
                }, 100);
            });
            tryCatch(tryFn, catchFn);
        }, 100);
    });

    it('should be able to allow errors to propagate to the browser', function(done) {
        setTimeout(function() {
            var spy;
            var tryFn = sinon.spy(function() {
                spy = sinon.spy(window, 'onerror');
                (0)();
            });
            var catchFn = sinon.spy(function() {
                setTimeout(function() {
                    expect(spy.returnValues[0]).to.equal(false);
                    spy.restore();
                    done();
                }, 100);
                return false;
            });
            tryCatch(tryFn, catchFn);
        }, 100);
    });

});