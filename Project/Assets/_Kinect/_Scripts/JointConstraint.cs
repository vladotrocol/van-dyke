using UnityEngine;
using System.Collections;

public class JointConstraint {
	
	public KinectWrapper.Joints joint_a;
	public KinectWrapper.Joints joint_b;
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
							Operators operation ) {
		this.joint_a = joint_a;
		this.joint_b = joint_b;
		this.relation = relation;
		this.operation = operation;
	}
	
	// Needed enumerations for this class.
	// firstly the constraint relation between the two joints. these are always relative to joint a.
	public enum Relations {
		DISTANCE,
		COMPONENT_DISTANCE
	}
	
	// the operators we can use to test the constraint. these are always relative to joint a. so it is:
	// a = b, a != b, a > b, a < b, a >= b, a <= b.
	public enum Operators {
		EQUAL = 0,
		NOT_EQUAL,
		GREATER_THAN,
		LESS_THAN,
		GREATER_THAN_OR_EQUAL,
		LESS_THAN_OR_EQUAL
	};
}
