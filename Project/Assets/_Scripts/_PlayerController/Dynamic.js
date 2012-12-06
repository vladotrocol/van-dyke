#pragma strict
//This is the script used to test the section class
//Make sure that the Section 1 Prefab under the_Models/Sections folder with the tag "Section" in the Path scene
var prefabSections = new Array(); //Model Sections (all Section tagged prefabs)
var currentSections = new Array(); //Section Instances (Dynamically added and destroyed)
var init = 0;
var currentSection:int = 3;
var sectionOffset:Vector3 = Vector3(0.0f, 0.0f, 0.0f);
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

function Print(mySection:Section){
	Debug.Log("Section Name: "+mySection.obj.name);
	Debug.Log("Section Position: "+mySection.position);
	Debug.Log("Section Size: "+mySection.size);
	Debug.Log("Number of Waypoints: "+mySection.wp.length);
}

//this function adds all the sections at the beggining of the game;
function AddInitialSections(nr: int){
	var mySection = new Section(prefabSections[0], ("Section0"), Vector3(0.0f, 0.0f, 0.0f), transform.rotation);
	currentSections.Push(mySection);
	for(var i=1;i<nr;i++){
		var nextSection = new Section(prefabSections[0], ("Section"+i), sectionOffset, transform.rotation);
		currentSections.Push(nextSection);
		sectionOffset+=Vector3(0.0f, 0.0f, mySection.size.z);
	}
}

function AddNewSection(s:int){
	Destroy((currentSections.Shift() as Section).obj as GameObject);
	var mySection = new Section(prefabSections[s], ("Section0"), sectionOffset, transform.rotation);
	sectionOffset+=Vector3(0.0f, 0.0f, mySection.size.z);
	currentSections.Push(mySection);
}

public function IsInitialized(){
	return init;
}

public function CurrentSection(){
	return currentSections[currentSection];
}

function Start () {
	InitializeSections();
	AddInitialSections(6);
	init=1;
}

function Update () {

}