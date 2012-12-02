#pragma strict
//This class describes a pair of waypoints
public class PathPair{
	var left:Vector3;
	var right: Vector3;

	//Constructor
	public function PathPair(l:GameObject, r:GameObject){
		this.left = l.transform.position;
		this.right = r.transform.position;
	}
}