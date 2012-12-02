#pragma strict
private var StartPos : Vector3;

function Start () {
	StartPos = transform.position;

}


function OnTriggerEnter(other : Collider)
{
    if (other.gameObject.name == "RespawnTile") {
        transform.position = StartPos;
    }
    else if  (other.gameObject.name == "RespawnPoint") {
    	StartPos = transform.position;
    }
    else if (other.gameObject.name == "GameOver") {
    	Application.LoadLevel("GameOver");
    }
    else if (other.gameObject.name == "Win") {
    	Application.LoadLevel("Win");
    }
    else if (other.gameObject.name == "monster") {
    	Application.LoadLevel("GameOver");
    }
}


function Update () {

}