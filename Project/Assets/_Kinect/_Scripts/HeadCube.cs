using UnityEngine;
using System.Collections;

public class HeadCube : MonoBehaviour {
	
	KUInterface kui;
	
	// Use this for initialization
	void Start () {
		this.kui = new KUInterface();
		kui.scaleFactor = 5;
	}
	
	// Update is called once per frame
	void Update () {
		//if (Input.GetKey(KeyCode.UpArrow))
		//	transform.Translate(0.0f,1f,0.0f);
		//else if (Input.GetKey(KeyCode.DownArrow))
		//	transform.Translate(0.0f,-1f,0.0f);
		
		transform.localPosition = kui.GetJointPos(KinectWrapper.Joints.HAND_LEFT);
		
	}
}
