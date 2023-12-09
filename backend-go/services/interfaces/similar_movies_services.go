package interfaces

import "movies_backend/models"

type SimilarMoviesServices interface {
	GetSimilarMovies(*int) (*models.SimilarMovies, error)
}