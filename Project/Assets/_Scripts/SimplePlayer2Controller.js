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
	if(Input.GetKey(KeyCode.W)){
		transform.Translate(0.0f, 0.0f, Time.deltaTime*5.0f);
	}
	else if(Input.GetKey(KeyCode.S)){
		transform.Translate(0.0f, 0.0f, -Time.deltaTime*5.0f);
	}
	if(Input.GetKey(KeyCode.A)){
		transform.Rotate(0.0f, -Time.deltaTime*80.0f, 0.0f);
	}
	else if(Input.GetKey(KeyCode.D)){
		transform.Rotate(0.0f, Time.deltaTime*80.0f, 0.0f);
	}
}