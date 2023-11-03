package models

type Leaderboard struct{
	UserId int `json:"user_id" bson:"user_id"`
	NumEdits int `json:"num_edits" bson:"num_edits"`
	Name string `json:"name" bson:"name"`
	ProfilePath string `json:"profile_path" bson:"profile_path"`	
}

