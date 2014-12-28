var visualizer = function () {

    //all of the variables

    var canvas,
    context,
    audioAnalyser,
    audioContext,
    sourceNode,
    audioBuffer,
    fbc_array,
    nodesContainer,
    index,
    animations;

    //add smoothness factor to this


    //node object contructor function

    var nodes = function () {
        this.circle = {
            x: (canvas.width / 2),
            y: (canvas.height / 2),
            acceptableSizes: [13, 14, 15, 16, 17],
            size: function () {
                return 15; //this.acceptableSizes[Math.floor(Math.random() * this.acceptableSizes.length)]; 
            },
            color: "#ffffff",
            length: 50
        };
        this.bar = {
            x: 0,
            y: 0,
            width: 2,
            height: 20
        };
    };

    var resize = function () {
        //set the canvas height and width
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };

    //initialize function

    this.init = function () {

        canvas = document.getElementById('canvas');
        context = canvas.getContext('2d');
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
        console.log('working');
        index = 0;
        audioContext = new webkitAudioContext();
        audioAnalyser = audioContext.createAnalyser();
        document.addEventListener('keydown', setKeydown, false);

        //loadSound('http://s.cdpn.io/1715/the_xx_-_intro.mp3'); // for testing
        loadSound('http://prayushs.com/lab/Minimal/sound.mp3');

        //add event for resize

        window.addEventListener('resize', resize, false);

        nodesContainer = []; //used to store the nodes objects

        animations = [


        function () {

            context.clearRect(0, 0, canvas.width, canvas.height);
            context.fillStyle = '#2ecc71';
            context.fillRect(0, 0, canvas.width, canvas.height);

            for (i = 0; i < nodesContainer.length; i++) {

                var getNodes = nodesContainer[i];
                context.fillStyle = getNodes.circle.color;
                context.beginPath();
                //set the x position and the y position of the nodes here
                context.arc(
                getNodes.circle.x + (290 * Math.cos(2 * Math.PI * i / nodesContainer.length)),
                getNodes.circle.y + (290 * Math.sin(2 * Math.PI * i / nodesContainer.length)), (fbc_array[i] / 10) + getNodes.circle.size(),
                0,
                2 * Math.PI,
                false);
                context.fill();



            }
        },

        function () {

            context.clearRect(0, 0, canvas.width, canvas.height);
            context.fillStyle = '#2ecc71';
            context.fillRect(0, 0, canvas.width, canvas.height);

            for (i = 0; i < nodesContainer.length; i++) {

                var getBars = nodesContainer[i];

                context.fillStyle = "#fff";

                context.beginPath();

                context.fillRect(getBars.bar.x + (i * (canvas.width / nodesContainer.length) - 2), canvas.height / 2, getBars.bar.width, getBars.bar.height + (-fbc_array[i]));

                context.fill();

                context.stroke();



            }


        },

        function () {

            context.clearRect(0, 0, canvas.width, canvas.height);
            context.fillStyle = '#2ecc71';
            context.fillRect(0, 0, canvas.width, canvas.height);

            for (i = 0; i < nodesContainer.length; i++) {

                var getLines = nodesContainer[i];

                context.fillStyle = '#fff';

                context.beginPath();

                context.arc(getLines.bar.x + (i * (canvas.width / nodesContainer.length) + 27), canvas.height / 2, (fbc_array[i] / 10) + 5, 0, 2 * Math.PI, false);

                context.fill();


            }






        },

        function () {

            context.clearRect(0, 0, canvas.width, canvas.height);
            context.fillStyle = '#2ecc71';
            context.fillRect(0, 0, canvas.width, canvas.height);

            for (i = 0; i < nodesContainer.length; i++) {

                var getLines2 = nodesContainer[i];

                context.fillStyle = '#fff';

                context.beginPath();
                context.arc(getLines2.bar.x + (i * (canvas.width / nodesContainer.length) + 27), (-fbc_array[i] / 2.5) + (canvas.height / 2), 10, 0, 2 * Math.PI, false);
                context.fill();


            }


        }


        ];


        for (a = 0; a < 22; a++) {

            nodesContainer.push(new nodes());

        }


        animate();




    };

    var setKeydown = function (event) {

        //event.preventDefault();
        //event.stopPropagation();

        console.log(event.keyCode);

        //use a switch statement
        switch (event.keyCode) {
            case 39:
                //right
                event.preventDefault();
                event.stopPropagation();
                index += 1;
                break;

            case 37:
                //left

                event.preventDefault();
                event.stopPropagation();
                index -= 1;
                break;

        }

        if (index > animations.length - 1) {

            index = (animations.length / animations.length) - 1;


        } else if (index < 0) {

            index = (animations.length / animations.length) - 1;


        } else {

            index = index;

        }

        return animations[index]();



    };


    var loadSound = function (url) { //loading the audio sound asynchronously for less memory use

        //keep request in a private scope

        var request = new XMLHttpRequest();

        request.open('GET', url, true); //don't use audio files in the local machine, otherwise it won't allow it
        request.responseType = 'arraybuffer'; //set the response type to arraybuffer since it's an audio
        request.onload = function () {
            //decode the arraybuffer data

            audioContext.decodeAudioData(request.response, function (buffer) {

                audioBuffer = buffer;
                console.log('audio is working');
                playAudio();
            });
        };

        request.onerror = function () {
            console.log('Could not load audio');
            alert('Could not load audio');
        };

        request.send();




    };


    var playAudio = function () {

        //create a source node from the buffer

        sourceNode = audioContext.createBufferSource();

        //set the source of the sourceNode to buffer from the request.onload function

        sourceNode.buffer = audioBuffer;

        //connect to the audioAnalyser and then hook that up to the destination ( speakers )


        sourceNode.connect(audioAnalyser);

        audioAnalyser.connect(audioContext.destination);

        //play the audio

        sourceNode.noteOn(0);

        animate();



    };

    var animate = function () {

        window.requestAnimationFrame(animate);

        fbc_array = new Uint8Array(audioAnalyser.frequencyBinCount);
        audioAnalyser.getByteFrequencyData(fbc_array);

        animations[index]();

    };




}; //end of visualizer constructor
window.addEventListener('load', loadExperiment,false);

    function loadExperiment(){

    var getButton = document.getElementById('start');
    getButton.addEventListener('click',function(){

       var elements = document.querySelector('.shownone');

       elements.style.display = 'none';
       elements.style.height = 0;
       elements.style.width = 0;

         a = new visualizer();
            a.init();




    },false)


    }






