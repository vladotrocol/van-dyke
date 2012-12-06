#pragma strict
var dy:Dynamic;
var playerSpeed = 10;
var pos:Vector3;
var obja : GameObject;

function ComputePairMean(pair: PathPair){
	return (pair.left+pair.right)/2;
}

function Start () {
	obja = GameObject.FindGameObjectWithTag("Player");
	var dy : Dynamic = obja.GetComponent(typeof(Dynamic)) as Dynamic;
	transform.position = (ComputePairMean((dy.CurrentSection() as Section).Pair(1)));
}
var count =1;
function Update () {
	var dy : Dynamic = obja.GetComponent(typeof(Dynamic)) as Dynamic;
	if(dy.IsInitialized()){
		var distance:float = Vector3.Distance(transform.position, (ComputePairMean((dy.CurrentSection() as Section).Pair(count))));
		if(distance>0){
    		transform.position = Vector3.Lerp (
	  		transform.position, ComputePairMean((dy.CurrentSection() as Section).Pair(count)),
    		Time.deltaTime* playerSpeed/distance);
		}
		else
		{
			pos = ComputePairMean((dy.CurrentSection() as Section).Pair(count));
			if(count<dy.currentSections.length-1){
				count++;
			}
			else{
				count = 1;
				dy.AddNewSection(Random.Range(0,2));
			}
		}
	}
}