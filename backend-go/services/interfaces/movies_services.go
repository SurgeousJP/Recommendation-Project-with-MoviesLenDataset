package interfaces

import "movies_backend/models"

type MovieService interface {
	CreateMovie(*models.Movie) error
	CreateMovies([]*models.Movie) error
	GetMovie(*int) (*models.Movie, error)
	GetMoviesInPage(int, int) ([]*models.Movie, error)
	SearchMovieInPage(*string, *int, *int) ([]*models.Movie, error)
	UpdateMovie(*models.Movie) error
	DeleteMovie(*int) error
}