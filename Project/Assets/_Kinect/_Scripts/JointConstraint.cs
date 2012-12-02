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
