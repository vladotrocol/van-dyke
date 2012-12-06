using System.Collections;
using System.Collections.Generic;
using System;
using System.IO;

using UnityEngine;
using LitJson;

public class Person {
	public string name;
	public int age;
}

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
		new Vector3(1,1,1),		// SHOULDER_LEFT
		new Vector3(1,1,1),		// ELBOW_LEFT
		new Vector3(1,1,1),		// WRIST_LEFT
		new Vector3(1,1,1),		// HAND_LEFT
		new Vector3(1,1,1),		// SHOULDER_RIGHT
		new Vector3(1,1,1),		// ELBOW_RIGHT
		new Vector3(1,1,1),		// WRIST_RIGHT
		new Vector3(1,1,1),		// HAND_RIGHT
		new Vector3(1,1,1),		// HIP_LEFT
		new Vector3(1,1,1),		// KNEE_LEFT
		new Vector3(1,1,1),		// ANKLE_LEFT
		new Vector3(1,1,1),		// FOOT_LEFT
		new Vector3(1,1,1),		// HIP_RIGHT
		new Vector3(1,1,1),		// KNEE_RIGHT
		new Vector3(1,1,1),		// ANKLE_RIGHT
		new Vector3(1,1,1)		// FOOT_RIGHT
	};
	
	private Dictionary<String, Gesture> gestures = new Dictionary<String, Gesture>();
	
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
		
		Gesture left_hand = new Gesture("raise-both-hands");
		left_hand.constraints.Add( new JointConstraint(	KinectWrapper.Joints.HAND_LEFT,
														KinectWrapper.Joints.SHOULDER_LEFT,
														JointConstraint.Relations.COMPONENT_DISTANCE,
														JointConstraint.Operators.GREATER_THAN,
														new Vector3(-10.0f, 1.2f, -10.0f) ) );
		
		left_hand.constraints.Add( new JointConstraint(	KinectWrapper.Joints.HAND_RIGHT,
														KinectWrapper.Joints.SHOULDER_RIGHT,
														JointConstraint.Relations.COMPONENT_DISTANCE,
														JointConstraint.Operators.GREATER_THAN,
														new Vector3(-10.0f, 1.2f, -10.0f) ) );
		
		gestures.Add( "raise-both-hands", left_hand );
		
		int testing = 10;
		write_string_to_file("Assets/_Kinect/writeme.txt", "DAE wonder why litjson doesn't work?");
		
		Person me = new Person();
		me.name = "Daniel Bergmann";
		me.age = 21;
		
		write_string_to_file("Assets/_Kinect/gestures.txt", JsonMapper.ToJson (me));
		
	}
	
	private void add_skeleton_joint( KinectWrapper.Joints joint, GameObject obj ) {
		skeleton.Add (joint, obj);
		inverse_skeleton.Add (obj, joint);
	}
	
	// Update is called once per frame
	void Update () {
		
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
				//print (joint.Value.transform.parent.gameObject.name);
				KinectWrapper.Joints parent_joint = inverse_skeleton[joint.Value.transform.parent.gameObject];
				game_joint_pos[(int)joint.Key] = Vector3.Scale((raw_joint_pos[(int)joint.Key] - raw_joint_pos[(int)parent_joint]),
													joint_scalings[(int)joint.Key]);
				break;
			}
			
			//if (joint.Key == KinectWrapper.Joints.HAND_RIGHT)
			//	print ("right hand: "+raw_joint_pos[(int)joint.Key] + " center shoulder: "+raw_joint_pos[(int)KinectWrapper.Joints.ELBOW_RIGHT]);
			
			joint.Value.transform.localPosition = game_joint_pos[(int)joint.Key];
		}
		
		foreach (KeyValuePair<string, Gesture> pair in gestures) {
			bool active = true;
			
			// check all the joint constraints are true, fail fast on a false joint constraint.
			foreach (JointConstraint constraint in pair.Value.constraints) {
				if ( !check_joint_constraint( constraint ) ) {
					active = false;
					break;
				}
			}
			
			if ( active ) {
				print("active gesture: "+pair.Key);
			}
		}
		
//		if (check_joint_constraint( gestures["test-gesture"].constraints[0] )) {
//			print ("hai guise!");
//		} else {
//			print ("bai :(");
//		}
		
//		print ( "left wrist: "+ raw_joint_pos[(int)KinectWrapper.Joints.HAND_LEFT] +
//				"left shoulder: "+ raw_joint_pos[(int)KinectWrapper.Joints.SHOULDER_LEFT] +
//			"diff: "+(raw_joint_pos[(int)KinectWrapper.Joints.HAND_LEFT].y-raw_joint_pos[(int)KinectWrapper.Joints.SHOULDER_LEFT].y ) +" is "+check_joint_constraint( gestures["test-gesture"].constraints[0] ) );
//		
		
	}
	
	// joint constraint check
	bool check_joint_constraint( JointConstraint constraint ) {
		Vector3 ja, jb;
		
		switch (constraint.relation) {
		case JointConstraint.Relations.DISTANCE:
			switch (constraint.operation) {
			case JointConstraint.Operators.GREATER_THAN:
				return Vector3.Distance(raw_joint_pos[(int)constraint.joint_a], raw_joint_pos[(int)constraint.joint_b]) > constraint.val.x;
			case JointConstraint.Operators.LESS_THAN:
				return Vector3.Distance(raw_joint_pos[(int)constraint.joint_a], raw_joint_pos[(int)constraint.joint_b]) < constraint.val.x;
			default:
				return false;
			}
		case JointConstraint.Relations.COMPONENT_DISTANCE:
			ja = raw_joint_pos[(int)constraint.joint_a];
			jb = raw_joint_pos[(int)constraint.joint_b];
			
			switch (constraint.operation) {
			case JointConstraint.Operators.GREATER_THAN:
				return (ja.x - jb.x) > constraint.val.x && (ja.y - jb.y) > constraint.val.y && (ja.z - jb.z) > constraint.val.z;
			case JointConstraint.Operators.LESS_THAN:
				return (ja.x - jb.x) < constraint.val.x && (ja.y - jb.y) < constraint.val.y && (ja.z - jb.z) < constraint.val.z;
			default:
				return false;
			}
		case JointConstraint.Relations.ABS_COMPONENT_DISTANCE:
			ja = raw_joint_pos[(int)constraint.joint_a];
			jb = raw_joint_pos[(int)constraint.joint_b];
			
			switch (constraint.operation) {
			case JointConstraint.Operators.GREATER_THAN:
				return Math.Abs(ja.x - jb.x) > constraint.val.x && Math.Abs(ja.y - jb.y) > constraint.val.y && Math.Abs(ja.z - jb.z) > constraint.val.z;
			case JointConstraint.Operators.LESS_THAN:
				return Math.Abs(ja.x - jb.x) < constraint.val.x && Math.Abs(ja.y - jb.y) < constraint.val.y && Math.Abs(ja.z - jb.z) < constraint.val.z;
			default:
				return false;
			}
		default:
			return false;
		}
	}
	
	// JSON related functions
	public void write_string_to_file(string path, string str) {
		StreamWriter sw = new StreamWriter(path);
		sw.Write(str);
		sw.Close();
	}
	
	public string read_file_as_string(string path) {
		try {
            using (StreamReader sr = new StreamReader(path)) {
                string contents = sr.ReadToEnd();
                return contents;
            }
        } catch (Exception e) {
            print ("The file could not be read:"+e.Message);
			return "";
        }
	}
	
	
}
