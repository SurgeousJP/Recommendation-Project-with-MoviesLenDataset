package interfaces

import "movies_backend/models"

type TopRatedMovieServices interface {
	GetTopRatedMovies() ([]*models.TopRatedMovies, error)
}