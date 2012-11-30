#pragma strict

var Mwaypoint = new Array();
var Lwaypoint = new Array();
var Rwaypoint = new Array();
static var speed : float = 10;
static var curwp : int;
var middle : boolean;
var left : boolean;
var right: boolean;
var currentSection : GameObject;
var mysection :  GameObject;
var sections = new Array();
var sectionOffset : Vector3;
var locator : GameObject;

//If error about current Section variable come up, assign Section1 prefab to Current Section variable in Inspector

function GeneratePoint()
{
	var sect : GameObject = sections[sections.length-1];
	var tem : GameObject;
	for (var i = 0; i < 6; i++)
	{
		Mwaypoint.Push(sect.Find("M" + i));
		tem = Mwaypoint[i];
		tem.transform.position.z = sect.transform.position.z;
		Mwaypoint[i] = tem;
		
		Rwaypoint.Push(sect.Find("R" + i));
		tem = Rwaypoint[i];
		tem.transform.position.z = sect.transform.position.z;
		Rwaypoint[i] = tem;
		
		Lwaypoint.Push(sect.Find("L" + i));
		tem = Lwaypoint[i];
		tem.transform.position.z = sect.transform.position.z;
		Lwaypoint[i] = tem;
	}
}

function Start () {
	curwp = 0;
	middle = true;
	left = false;
	right = false;
	sectionOffset = Vector3(0.0f,0.0f,0.0f);
	mysection = Instantiate(currentSection, sectionOffset, transform.rotation);	
	sections.Push(mysection);
	GeneratePoint();
	sectionOffset = Vector3(0.0f, 0.0f, mysection.Find("floor").transform.renderer.bounds.size.z);
}

function Update () {

	if (Input.GetKey(KeyCode.UpArrow)) { middle = true; left = false; right = false; }
	if (Input.GetKey(KeyCode.LeftArrow)) { middle = false; left = true; right = false; }
	if (Input.GetKey(KeyCode.RightArrow)) { middle = false; left = false; right = true; }
	if (middle == true)
	{
		if (curwp < Mwaypoint.length)
		{
			var temp : GameObject = Mwaypoint[curwp];
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
		rigidbody.velocity = velo;
	}	
	if (curwp == Mwaypoint.length-1)
	{ 
		mysection = Instantiate(currentSection, sectionOffset, transform.rotation);
		sections.Push(mysection);
		GeneratePoint();
		if(sectionOffset.z > 120)
		{			
			Destroy(sections.Shift());
		}
		sectionOffset = Vector3(0.0f, 0.0f, sectionOffset.z + mysection.Find("floor").transform.renderer.bounds.size.z);
		
		curwp=0;				
	}
}

