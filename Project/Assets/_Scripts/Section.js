#pragma strict


public class Section
{

var x : float;
var y : float;
var z : float;
var sizeX : float;
var sizeY : float;
var sizeZ : float;
var obj : GameObject;
var pos = new Array();
}


/*function GeneratePoint()
{	
	for (var i = 0; i < pos.length; i++)
	{
		var newwp = new GameObject();
		newwp.transform.position.z = ((mysection.Find("floor").transform.renderer.bounds.size.z - mysection.transform.position.z) / pos.length)*i;
		Mwaypoint.Push(newwp);
	}
}*/

public function Section(obj:GameObject)
{
	this.obj = obj;
}
