#pragma strict
private var StartPos : Vector3;
var player : Player;

function Initialize(playerState:int, playerPosition:int){
	player = Player(playerState,playerPosition);
}

function Start () {
	StartPos = transform.position;
}

function Update () {
	if(player.IsDriver()){
		player.MoveVehicle();
	}
}