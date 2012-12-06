using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class Gesture {
	
	public string name;
	public List<JointConstraint> constraints = new List<JointConstraint>();
	
	// constructors
	public Gesture( string name ) {
		this.name = name;
	}
}
