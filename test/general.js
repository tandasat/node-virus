var assert = require('assert');
var spawn = require('child_process').spawn;
var fs = require('fs');

var virus = require(__dirname + '/../app');
describe('General testing', function(){
    describe('Structure test', function(){
        it('Should contain the EICAR signature file.', function(){
            assert.equal(virus, 'X5O!P%@AP[4\\PZX54(P^)7CC)7}$EICAR-STANDARD-ANTIVIRUS-TEST-FILE!$H+H*');
        });
    });

    describe('virus.txt testing', function(){
        it('Should contain the EICAR signature file.', function(){
            assert.equal(fs.readFileSync(__dirname + '/../virus.txt').toString().split('\n')[0], 'X5O!P%@AP[4\\PZX54(P^)7CC)7}$EICAR-STANDARD-ANTIVIRUS-TEST-FILE!$H+H*');
        });
    });

    describe('Detection', function(){
        it('ClamAv should detect it as beeing a virus.', function(done){
            this.timeout(10000);
            var stdout = '';
            var stderr = '';

            var clam = spawn('/usr/bin/clamscan', ['-r', __dirname + '/../']);


            clam.stdout.on('data', function(data){
                stdout += data.toString();
            });

            clam.stderr.on('data', function(data){
                stderr += data.toString();
            });

            clam.on('error', function(err){
                throw err;
            });

            clam.on('close', function(){
                assert.ok(stdout.indexOf('Eicar-Test-Signature FOUND') !== -1);
                assert.equal(stderr.length, 0);

                done();
            });
        });
    });
});
