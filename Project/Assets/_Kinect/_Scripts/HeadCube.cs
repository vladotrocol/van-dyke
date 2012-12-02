using UnityEngine;
using System.Collections;

public class HeadCube : MonoBehaviour {
	
	//KUInterface kui;
	public GameObject head;
	
	// Use this for initialization
	void Start () {
		//this.kui = KUInterface();
		//kui.scaleFactor = 5;
	}
	
	// Update is called once per frame
	void Update () {
		if (Input.GetKey(KeyCode.UpArrow))
			head.transform.Translate(0.0f,0.1f,0.0f);
		else if (Input.GetKey(KeyCode.DownArrow))
			head.transform.Translate(0.0f,-0.1f,0.0f);
		else if (Input.GetKey(KeyCode.LeftArrow))
			transform.Translate(0.1f,0.0f,0.0f);
		else if (Input.GetKey(KeyCode.RightArrow))
			transform.Translate(-0.1f,0.0f,0.0f);
		
		//transform.localPosition = kui.GetJointPos(KinectWrapper.Joints.HAND_LEFT);
		
	}
}
