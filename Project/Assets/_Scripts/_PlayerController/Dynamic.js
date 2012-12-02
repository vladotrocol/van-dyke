#pragma strict
//This is the script used to test the section class
//Make sure that the Section 1 Prefab under the_Models/Sections folder with the tag "Section" in the Path scene
var prefabSections = new Array(); //Model Sections (all Section tagged prefabs)
var currentSections = new Array(); //Section Instances (Dynamically added and destroyed)

//Add all prefab sections to main array
function InitializeSections(){
	 var temparray = Resources.FindObjectsOfTypeAll(typeof(GameObject)); 
	 var tempp: GameObject;
	 for(var count =0; count<temparray.length; count++){
	 	tempp =  temparray[count] as GameObject;
	 	if(tempp.tag=="Section"){
	 		prefabSections.Push(tempp ); 
	 		Debug.Log(tempp.name);
	 	}
	 }
}

function Start () {
	InitializeSections();
	var mySection = new Section(prefabSections[0],5, "Section1", Vector3(0.0f, 0.0f, 0.0f), transform.rotation);
	Debug.Log(mySection.position);
	Debug.Log(mySection.size);
	Debug.Log(mySection.obj);
	Debug.Log(mySection.obj.name);
	Debug.Log(mySection.wp.length);
	Debug.Log(mySection.wp[1]);
	Debug.Log(mySection.Pair(1).left);
}

function Update () {

}