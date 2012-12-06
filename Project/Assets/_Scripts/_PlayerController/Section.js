#pragma strict

public class Section{
	var position: Vector3;
	var size: Vector3;
	var obj : GameObject;
	var wp = new Array();
	var length: int;
	
	//Constructor
	function Section(object:GameObject, name: String, pos: Vector3, rot: Quaternion){
		this.obj = GameObject.Instantiate(object, pos, rot);
		this.obj.name = name;
		this.position = obj.transform.position;
		this.size = obj.transform.Find("floor").renderer.bounds.size;
		this.length = this.obj.transform.Find("wayPoints").Find("LWP").GetComponentsInChildren(Transform).length-1;
		initializeWaypoints();
		//Debug.Log("Section size:" + this.size);
	}
	
	
	function initializeWaypoints(){
		for(var i=1; i<=this.length;i++){
			var l = this.obj.transform.Find("wayPoints").Find("LWP").Find("L"+i).position;
			var r = this.obj.transform.Find("wayPoints").Find("RWP").Find("R"+i).position;
			var pair: PathPair = new PathPair(l, r);
			wp.Push(pair);
		}
	}
	
	//Returns the ith pair
	function Pair(nr:int){
		return wp[nr] as PathPair;
	}
	
	function Position(){
		return this.position;
	}
	
	function Size(){
		return this.size;
	}
	
	function Obj(){
		return this.obj as GameObject;
	}
	
}