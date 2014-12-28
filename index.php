<?php
header('Access-Control-Allow-Origin: *'); 

?>
<html>

<head>
	<title>Audio</title>
<script src = "script.js"></script>
<link rel = "stylesheet" type = "text/css" href = "styles.css"/>
</head>
<body>
	        <div id='audio-box' class = 'shownone'>
            <p id ='credits' class = 'shownone'>

            	Use Your Arrow keys to switch up the animations.<br>

            	Music is: In Motion by Trent Reznor and Atticus Ross featured in 2010 film "The Social Network".<br>

            	This experiment works best on wide screens.

            </p>
            <button id = "start" class = 'shownone'>Lets Start it!</button>
        </div>
<canvas id = 'canvas'></canvas>

</body>


</html>
