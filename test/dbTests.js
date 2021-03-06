// noinspection DuplicatedCode

const chai = require('chai');

const { expect } = chai;

const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('Database GET Tests on Entire Stock', () => {
  it('/api/getitems should return an array', (done) => {
    chai
      .request('http://localhost:3000')
      .get('/api/getitems')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('array');
        expect(res.body).to.have.lengthOf.greaterThan(0);
        done();
      });
  });
  it('/api/getitems should return items with correct multiples values', (done) => {
    chai
      .request('http://localhost:3000')
      .get('/api/getitems')
      .end((err, res) => {
        for (resItem of res.body) {
          expect(resItem.multiples.hasMultiples).to.be.a('boolean');
          if (resItem.multiples.hasMultiples) {
            expect(resItem.multiples.options).to.be.a('object');
            for (opt in resItem.multiples.options) {
              expect(opt).to.be.a('string');
            }
          } else {
            expect(resItem.multiples.options).to.be.a('object');
            expect(resItem.multiples.options).to.be.empty;
          }
        }
        done();
      });
  });
  it('/api/getitems should return items with names', (done) => {
    chai
      .request('http://localhost:3000')
      .get('/api/getitems')
      .end((err, res) => {
        for (resItem of res.body) {
          expect(resItem.name).to.be.a('string');
          expect(resItem.name).to.not.be.empty;
        }
        done();
      });
  });
  it('/api/getitems should return items with categories', (done) => {
    chai
      .request('http://localhost:3000')
      .get('/api/getitems')
      .end((err, res) => {
        for (resItem of res.body) {
          expect(resItem.category).to.be.a('string');
          expect(resItem.category).to.not.be.empty;
        }
        done();
      });
  });
  it('/api/getitems should return items with stocks', (done) => {
    chai
      .request('http://localhost:3000')
      .get('/api/getitems')
      .end((err, res) => {
        for (resItem of res.body) {
          expect(resItem.stock).to.be.a('number');
          expect(resItem.stock).to.be.greaterThan(0);
        }
        done();
      });
  });
  it('/api/getitems should return items with valid prices', (done) => {
    chai
      .request('http://localhost:3000')
      .get('/api/getitems')
      .end((err, res) => {
        for (resItem of res.body) {
          expect(resItem.price).to.be.a('number');
          expect(resItem.price).to.be.greaterThan(0);
          expect(resItem.price).to.be.lessThan(300);
        }
        done();
      });
  });
  it('/api/getitems should return items with a highlight string', (done) => {
    chai
      .request('http://localhost:3000')
      .get('/api/getitems')
      .end((err, res) => {
        for (resItem of res.body) {
          expect(resItem.highlights).to.be.a('string');
          expect(resItem.highlights).to.not.be.empty;
        }
        done();
      });
  });
  it('/api/getitems should return items with description arrays of strings', (done) => {
    chai
      .request('http://localhost:3000')
      .get('/api/getitems')
      .end((err, res) => {
        for (resItem of res.body) {
          expect(resItem.description).to.be.a('array');
          expect(resItem.description).to.not.be.empty;
          for (desc of resItem.description) {
            expect(desc).to.be.a('string');
            expect(desc).to.not.be.empty;
          }
        }
        done();
      });
  });
  it('/api/getitems should return items with arrays of feature strings', (done) => {
    chai
      .request('http://localhost:3000')
      .get('/api/getitems')
      .end((err, res) => {
        for (resItem of res.body) {
          expect(resItem.features).to.be.a('array');
          expect(resItem.features).to.not.be.empty;
          for (feat of resItem.features) {
            expect(feat).to.be.a('string');
            expect(feat).to.not.be.empty;
          }
        }
        done();
      });
  });

  // TODO: other fields in docs

  it('/api/getitems should not return any out-of-stock items', (done) => {
    chai
      .request('http://localhost:3000')
      .get('/api/getitems')
      .end((err, res) => {
        for (resItem of res.body) {
          expect(resItem.stock).to.be.greaterThan(0);
        }
        done();
      });
  });
});

const urls = ['cc', 'ls', 'ch', 'st', 'bt', 'wt', 'mt', 'wc'];

describe('Database GET Tests on Individual Items', () => {
  it('/api/getitems?id=url should return item with the requested url/id', (done) => {
    for (const testUrl of urls) {
      chai
        .request('http://localhost:3000')
        .get(`/api/getitems?id=${testUrl}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body[0].url).to.equal(testUrl);
        });
    }
    done();
  });
  it('if the url is invalid, /api/getitems?id=url should return an empty array', (done) => {
    chai
      .request('http://localhost:3000')
      .get('/api/getitems?id=thisiswrong')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.lengthOf(0);
        done();
      });
  });
  it('/api/getitems?id=url should return item with a default main image url at index 0', (done) => {
    for (const testUrl of urls) {
      chai
        .request('http://localhost:3000')
        .get(`/api/getitems?id=${testUrl}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body[0].images).to.not.be.empty;
          expect(res.body[0].images).to.include(`${testUrl}_main.JPG`);
          expect(res.body[0].images[0]).to.equal(`${testUrl}_main.JPG`);
        });
    }
    done();
  });
});
