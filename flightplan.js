// flightplan.js
var plan = require('flightplan');
var fs = require('fs');

// configuration
// plan.target('staging', {
//   host: 'staging.example.com',
//   username: 'pstadler',
//   agent: process.env.SSH_AUTH_SOCK
// });

plan.target('production', [
  {
    host: 'ec2-52-74-21-166.ap-southeast-1.compute.amazonaws.com',
    username: 'ubuntu',
    agent: process.env.SSH_AUTH_SOCK,
    // port: 22,
    // privateKey: fs.readFileSync('nodejs.pem', { encoding: 'utf8' }).trim()
    privateKey: '/Users/harryng/Desktop/Harry/AWS/nodejs.pem'
  }
]);

var tmpDir = 'mailgun-' + new Date().getTime();

// run commands on localhost
plan.local(function(local) {
  local.log('Run build');
  local.exec('gulp build');

  local.log('Copy files to remote hosts');
  var filesToCopy = local.exec('git ls-files', {silent: true});
  var distFiles = local.exec('find dist -print', {silent: true});
  // rsync files to all the target's remote hosts
  local.transfer(filesToCopy, '/tmp/' + tmpDir);
  local.transfer(distFiles, '/tmp/' + tmpDir);
});

// run commands on the target's remote hosts
plan.remote(function(remote) {
  remote.log('Move folder to web root');
  remote.cp('-R /tmp/' + tmpDir + ' ~/mailgun');
  remote.rm('-rf /tmp/' + tmpDir);

  remote.log('Install dependencies');
  remote.sudo('npm --production --prefix ~/mailgun/' + tmpDir
                            + ' install ~/mailgun/' + tmpDir, {user: 'ubuntu'});

  remote.log('Reload application');
  remote.ln('-snf ~/mailgun/' + tmpDir + ' ~/mailgun/current');
  remote.sudo('pm2 reload mailgun', {user: 'ubuntu'});
});
