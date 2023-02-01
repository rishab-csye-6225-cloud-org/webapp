const supertest = require('supertest')
const app = require('./app.js');


describe('Testing the Application', function() {
    it('GET request /healthz of the application', (done) => {
        supertest(app)
            .get('/healthz')
            .expect(200)
            .end((err, response) => {
                if (err) return done(err)
                return done()
            })
    })
    it('GET request - 404 API endpoint', (done) => {
        supertest(app)
            .get('/notfound')
            .expect(404)
            .end((err, res) => {
                if (err) return done(err)
                return done()
            })
    })
})