const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../../../../app');

const expect = chai.expect;
chai.use(chaiHttp);

describe('userRoute', () => {
    describe('/GET users', () => {
        it('it should GET all the users', (done) => {
            chai.request(app)
                .get('/users')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    done();
                });
        });
    });

    describe('/GET user by id', () => {
        it('it should GET user by id', (done) => {
            chai.request(app)
                .get('/users/2')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.id).to.equal(2);
                    done();
                });
        });
    });

    describe('/POST user', () => {
        it('it should CREATE user if data is correct', (done) => {
            const user = {
                username: 'someUsername',
                password: 'somePassword',
            };
            chai.request(app)
                .post('/users')
                .send(user)
                .end((err, res) => {
                    if (err) {
                        return;
                    }
                    expect(res).to.have.status(201);
                    expect(res.body.status).to.equal('signed up');
                    expect(res.body.auth).to.equal(true);
                    expect(res.body.token).to.be.an('string');
                    done();
                });
        });
        it('it should NOT CREATE user if username is empty', (done) => {
            const user = {
                username: '',
                password: 'somePassword',
            };
            chai.request(app)
                .post('/users')
                .send(user)
                .end((err, res) => {
                    if (err) {
                        return;
                    }
                    expect(res).to.have.status(406);
                    expect(res.body.status).to.be.undefined;
                    expect(res.body.auth).to.be.undefined;
                    expect(res.body.token).to.be.undefined;
                    done();
                });
        });

        it('it should NOT CREATE user if password is empty', (done) => {
            const user = {
                username: 'userName1',
                password: '',
            };
            chai.request(app)
                .post('/users')
                .send(user)
                .end((err, res) => {
                    if (err) {
                        return;
                    }
                    expect(res).to.have.status(406);
                    expect(res.body.status).to.be.undefined;
                    expect(res.body.auth).to.be.undefined;
                    expect(res.body.token).to.be.undefined;
                    done();
                });
        });

        it('it should NOT CREATE user if username is not valid', (done) => {
            const user = {
                username: 'userNam|/?1',
                password: 'password123',
            };
            chai.request(app)
                .post('/users')
                .send(user)
                .end((err, res) => {
                    if (err) {
                        return;
                    }
                    expect(res).to.have.status(406);
                    expect(res.body.status).to.be.undefined;
                    expect(res.body.auth).to.be.undefined;
                    expect(res.body.token).to.be.undefined;
                    done();
                });
        });

        it('it should NOT CREATE user if password is not valid', (done) => {
            const user = {
                username: 'userName123',
                password: 'password+-/123',
            };
            chai.request(app)
                .post('/users')
                .send(user)
                .end((err, res) => {
                    if (err) {
                        return;
                    }
                    expect(res).to.have.status(406);
                    expect(res.body.status).to.be.undefined;
                    expect(res.body.auth).to.be.undefined;
                    expect(res.body.token).to.be.undefined;
                    done();
                });
        });

        it('it should LOGIN user if username and password are correct', (done) => {
            const user = {
                username: 'tovmassian',
                password: '654321',
            };
            chai.request(app)
                .post('/signin')
                .send(user)
                .end((err, res) => {
                    if (err) {
                        return;
                    }
                    expect(res).to.have.status(200);
                    expect(res.body.status).to.equal('signed in');
                    expect(res.body.auth).to.equal(true);
                    expect(res.body.token).to.be.an('string');
                    expect(res.body.user.username).to.equal(user.username);
                    expect(res.body.user.password).to.be.an('string');
                    done();
                });
        });
        it('it should NOT LOGIN user if username and password are correct', (done) => {
            const user = {
                username: 'tovmassian',
                password: '1654321',
            };
            chai.request(app)
                .post('/signin')
                .send(user)
                .end((err, res) => {
                    if (err) {
                        return;
                    }
                    console.log(res.text);
                    expect(res).to.have.status(401);
                    expect(res.text).to.equal('Your password is incorrect!');
                    done();
                });
        });
    });
});
