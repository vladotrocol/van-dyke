#pragma strict
var Mwaypoint = new Array();
var Lwaypoint = new Array();
var Rwaypoint = new Array();
static var speed : float = 10;
static var curwp : int;
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
if (Mwaypoint.length != 0)
{

}
	for (var i = 0; i < 4; i++)
	{
		Mwaypoint.Push( Instantiate(locator, Vector3(-mysection.transform.renderer.bounds.size.x/2,
		1.207709,((mysection.transform.renderer.bounds.size.z ) / 4)*i+sectionOffset.z), transform.rotation));
		//newwp.transform.position.z = ((mysection.Find("pCube1").transform.renderer.bounds.size.z ) / 4)*i+sectionOffset.z;
		//newwp.transform.Translate(-(mysection.Find("pCube1").transform.renderer.bounds.size.x/2), 0.0f, 0.0f);
		//newwp.transform.position.y = 1.207709;

	}
	for (i = 0; i < 4; i++)
	{
		Rwaypoint.Push(Instantiate(locator, Vector3(-1.0f,
		1.207709,((mysection.transform.renderer.bounds.size.z ) / 4)*i+sectionOffset.z), transform.rotation));
		//newwp.transform.position.z = ((mysection.Find("pCube1").transform.renderer.bounds.size.z ) / 4)*i+sectionOffset.z;
		//newwp.transform.Translate(-1.0f, 0.0f, 0.0f);
		//newwp.transform.position.y = 1.207709;

	}
	for (i = 0; i < 4; i++)
	{
		Lwaypoint.Push(Instantiate(locator, Vector3((-mysection.transform.renderer.bounds.size.x)+1,
		1.207709,((mysection.transform.renderer.bounds.size.z ) / 4)*i+sectionOffset.z), transform.rotation));
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
	InitializeSections();
	curwp = 0;
	middle = true;
	left = false;
	right = false;
	locator = new GameObject();
	sectionOffset = Vector3(0.0f,0.0f,0.0f);
	s = new Section(PrefabSections[0]);
	mysection = Instantiate(s.obj, sectionOffset, transform.rotation);	
	sections.Push(mysection);
	GeneratePoint(mysection);
	sectionOffset = Vector3(0.0f, 0.0f, mysection.transform.renderer.bounds.size.z);
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
			
			mysection = Instantiate(PrefabSections[Random.Range(0,2)], sectionOffset, transform.rotation);
			sections.Push(mysection);
			if(sectionOffset.z>60){			
				Destroy(sections.Shift());
			}
			GeneratePoint(mysection);
			sectionOffset = Vector3(0.0f, 0.0f, sectionOffset.z + mysection.transform.renderer.bounds.size.z); 
			Debug.Log( mysection.transform.renderer.bounds.size.z + "  "+ sectionOffset);
		curwp=0;				
	}
}

