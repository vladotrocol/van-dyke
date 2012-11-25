#pragma strict

var Play : GameObject;
var startPos : Vector3;
var startPosx : float;
var startPosy : float;
var curPos : Vector3;
var curPosy: float;
var curPosx: float;

// TODO: Merge this with the main camera controller. No need for two scripts!

function Start () {
	Play = GameObject.FindGameObjectWithTag("Player");
	startPos = Play.transform.position;	
}

function Update () {
	curPos = Play.transform.position;
	
	if (curPos != startPos)
	{
	//					Side, Up   , forward
	transform.Translate(curPos - startPos,  Space.World);
	startPos = curPos;
	}
 
}