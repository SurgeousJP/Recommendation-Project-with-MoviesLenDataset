package models

type Movie struct {
	Id                  int     `json:"id" bson:"id"`
	Adult               string  `json:"adult" bson:"adult"`
	Budget              string  `json:"budget" bson:"budget"`
	Genres              string  `json:"genres" bson:"genres"`
	Homepage            string  `json:"homepage" bson:"homepage"`
	OriginalLanguage    string  `json:"original_language" bson:"original_language"`
	Popularity          float64 `json:"popularity" bson:"popularity"`
	PosterPath          string  `json:"poster_path" bson:"poster_path"`
	ProductionCompany   string  `json:"production_company" bson:"production_company"`
	ProductionCountries string  `json:"production_countries" bson:"production_countries"`
	ReleaseDate         string  `json:"release_date" bson:"release_date"`
	Revenue             float64 `json:"revenue" bson:"revenue"`
	Status              string  `json:"status" bson:"status"`
	Tagline             string  `json:"tagline" bson:"tagline"`
	Title               string  `json:"title" bson:"title"`
	VoteAverage         float64 `json:"vote_average" bson:"vote_average"`
	Overview            string  `json:"overview" bson:"overview"`
	VoteCount           int     `json:"vote_count" bson:"vote_count"`
}
