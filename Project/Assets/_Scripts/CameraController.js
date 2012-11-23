#pragma strict

var Play : GameObject;
var startPos : float;
var curpos : float;
function Start () {
	Play = GameObject.FindGameObjectWithTag("Player");
	startPos = Play.transform.position.z;
}

function Update () {
	curpos = Play.transform.position.z;
	if (curpos != startPos)
	{
	transform.Translate(0.0f, 0.0f, (curpos - startPos));
	startPos = curpos;
	}
}