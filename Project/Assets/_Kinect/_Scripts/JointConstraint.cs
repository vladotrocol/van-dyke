using UnityEngine;
using System.Collections;

public class JointConstraint {
	
	public KinectWrapper.Joints joint_a;
	public KinectWrapper.Joints joint_b;
	public Vector3 val;
	public Relations relation;
	public Operators operation;
	
	// constructors
	public JointConstraint() {
	}
	
	public JointConstraint( KinectWrapper.Joints joint_a, KinectWrapper.Joints joint_b ) {
		this.joint_a = joint_a;
		this.joint_b = joint_b;
	}
	
	public JointConstraint( KinectWrapper.Joints joint_a,
							KinectWrapper.Joints joint_b,
							Relations relation,
							Operators operation,
							Vector3 val ) {
		this.joint_a = joint_a;
		this.joint_b = joint_b;
		this.relation = relation;
		this.operation = operation;
		this.val = val;
	}
	
	// joint constraint check
	public bool check() {
		Vector3 ja, jb;
		
		switch (relation) {
		case JointConstraint.Relations.DISTANCE:
			switch (operation) {
			case JointConstraint.Operators.GREATER_THAN:
				return Vector3.Distance(raw_joint_pos[(int)joint_a], raw_joint_pos[(int)joint_b]) > val.x;
			case JointConstraint.Operators.LESS_THAN:
				return Vector3.Distance(raw_joint_pos[(int)joint_a], raw_joint_pos[(int)joint_b]) < val.x;
			default:
				return false;
			}
		case JointConstraint.Relations.COMPONENT_DISTANCE:
			ja = raw_joint_pos[(int)joint_a];
			jb = raw_joint_pos[(int)joint_b];
			
			switch (operation) {
			case JointConstraint.Operators.GREATER_THAN:
				return (ja.x - jb.x) > val.x && (ja.y - jb.y) > val.y && (ja.z - jb.z) > val.z;
			case JointConstraint.Operators.LESS_THAN:
				return (ja.x - jb.x) < val.x && (ja.y - jb.y) < val.y && (ja.z - jb.z) < val.z;
			default:
				return false;
			}
		case JointConstraint.Relations.ABS_COMPONENT_DISTANCE:
			ja = raw_joint_pos[(int)joint_a];
			jb = raw_joint_pos[(int)joint_b];
			
			switch (operation) {
			case JointConstraint.Operators.GREATER_THAN:
				return Math.Abs(ja.x - jb.x) > val.x && Math.Abs(ja.y - jb.y) > val.y && Math.Abs(ja.z - jb.z) > val.z;
			case JointConstraint.Operators.LESS_THAN:
				return Math.Abs(ja.x - jb.x) < val.x && Math.Abs(ja.y - jb.y) < val.y && Math.Abs(ja.z - jb.z) < val.z;
			default:
				return false;
			}
		default:
			return false;
		}
	}
	
	// Needed enumerations for this class.
	// firstly the constraint relation between the two joints. these are always relative to joint a.
	// when comparing to a value, if only one value is needed, it is stored in the x component. if two
	// are needed then they are stored in the x and y component and if 3 are needed then in the x, y and z
	// component.
	public enum Relations {
		DISTANCE,
		COMPONENT_DISTANCE,
		// bro do you even lift?
		ABS_COMPONENT_DISTANCE
	}
	
	// the operators we can use to test the constraint. these are always relative to val. so it is:
	// a-b = val, a-b != val, a-b > val, a-b < val, a-b >= val, a-b <= val.
	public enum Operators {
		EQUAL = 0,
		NOT_EQUAL,
		GREATER_THAN,
		LESS_THAN,
		GREATER_THAN_OR_EQUAL,
		LESS_THAN_OR_EQUAL
	};
}
