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
	if(Input.GetKey(KeyCode.UpArrow)) {
		transform.Translate (0.0f, 0.0f, Time.deltaTime*20.0f);
		}
		else if(Input.GetKey(KeyCode.DownArrow)) {
		transform.Translate (0.0f, 0.0f, Time.deltaTime*-8.0f);
		}
		else if(Input.GetKey(KeyCode.RightArrow)) {
		transform.Translate (Time.deltaTime*8.0f, 0.0f, 0.0f);
		}
		else if(Input.GetKey(KeyCode.LeftArrow)) {
		transform.Translate (-Time.deltaTime*8.0f, 0.0f, -0.0f);
		}
}