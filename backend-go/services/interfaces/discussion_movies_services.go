package interfaces

import "movies_backend/models"

type MovieDiscussionServices interface {
	CreateMovieDiscussion(*models.MovieDiscussion) error
	GetMovieDiscussion(*int) (*models.MovieDiscussion, error)
	GetMovieDiscussionsByMovieId(*int) ([]*models.MovieDiscussion, error)
	GetMovieDiscussionsByUserId(*int) ([]*models.MovieDiscussion, error)
	UpdateMovieDiscussion(*models.MovieDiscussion) error
	DeleteMovieDiscussion(*int) error
	CreateMovieDiscussionPart(*models.DiscussionPart, *int) error
	GetMovieDiscussionPartInPage(int, int, *int) ([]*models.DiscussionPart, error)
	UpdateMovieDiscussionPart(*int, *int, *models.DiscussionPart) error
	DeleteMovieDiscussionPart(*int, *int) error
}
