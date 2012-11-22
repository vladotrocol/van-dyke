#pragma strict

//var Mwaypoint : GameObject[];
var Mwaypoint : GameObject[];
var Lwaypoint : GameObject[];
var Rwaypoint : GameObject[];
static var speed : float = 10;
static var curwp : int;
var middle : boolean;
var left : boolean;
var right: boolean;
var currentSection : GameObject;
var mysection :  GameObject;
var sectionOffset : Vector3;

function GeneratePoint()
{
Mwaypoint = new GameObject[4];
if (Mwaypoint.length != 0)
{
	for (var i = 0; i < Mwaypoint.length; i++)
	{
		Destroy(Mwaypoint[i]);
	}
}
	for (i = 0; i < 4; i++)
	{
		var newwp = new GameObject();
		newwp.transform.position.z = ((mysection.Find("pCube1").transform.renderer.bounds.size.z ) / 4)*i+sectionOffset.z;
		newwp.transform.Translate(-(mysection.Find("pCube1").transform.renderer.bounds.size.x/2), 0.0f, 0.0f);
		newwp.transform.position.y = transform.position.y;
		Mwaypoint[i] = newwp;
	}
	for (i = 0; i < 4; i++)
	{
		newwp = new GameObject();
		newwp.transform.position.z = ((mysection.Find("pCube1").transform.renderer.bounds.size.z ) / 4)*i+sectionOffset.z;
		newwp.transform.Translate(0.0f, 0.0f, 0.0f);
		newwp.transform.position.y = transform.position.y;
		Rwaypoint[i] = newwp;
	}
	for (i = 0; i < 4; i++)
	{
		newwp = new GameObject();
		newwp.transform.position.z = ((mysection.Find("pCube1").transform.renderer.bounds.size.z ) / 4)*i+sectionOffset.z;
		newwp.transform.Translate(-(mysection.Find("pCube1").transform.renderer.bounds.size.x), 0.0f, 0.0f);
		newwp.transform.position.y = transform.position.y;
		Lwaypoint[i] = newwp;
	}
}

function Start () {
	curwp = 0;
	middle = true;
	left = false;
	right = false;
	sectionOffset = Vector3(0.0f,0.0f,0.0f);
	mysection = Instantiate(currentSection, sectionOffset, transform.rotation);	
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
			var next : Vector3 = Mwaypoint[curwp].transform.position;
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
		if (curwp < Lwaypoint.Length)
		{
			next = Lwaypoint[curwp].transform.position;
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
		if (curwp < Rwaypoint.Length)
		{
			next = Rwaypoint[curwp].transform.position;
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
	if (curwp == Mwaypoint.Length)
	{
			mysection = Instantiate(currentSection, sectionOffset, transform.rotation);
			GeneratePoint();
			sectionOffset = Vector3(0.0f, 0.0f, sectionOffset.z + mysection.Find("pCube1").transform.renderer.bounds.size.z);
		curwp=0;				
	}
}
