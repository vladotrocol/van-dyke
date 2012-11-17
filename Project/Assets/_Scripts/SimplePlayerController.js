<<<<<<< HEAD:Project/GitTest/Assets/_Scripts/SimplePlayerController.js
#pragma strict

function Start () {

}

function Update () {
	if(Input.GetKey(KeyCode.UpArrow)) {
		transform.Translate (0.0f, 0.0f, Time.deltaTime*5.0f);
		}
		else if(Input.GetKey(KeyCode.DownArrow)) {
		transform.Translate (0.0f, 0.0f, Time.deltaTime*-5.0f);
		}
		else if(Input.GetKey(KeyCode.RightArrow)) {
		transform.Translate (Time.deltaTime*8.0f, 0.0f, 0.0f);
		}
		else if(Input.GetKey(KeyCode.LeftArrow)) {
		transform.Translate (-Time.deltaTime*8.0f, 0.0f, -0.0f);
		}
=======
#pragma strict

function Start () {

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
>>>>>>> master:Project/Assets/_Scripts/SimplePlayerController.js
}