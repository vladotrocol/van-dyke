using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class AnimatedGesture {
	
	public string name;
	private List<Gesture> gestures = new List<Gesture>();
	private List<float> time_offsets = new List<float>();
	private List<float> time_windows = new List<float>();
	
	public Gesture current_gesture = null;
	public float time_offset_remaining = 0.0f;
	public float time_window_remaining = 0.0f;
	
	// constructors
	public AnimatedGesture( string name ) {
		this.name = name;
	}
	
	// add a new gesture keyframe to the end of this animation series.
	public void add_keyframe( Gesture gesture, float window, float offset ) {
		gestures.Add(gesture);
		time_windows.Add(window);
		time_offsets.Add(offset);
		
		if (gestures.Count == 0) {
			current_gesture = gesture;
			time_offset_remaining = offset;
			time_window_remaining = window;
		}
	}
	
	public bool is_active() {
		return false;
	}
}
