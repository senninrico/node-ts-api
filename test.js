const { exec, spawn } = require('child_process');

// const grep = exec('dd if=/dev/zero of=output.dat bs=1M count=2400 &', function (error, stdout, stderr) {
//   if (error) {
//     console.log(error.stack);
//     console.log('Error code: '+error.code);
//     console.log('Signal received: '+error.signal);
//   }
//  // console.log('Child Process STDOUT: '+stdout);
//   //console.log('Child Process STDERR: '+stderr);
// });

// // grep.on('exit', function (code) {
// //   console.log('Child process exited with exit code '+code);
// // });

// console.log(grep.pid);


// const cp = spawn('./tstt.sh');


//  cp.stdout.on("data", data => {
//           console.log('Output of script execution');
//   });
  
//   cp.stderr.on("data", data => {
//           console.log('an error with file system');
//   });
// console.log(cp.pid)

// const child = spawn('find', ['.', '&']);

// // child.stdout.on('data', (data) => {
// //   console.log(`stdout:\n${data}`);
// // });

// // child.stderr.on('data', (data) => {
// //   console.error(`stderr: ${data}`);
// // });

// child.on('error', (error) => {
//   console.error(`error: ${error.message}`);
// });

// child.on('close', (code) => {
//   console.log(`child process exited with code ${code}`);
// });



// a command you want to execute.
const command = "dd if=/dev/zero of=output.dat bs=1M count=6400";

const parts = command.split(" ");
const cmd = parts[0];
const args = parts.splice(1);
console.log(args);

// a background process is running!
// it is not stopped even if parent node process is killed.
const cp = spawn(cmd, args, {
  stdio: 'ignore', // piping all stdio to /dev/null
  detached: true,
  env: process.env,

});

console.log(cp.pid);
cp.unref();

