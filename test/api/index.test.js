const chai = require('chai');
const chaiHttp = require('chai-http')
const should = chai.should()

const server = require('../../app.js')


chai.use(chaiHttp)

describe('node server ', () => {
    it('(GET/ anasayfayı döndürür',(done) =>{
        chai.request(server)
            .get('/')
            .end((err,res) => {
                res.should.have.status(200)

                done()
        })
    });

});