#pragma strict
var sectionModel : GameObject;
var player : GameObject;
var playerStartPosition;
var sectionModelSize;
function Start () {
	
	var sectionInstance1 = Instantiate (sectionModel, Vector3(0.0f, 0.0f, 0.0f), transform.rotation);
	sectionInstance1.AddComponent("MeshRenderer");
	playerStartPosition = player.transform.position;
	
   	var size = sectionInstance1.renderer.bounds.size;
	Debug.Log(size);
}

function Update () {

}