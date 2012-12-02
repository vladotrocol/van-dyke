#pragma strict


public class Section{
	var position: Vector3;
	var size: Vector3;
	var obj : GameObject;
	var wp = new Array();
	
	//Constructor
	function Section(object:GameObject,nrWp:int , name: String, pos: Vector3, rot: Quaternion){
		this.obj = GameObject.Instantiate(object, pos, rot);
		this.obj.name = name;
		this.position = obj.transform.position;
		this.size = obj.Find("floor").renderer.bounds.size;
		initializeWaypoints(nrWp);
	}
	
	
	function initializeWaypoints(nrWp:int){
		for(var i=1; i<=nrWp;i++){
			var l = this.obj.Find("L"+i);
			var r = this.obj.Find("R"+i);
			var pair: PathPair = new PathPair(l, r);
			wp.Push(pair);
		}
	}
	
	//Returns the ith pair
	function Pair(nr:int){
		return wp[nr] as PathPair;
	}
}