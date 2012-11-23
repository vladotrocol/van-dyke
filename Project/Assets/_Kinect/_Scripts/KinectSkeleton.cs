using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class KinectSkeleton : MonoBehaviour {
	
	public KUInterface kui;
	
	public GameObject skHead;
	public GameObject skLeftHand;
	public GameObject skRightHand;
	
	private Dictionary<KinectWrapper.Joints, GameObject> skeleton = new Dictionary<KinectWrapper.Joints, GameObject>();
	
	private Vector3[] game_joint_pos = new Vector3[(int)KinectWrapper.Joints.COUNT];
	private Vector3[] raw_joint_pos = new Vector3[(int)KinectWrapper.Joints.COUNT];
	
	// Use this for initialization
	void Start () {
		//kui = new KUInterface();
		kui.scaleFactor = 8;
		
		raw_joint_pos[(int)KinectWrapper.Joints.HIP_CENTER] = new Vector3(0.0f, 0.0f, 0.0f);
		
		if (skHead != null)
			skeleton.Add (KinectWrapper.Joints.HEAD, skHead);
		if (skLeftHand != null)
			skeleton.Add (KinectWrapper.Joints.HAND_LEFT, skLeftHand);
		if (skRightHand != null)
			skeleton.Add (KinectWrapper.Joints.HAND_RIGHT, skRightHand);
	}
	
	// Update is called once per frame
	void Update () {
		
//		if (Input.GetKey(KeyCode.UpArrow))
//			skHead.transform.Translate(0.0f,0.1f,0.0f);
//		else if (Input.GetKey(KeyCode.DownArrow))
//			skHead.transform.Translate(0.0f,-0.1f,0.0f);
		
		foreach (KeyValuePair<KinectWrapper.Joints, GameObject> joint in skeleton) {
			raw_joint_pos[(int)joint.Key] = kui.GetJointPos(joint.Key);
			
			switch (joint.Key) {
			case KinectWrapper.Joints.HEAD:
			case KinectWrapper.Joints.HAND_RIGHT:
			case KinectWrapper.Joints.HAND_LEFT:
				game_joint_pos[(int)joint.Key] = raw_joint_pos[(int)joint.Key] - raw_joint_pos[(int)KinectWrapper.Joints.HIP_CENTER];
				break;
			}
			
			joint.Value.transform.localPosition = game_joint_pos[(int)joint.Key];
		}
		
		//skHead.transform.localPosition = kui.GetJointPos(KinectWrapper.Joints.HEAD);
		//skLeftHand.transform.localPosition = abs_left_hand - abs_left_elbow;
		//skRightHand.transform.localPosition = abs_right_hand - abs_right_elbow;
		
		//print (abs_right_hand - abs_right_elbow);
		
		//skLeftElbow.transform.localPosition = ;
		//skRightElbow.transform.localPosition = kui.GetJointPos(KinectWrapper.Joints.ELBOW_RIGHT);
	}
}
