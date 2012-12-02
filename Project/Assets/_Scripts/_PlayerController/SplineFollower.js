/*#pragma strict
var Mwaypoint = new Array();
var Lwaypoint = new Array();
var Rwaypoint = new Array();
static var speed : float = 3;
var curwp : int;
var middle : boolean;
var left : boolean;
var right: boolean;
var PrefabSections = new Array();
var mysection :  GameObject;
var sections = new Array();
var sectionOffset : Vector3;
var locator : GameObject;
var s: Section;


//If error about current Section variable come up, assign Section1 prefab to Current Section variable in Inspector

function InitializeSections(){
	 var temparray = Resources.FindObjectsOfTypeAll(typeof(GameObject)); 
	 var tempp: GameObject;
	 for(var count =0; count<temparray.length; count++){
	 	tempp =  temparray[count];
	 	if(tempp.tag=="Section"){
	 		PrefabSections.Push(tempp); 
	 		Debug.Log(tempp.name);
	 	}
	 }
	 
	 //.Cast<GameObject>().Where(g=>g.tag=="Section").ToList()
}

function GeneratePoint(section:GameObject)
{
	var sect : GameObject = sections[sections.length-1];
	for (var i = 0; i < 6; i++)
	{
		Mwaypoint.Push(sect.Find("M" + i));
		Rwaypoint.Push(sect.Find("R" + i));
		Lwaypoint.Push(sect.Find("L" + i));
		
	}
}

function Start () { 
	InitializeSections();
	curwp = 0;
	middle = true;
	left = false;
	right = false;
	locator = new GameObject();
	sectionOffset = Vector3(0.0f,0.0f,0.0f);
	s = new Section(PrefabSections[0], 5);
	mysection = Instantiate(s.obj, sectionOffset, transform.rotation);	
	sections.Push(mysection);
	GeneratePoint(mysection);
	sectionOffset = Vector3(0.0f, 0.0f, mysection.Find("floor").transform.renderer.bounds.size.z);
}

function Update () {
/*Two points. distance. Could use smooth damp by getting the next waypoint midpoint.
Find mind point of two current waypoints. get new vector that is orthoganal to the
line between the two current waypoints. Then use smoothDamp to get to the next midpoint.
Repeat.

*/
	if (Input.GetKey(KeyCode.UpArrow)) { middle = true; left = false; right = false; }
	if (Input.GetKey(KeyCode.LeftArrow)) { middle = false; left = true; right = false; }
	if (Input.GetKey(KeyCode.RightArrow)) { middle = false; left = false; right = true; }
		
		if (curwp >= Mwaypoint.length)
	{
			
			mysection = Instantiate(PrefabSections[0], sectionOffset, transform.rotation);
			sections.Push(mysection);
			GeneratePoint(mysection);
			sectionOffset = Vector3(0.0f, 0.0f, sectionOffset.z + mysection.Find("floor").transform.renderer.bounds.size.z); 
			Debug.Log(Mwaypoint.length);
			
	}
	
	if (middle == true)
	{
		if (curwp < Mwaypoint.length)
		{
			var temp:GameObject = Mwaypoint[curwp];
			Debug.Log(temp.name);
			var next : Vector3 = temp.transform.position;
			var dir : Vector3 = next - transform.position;
			var velo = rigidbody.velocity;
			
			if (dir.magnitude < 2)
			{
				curwp++;
			}
			else
			{
				velo = dir.normalized*speed;
			}
		}
		else
		{

		}	
		rigidbody.velocity = velo;
	}
	if (left == true)
	{
		if (curwp < Lwaypoint.length)
		{	
			temp = Lwaypoint[curwp];
			next = temp.transform.position;
			dir = next - transform.position;
			velo = rigidbody.velocity;
			
			if (dir.magnitude < 2)
			{
				curwp++;
				
			}
			else
			{
				velo = dir.normalized*speed;
			}
		}
		else
		{
		}		
	rigidbody.velocity = velo;
	}
	if (right == true)
	{
		if (curwp < Rwaypoint.length)
		{
			temp = Rwaypoint[curwp];
			next = temp.transform.position;
			dir = next - transform.position;
			velo = rigidbody.velocity;
			
			if (dir.magnitude < 2)
			{
				curwp++;
			}
			else
			{
				velo = dir.normalized*speed;
			}
		}
		else
		{	
		}
		rigidbody.velocity = velo;
	}

}

*/
