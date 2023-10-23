package models

type MovieDiscussion struct {
	DiscussionId             int      `json:"discussion_id" bson:"discussion_id"`
	MovieId int `json:"movie_id" bson:"movie_id"`
	Subject        string    `json:"subject" bson:"subject"`
	Status         bool      `json:"status" bson:"status"`
	DiscussionPart []DiscussionPart  `json:"discussion_part" bson:"discussion_part"`
}