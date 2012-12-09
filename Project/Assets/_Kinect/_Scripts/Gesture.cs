using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class Gesture {
	public static KinectSkeleton ks = null;
	
	public string name;
	public List<JointConstraint> constraints = new List<JointConstraint>();
	
	// constructors
	public Gesture( string name ) {
		this.name = name;
	}
	
	// check if the gesture is active
	public bool is_active() {
		bool active = true;
			
		// check all the joint constraints are true, fail fast on a false joint constraint.
		foreach (JointConstraint constraint in this.constraints) {
			if ( !constraint.check() ) {
				active = false;
				break;
			}
		}
		
		return active;
	}
}
