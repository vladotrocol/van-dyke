#pragma strict

function Start () {

}

function gameover(other : Collider) {
	if( other.gameObject.name == "Player") {
	Application.LoadLevel("Gameover");
	}
}
function Update () {

}