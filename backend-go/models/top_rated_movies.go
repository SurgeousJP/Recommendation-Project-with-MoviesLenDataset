package models

type TopRatedMovies struct{
	MovieId int `json:"movie_id" bson:"movie_id"`
	Title string `json:"title" bson:"title"`
	PosterPath string `json:"poster_path" bson:"poster_path"`
	AvgRate float64 `json:"avg_rate" bson:"avg_rate"`
	ReleaseDate string `json"release_date" bson:"release_date"`
}