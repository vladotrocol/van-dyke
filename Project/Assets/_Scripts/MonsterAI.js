#pragma strict
private var player : GameObject;
function Start () {
	player = GameObject.Find("Player");
	transform.position = player.transform.position;
	transform.position.z = transform.position.z - 2;
}

function Update () {
	rigidbody.velocity = player.rigidbody.velocity;
	transform.position.y = 1; // FIXME: this stops the monster falling through the floor, but they shouldn't.
}