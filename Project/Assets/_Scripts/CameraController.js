<<<<<<< HEAD
#pragma strict

var Play : GameObject;
var startPosz : float;
var startPosx : float;
var startPosy : float;
var curPosz : float;
var curPosy: float;
var curPosx: float;


function Start () {
	Play = GameObject.FindGameObjectWithTag("Player");
	startPosz = Play.transform.position.z;
	startPosy = Play.transform.position.y;
	startPosx = Play.transform.position.x;
}

function Update () {
	curPosz = Play.transform.position.z;
	curPosy = Play.transform.position.y;
	curPosx = Play.transform.position.x;
	
	if (curPosz != startPosz)
	{
	//					Side, Up   , forward
	transform.Translate(0.0f, 0.0f, (curPosz - startPosz));
	startPosz = curPosz;
	}
	
	if (curPosy != startPosy)
	{
	//					Side,  Up                  , forward
	transform.Translate(0.0f, (curPosy - startPosy), 0.0f );
	startPosy = curPosy;
	}
	if (curPosx != startPosx)
	{
	//					Side,                 Up   , forward
	transform.Translate((curPosx - startPosx), 0.0f, 0.0f);
	startPosx = curPosx;
	} 
=======
#pragma strict
// player and camera
var Play : GameObject;
var MainCamera : GameObject;
//Start position of camera, used for zero error  
var startPosz : float;
var startPosx : float;
var startPosy : float;
//Current position of camera
var curPosz : float;
var curPosy: float;
var curPosx: float;
//Position that the camera is moving to 
var desiredPosz : float;
var desiredPosy: float;
var desiredPosx: float;
//Speed that the camera follows the player
var CameraSpeed: float;



function Start () {
	Play = GameObject.FindGameObjectWithTag("Player");
	MainCamera = GameObject.FindGameObjectWithTag("MainCamera");
	// issue if the camera is slower than 0.8 (listing to the left)
	CameraSpeed = 0.2;
	startPosz = Play.transform.position.z;
	startPosy = Play.transform.position.y;
	startPosx = Play.transform.position.x;
	
}

function Update () {
	// desired location of the camera, z is moving forward, y is up and down, x is side to side 
	desiredPosz = Play.transform.position.z;
	desiredPosy = Play.transform.position.y;
	desiredPosx = Play.transform.position.x;
	//only x has lag at the moment  
	curPosx = MainCamera.transform.position.x;
	
	//update camera for forward movement
	if (desiredPosz != startPosz){
		transform.Translate(0.0f, 0.0f, (desiredPosz - startPosz));
		startPosz = desiredPosz;
	}
	
	//update camera for up/down (jumping, not tested should work) 
	if (desiredPosy != startPosy){
	//				  Horizontal,                  Verticle, Depth 
		transform.Translate(0.0f, (desiredPosy - startPosy), 0.0f);
		startPosy = desiredPosy;
	}	
	
	//Basic version follows pecisley 
	/*if (desiredPosx != startPosx){
	//					Horizontal, Verticle, Depth 
		transform.Translate((desiredPosx - startPosx),0.0f, 0.0f);
		startPosx = desiredPosx;
	}*/
	
	if (desiredPosx != startPosx){
	
		if(curPosx + CameraSpeed < desiredPosx){
			curPosx = curPosx + CameraSpeed;
			
		} else if(curPosx - CameraSpeed > desiredPosx){
			curPosx = curPosx - CameraSpeed;
			
		}else{
			curPosx = desiredPosx;
			
		}
		transform.Translate((curPosx - startPosx ), 0.0f, 0.0f);
		startPosx = curPosx;
	}
>>>>>>> 9088ff8b2355542afdf53fa85864b8bd86af2371
}