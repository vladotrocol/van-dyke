#pragma strict

var Mwaypoint : GameObject[];
var Lwaypoint : GameObject[];
var Rwaypoint : GameObject[];
var wps : GameObject[];
static var speed : float = 10;
static var curwp : int;
var middle : boolean;
var left : boolean;
var right: boolean;
/*There will be 3 set paths, Left, Middle and Right, each one needs its own set of waypoints.
To set up a waypoint, create an empty game object and place it where you want the player to move,
name it l, m or r depending on which path it's in and number according to order they'll be traversed.
Waypoints can be assigned here eg: "Mwaypoint[0] = GameObject.FindObjectWithTag("mwaypoint1") but for that every
waypoint needs its own tag.
To make things simpler, initialise the waypoint arrays in the inspector*/


function Start () {
	curwp = 0;
	middle = true;
	left = false;
	right = false;

}

function Update () {

	if (Input.GetKey(KeyCode.UpArrow)) { middle = true; left = false; right = false; }
	if (Input.GetKey(KeyCode.LeftArrow)) { middle = false; left = true; right = false; }
	if (Input.GetKey(KeyCode.RightArrow)) { middle = false; left = false; right = true; }
	if (middle == true)
	{
		if (curwp < Mwaypoint.Length)
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
	rigidbody.velocity = velo;
	}
}
