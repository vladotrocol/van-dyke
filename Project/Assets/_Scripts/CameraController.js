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
		transform.position += Vector3(0.0f, 0.0f, (desiredPosz - startPosz));
		startPosz = desiredPosz;
	}
	
	//update camera for up/down (jumping, not tested should work) 
	if (desiredPosy != startPosy){
	//				  Horizontal,                  Verticle, Depth 
		transform.position += Vector3(0.0f, (desiredPosy - startPosy), 0.0f);
		startPosy = desiredPosy;
	}	
	
	//Basic version follows pecisley 
	if (desiredPosx != startPosx){
	//					Horizontal, Verticle, Depth 
		transform.position += Vector3((desiredPosx - startPosx),0.0f, 0.0f);
		
		startPosx = desiredPosx;
	}
	
	/*if (desiredPosx != startPosx){
	
		if(curPosx + CameraSpeed < desiredPosx){
			curPosx = curPosx + CameraSpeed;
			
		} else if(curPosx - CameraSpeed > desiredPosx){
			curPosx = curPosx - CameraSpeed;
			
		}else{
			curPosx = desiredPosx;
			
		}
		transform.position += Vector3((curPosx - startPosx ), 0.0f, 0.0f);
		
		startPosx = curPosx;
	}*/
}