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
    	Application.LoadLevel("GameOVer");
    }
    else if (other.gameObject.name == "Win") {
    	Application.LoadLevel("Win");
    }
}


function Update () {
	if(Input.GetKey(KeyCode.UpArrow)){
		transform.Translate(0.0f, 0.0f, Time.deltaTime*5.0f);
	}
	else if(Input.GetKey(KeyCode.DownArrow)){
		transform.Translate(0.0f, 0.0f, -Time.deltaTime*5.0f);
	}
	if(Input.GetKey(KeyCode.LeftArrow)){
		transform.Rotate(0.0f, -Time.deltaTime*80.0f, 0.0f);
	}
	else if(Input.GetKey(KeyCode.RightArrow)){
		transform.Rotate(0.0f, Time.deltaTime*80.0f, 0.0f);
	}
}