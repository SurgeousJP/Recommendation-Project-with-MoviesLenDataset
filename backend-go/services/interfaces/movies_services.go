package interfaces

import "movies_backend/models"

type MovieService interface {
	CreateMovie(*models.Movie) error
	CreateMovies([]*models.Movie) error
	GetMovie(*int) (*models.Movie, error)
	GetMoviesInPage(int64, int64) ([]*models.Movie, error)
	UpdateMovie(*models.Movie) error
	DeleteMovie(*int) error
}