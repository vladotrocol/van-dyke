using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using System;
using System.IO;

public class KinectSkeleton : MonoBehaviour {
	
	public KUInterface kui;
	
	public GameObject skHead;
	public GameObject skHipCenter;
	public GameObject skSpine;
	public GameObject skShoulderCenter;
	public GameObject skLeftShoulder;
	public GameObject skLeftElbow;
	public GameObject skLeftHand;
	public GameObject skRightShoulder;
	public GameObject skRightElbow;
	public GameObject skRightHand;
	
	public string pathJointScalingsFile;
	
	private Dictionary<KinectWrapper.Joints, GameObject> skeleton = new Dictionary<KinectWrapper.Joints, GameObject>();
	private Dictionary<GameObject, KinectWrapper.Joints> inverse_skeleton = new Dictionary<GameObject, KinectWrapper.Joints>();
	
	private Vector3[] game_joint_pos = new Vector3[(int)KinectWrapper.Joints.COUNT];
	private Vector3[] raw_joint_pos = new Vector3[(int)KinectWrapper.Joints.COUNT];
	
	private Vector3[] joint_scalings = new Vector3[(int)KinectWrapper.Joints.COUNT] {
		new Vector3(1,1,1),		// HIP_CENTER
		new Vector3(1,1,1),		// SPINE
		new Vector3(1,1,1),		// SHOULDER_CENTER
		new Vector3(1,1,1),		// HEAD
		new Vector3(1,1,1),	// SHOULDER_LEFT
		new Vector3(1,1,1),	// ELBOW_LEFT
		new Vector3(1,1,1),		// WRIST_LEFT
		new Vector3(1,1,1),	// HAND_LEFT
		new Vector3(1,1,1),	// SHOULDER_RIGHT
		new Vector3(1,1,1),	// ELBOW_RIGHT
		new Vector3(1,1,1),		// WRIST_RIGHT
		new Vector3(1,1,1),	// HAND_RIGHT
		new Vector3(1,1,1),		// HIP_LEFT
		new Vector3(1,1,1),		// KNEE_LEFT
		new Vector3(1,1,1),		// ANKLE_LEFT
		new Vector3(1,1,1),		// FOOT_LEFT
		new Vector3(1,1,1),		// HIP_RIGHT
		new Vector3(1,1,1),		// KNEE_RIGHT
		new Vector3(1,1,1),		// ANKLE_RIGHT
		new Vector3(1,1,1)		// FOOT_RIGHT
	};
	
	// Use this for initialization
	void Start () {
		kui.scaleFactor = 10;
		
		try {
            using (StreamReader sr = new StreamReader(pathJointScalingsFile)) {
                String line = sr.ReadToEnd();
                print(line);
            }
        } catch (Exception e) {
            print("The file could not be read:"+e.Message);
        }
		
		raw_joint_pos[(int)KinectWrapper.Joints.HIP_CENTER] = new Vector3(0.0f, 0.0f, 0.0f);
		game_joint_pos[(int)KinectWrapper.Joints.HIP_CENTER] = new Vector3(0.0f, 0.0f, 0.0f);
		
		if (skHead != null)
			add_skeleton_joint (KinectWrapper.Joints.HEAD, skHead);
		if (skSpine != null)
			add_skeleton_joint (KinectWrapper.Joints.SPINE, skSpine);
		if (skHipCenter != null)
			add_skeleton_joint (KinectWrapper.Joints.HIP_CENTER, skHipCenter);
		if (skShoulderCenter != null)
			add_skeleton_joint (KinectWrapper.Joints.SHOULDER_CENTER, skShoulderCenter);
		
		if (skLeftShoulder != null)
			add_skeleton_joint (KinectWrapper.Joints.SHOULDER_LEFT, skLeftShoulder);
		if (skLeftElbow != null)
			add_skeleton_joint (KinectWrapper.Joints.ELBOW_LEFT, skLeftElbow);
		if (skLeftHand != null)
			add_skeleton_joint (KinectWrapper.Joints.HAND_LEFT, skLeftHand);
		
		if (skRightShoulder != null)
			add_skeleton_joint (KinectWrapper.Joints.SHOULDER_RIGHT, skRightShoulder);
		if (skRightElbow != null)
			add_skeleton_joint (KinectWrapper.Joints.ELBOW_RIGHT, skRightElbow);
		if (skRightHand != null)
			add_skeleton_joint (KinectWrapper.Joints.HAND_RIGHT, skRightHand);
		
		
		print(skeleton[KinectWrapper.Joints.HEAD].name);
	}
	
	private void add_skeleton_joint( KinectWrapper.Joints joint, GameObject obj ) {
		skeleton.Add (joint, obj);
		inverse_skeleton.Add (obj, joint);
	}
	
	// Update is called once per frame
	void Update () {
		
		if (Input.GetKey(KeyCode.UpArrow))
			skRightHand.transform.localPosition = new Vector3(0.0f,1.0f,0.0f);
		else if (Input.GetKey(KeyCode.DownArrow))
			skLeftHand.transform.localPosition = new Vector3(0.0f,-1.0f,0.0f);
		
		for (int i = 0; i < (int)KinectWrapper.Joints.COUNT; i++) {
			raw_joint_pos[i] = kui.GetJointPos((KinectWrapper.Joints)i);
		}
		
		foreach (KeyValuePair<KinectWrapper.Joints, GameObject> joint in skeleton) {			
			switch (joint.Key) {
			case KinectWrapper.Joints.HIP_CENTER:
				//game_joint_pos[(int)joint.Key] = Vector3.Scale(raw_joint_pos[(int)joint.Key],
				//									joint_scalings[(int)joint.Key]);
				break;
			default:
				print (joint.Value.transform.parent.gameObject.name);
				KinectWrapper.Joints parent_joint = inverse_skeleton[joint.Value.transform.parent.gameObject];
				game_joint_pos[(int)joint.Key] = Vector3.Scale((raw_joint_pos[(int)joint.Key] - raw_joint_pos[(int)parent_joint]),
													joint_scalings[(int)joint.Key]);
				break;
			}
			
			if (joint.Key == KinectWrapper.Joints.HAND_RIGHT)
				print ("right hand: "+raw_joint_pos[(int)joint.Key] + " center shoulder: "+raw_joint_pos[(int)KinectWrapper.Joints.ELBOW_RIGHT]);
			
			joint.Value.transform.localPosition = game_joint_pos[(int)joint.Key];
		}
	}
	
	
}
