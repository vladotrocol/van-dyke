#pragma strict
class Player{
	var state = 0; // 0 = Creator. 1 = Destroyer.
	var position = 0; // 0 = Front. 1 = Back.
	var vehicle = GameObject.Find("Vehicle");
	function Player(s:int,p:int){
		state = s;
		position = p;
	}
	/* Takes an integer from the action enum and performs the appropriate action */
	function Action(action:int){
		if(state == 0){
			// Creator Actions
		} else if(state == 1){
			// Destroyer Actions
		}
	}
	function MoveVehicle(){
		// Forwards and backwards
		if(Input.GetKey(KeyCode.UpArrow)){
			vehicle.transform.Translate(0.0f, 0.0f, Time.deltaTime*10.0f);
		}
		else if(Input.GetKey(KeyCode.DownArrow)){
			vehicle.transform.Translate(0.0f, 0.0f, -Time.deltaTime*10.0f);
		}
		// Rotation
		if(Input.GetKey(KeyCode.LeftArrow)){
			vehicle.transform.Rotate(0.0f, -Time.deltaTime*80.0f, 0.0f);
		}
		else if(Input.GetKey(KeyCode.RightArrow)){
			vehicle.transform.Rotate(0.0f, Time.deltaTime*80.0f, 0.0f);
		}
		// Lateral movement
		if(Input.GetKey(KeyCode.Comma)){
			vehicle.transform.Translate(-Time.deltaTime*10.0f, 0.0f, 0.0f);
		}
		else if(Input.GetKey(KeyCode.Period)){
			vehicle.transform.Translate(Time.deltaTime*10.0f, 0.0f, 0.0f);
		}
	}
	
	function IsDriver(){
		if(this.position == 0){
			return true;
		} else { 
			return false;
		}
	}
	
	function IsGunner(){
		if(this.position == 1){
			return true;
		} else { 
			return false;
		}
	}
		
	enum DestoyActions {
		Bridge = 1,
	}
	enum CreateActions {
		Bridge = 1,
	}
}