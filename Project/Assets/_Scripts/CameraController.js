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
}