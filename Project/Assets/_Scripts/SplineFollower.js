#pragma strict

var Mwaypoint = new Array();
var Lwaypoint = new Array();
var Rwaypoint = new Array();
static var speed : float = 40;
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
if (Mwaypoint.length != 0)
{

}
	for (var i = 0; i < 4; i++)
	{
		Mwaypoint.Push( Instantiate(locator, Vector3(-mysection.Find("pCube1").transform.renderer.bounds.size.x/2,
		1.207709,((mysection.Find("pCube1").transform.renderer.bounds.size.z ) / 4)*i+sectionOffset.z), transform.rotation));
		//newwp.transform.position.z = ((mysection.Find("pCube1").transform.renderer.bounds.size.z ) / 4)*i+sectionOffset.z;
		//newwp.transform.Translate(-(mysection.Find("pCube1").transform.renderer.bounds.size.x/2), 0.0f, 0.0f);
		//newwp.transform.position.y = 1.207709;

	}
	for (i = 0; i < 4; i++)
	{
		Rwaypoint.Push(Instantiate(locator, Vector3(-1.0f,
		1.207709,((mysection.Find("pCube1").transform.renderer.bounds.size.z ) / 4)*i+sectionOffset.z), transform.rotation));
		//newwp.transform.position.z = ((mysection.Find("pCube1").transform.renderer.bounds.size.z ) / 4)*i+sectionOffset.z;
		//newwp.transform.Translate(-1.0f, 0.0f, 0.0f);
		//newwp.transform.position.y = 1.207709;

	}
	for (i = 0; i < 4; i++)
	{
		Lwaypoint.Push(Instantiate(locator, Vector3((-mysection.Find("pCube1").transform.renderer.bounds.size.x)+1,
		1.207709,((mysection.Find("pCube1").transform.renderer.bounds.size.z ) / 4)*i+sectionOffset.z), transform.rotation));
		//newwp.transform.position.z = ((mysection.Find("pCube1").transform.renderer.bounds.size.z ) / 4)*i+sectionOffset.z;
		//newwp.transform.Translate(-(mysection.Find("pCube1").transform.renderer.bounds.size.x)+1, 0.0f, 0.0f);
		//newwp.transform.position.y = 1.207709;
	}
		for ( i = 0; i < Mwaypoint.length; i++)
	{
		Destroy(Mwaypoint.Shift());
		Destroy(Lwaypoint.Shift());
		Destroy(Rwaypoint.Shift());
	}
}

function Start () {
	curwp = 0;
	middle = true;
	left = false;
	right = false;
	locator = new GameObject();
	sectionOffset = Vector3(0.0f,0.0f,0.0f);
	mysection = Instantiate(currentSection, sectionOffset, transform.rotation);	
	sections.Push(mysection);
	GeneratePoint();
	sectionOffset = Vector3(0.0f, 0.0f, mysection.Find("pCube1").transform.renderer.bounds.size.z);

}

function Update () {

	if (Input.GetKey(KeyCode.UpArrow)) { middle = true; left = false; right = false; }
	if (Input.GetKey(KeyCode.LeftArrow)) { middle = false; left = true; right = false; }
	if (Input.GetKey(KeyCode.RightArrow)) { middle = false; left = false; right = true; }
	if (middle == true)
	{
		if (curwp < Mwaypoint.length)
		{
			var temp:GameObject = Mwaypoint[curwp];
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
	if (curwp == Mwaypoint.length)
	{
			
			mysection = Instantiate(currentSection, sectionOffset, transform.rotation);
			sections.Push(mysection);
			if(sectionOffset.z>120){			
				Destroy(sections.Shift());
			}
			GeneratePoint();
			sectionOffset = Vector3(0.0f, 0.0f, sectionOffset.z + mysection.Find("pCube1").transform.renderer.bounds.size.z);
		curwp=0;				
	}
}

