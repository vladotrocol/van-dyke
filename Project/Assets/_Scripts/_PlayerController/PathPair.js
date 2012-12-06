#pragma strict
//This class describes a pair of waypoints
public class PathPair{
	var left:Vector3;
	var right: Vector3;

	//Constructor
	public function PathPair(l:Vector3, r:Vector3){
		this.left = l;
		this.right = r;
	}
}