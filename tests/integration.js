
require('dotenv').config({ path: './.env' });
var chai = require('chai');
var chaiHttp = require('chai-http');
const serverURL = process.env.SERVER_URL;

chai.use(chaiHttp);
chai.should();



describe('Notes app - Integration Tests with Mocha', function () {

	/** Integration tests for Api calls */
	describe('Test API calls - individual', function () {

		it('GET / - Should return Login page', function (done) {
			chai.request(serverURL)
				.get('/')
				.end((err, res) => {
					res.should.have.status(200);
					res.type.should.equal('text/html');
					// Ensure page contains strings expected the login page
					res.text.should.contain.oneOf(['User does not exist', 'React App']);
					done();
				});
		});		
	});	
});