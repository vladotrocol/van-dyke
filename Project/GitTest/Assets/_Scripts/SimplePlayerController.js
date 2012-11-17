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
}