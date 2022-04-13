const { exec, spawn } = require('child_process');

const grep = exec("ffmpeg -rtsp_transport tcp -i rtsp://10.0.0.180:554/user=admin_password=123456_channel=1_stream=0.sdp -f segment -strftime 1 -segment_time 00:00:10 -segment_atclocktime 1 -segment_clocktime_offset 1 -segment_format mp4 -an -vcodec copy -reset_timestamps 1 /home/srico/Videos/videos/record_%Y-%m-%d-%H.%M.%S.mp4", function (error, stdout, stderr) {
  if (error) {
    console.log(error.stack);
    console.log('Error code: '+error.code);
    console.log('Signal received: '+error.signal);
  }
 console.log('Child Process STDOUT: '+stdout);
  console.log('Child Process STDERR: '+stderr);
});

grep.on('exit', function (code) {
  console.log('Child process exited with exit code '+code);
});

console.log(grep.pid);


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
const cmd = "ffmpeg";
const parts = ["-rtsp_transport tcp -i rtsp://10.0.0.180:554/user=admin_password=123456_channel=1_stream=0.sdp -f segment -strftime 1 -segment_time 00:00:10 -segment_atclocktime 1 -segment_clocktime_offset 1 -segment_format mp4 -an -vcodec copy -reset_timestamps 1 /home/srico/Videos/videos/record_%Y-%m-%d-%H.%M.%S.mp4"];
// "-i rtsp://10.0.0.180:554/user=admin_password=123456_channel=1_stream=0.sdp",
// "-f segment",
// "-strftime 1",
// "-segment_time 00:00:10",
// "-segment_atclocktime 1",
// "-segment_clocktime_offset 1",
// "-segment_format mp4",
// "-an ",
// "-vcodec copy", 
// "-reset_timestamps 1", 
// "/home/srico/Videos/videos/record_%Y-%m-%d-%H.%M.%S.mp4",];
const args = parts;
// console.log(args);



// a background process is running!
// // it is not stopped even if parent node process is killed.
// const cp = spawn(cmd, args, {
//   stdio: 'ignore', // piping all stdio to /dev/null
//   detached: true,
//   env: process.env,

// });

// console.log(cp.pid);
// cp.unref();

