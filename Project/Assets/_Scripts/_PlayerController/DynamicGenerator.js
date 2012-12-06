/*#pragma strict

var middleWayPoints = new Array();
var currentWayPoint : int;	
var playerSpeed = 5;
var section : GameObject;
var activeSections = new Array();	

function updateWayPoints(currentSection:GameObject){
	middleWayPoints.Clear();
	for(var i = 1; i<=10;i++){
		middleWayPoints.Push(currentSection.Find("M"+i));
	}
}

function instantiateSection(sec:GameObject, pos: Vector3){
	var newInstanceOfSection = Instantiate(sec, pos, transform.rotation);
	activeSections.Push(newInstanceOfSection);	
}

function movePlayer(){
	if (currentWayPoint < middleWayPoints.length){
		var temp:GameObject = middleWayPoints[currentWayPoint];
		var next : Vector3 = temp.transform.position;
		var dir : Vector3 = next - transform.position;
		var velo = rigidbody.velocity;
		
		if (dir.magnitude <=0){
			currentWayPoint++;
		}
		else{
			velo = dir.normalized*playerSpeed;
		}
	}
	var temp2:GameObject = middleWayPoints[currentWayPoint-1];
	Debug.Log(transform.position.z);
	if(transform.position == temp2.transform.position){
		instantiateSection(section, Vector3(0,0, section.Find("floor").renderer.bounds.size.z));
		updateWayPoints(activeSections[activeSections.length-1]);
	}
	rigidbody.velocity = velo;
}

function Start () {
	currentWayPoint = 0;
	instantiateSection(section, Vector3(0,0,0));
	updateWayPoints(activeSections[0]);
}

function Update () {
	movePlayer();
}
*/