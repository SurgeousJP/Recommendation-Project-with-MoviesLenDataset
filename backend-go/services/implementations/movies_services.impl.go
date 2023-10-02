package implementations

import (
	"context"
	"errors"
	"movies_backend/models"
	"movies_backend/services/interfaces"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type MovieServiceImpl struct {
	movieCollection *mongo.Collection
	ctx context.Context
}

func NewMovieService (movieCollection *mongo.Collection, ctx context.Context) interfaces.MovieService{
	return &MovieServiceImpl{
		movieCollection: movieCollection,
		ctx: ctx,
	}
}

func (m *MovieServiceImpl) CreateMovie(movie *models.Movie) error{
	_, err := m.movieCollection.InsertOne(m.ctx, movie)
	return err
}

func (m *MovieServiceImpl) CreateMovies(movies []*models.Movie) error{
	var documents []interface{}
	for _, movie := range movies{
		documents = append(documents, movie)
	}

	_, err := m.movieCollection.InsertMany(m.ctx, documents)
	return err
}

func (m *MovieServiceImpl) GetMovie(movieId *int) (*models.Movie, error){
	var movie *models.Movie
	query := bson.D{bson.E{Key: "id", Value: movieId}}
	err := m.movieCollection.FindOne(m.ctx, query).Decode(&movie)
	return movie, err
}

func (m *MovieServiceImpl) GetMoviesInPage(pageNumber, moviesPerPage int64) ([]*models.Movie, error){
	var moviesInPage []*models.Movie
	options := options.Find().
		SetSkip((pageNumber - 1) * moviesPerPage).
		SetLimit(moviesPerPage)
	
	cursor, err := m.movieCollection.Find(m.ctx, bson.D{{}}, options)

	if err != nil {
		return nil, err
	}
	for cursor.Next(m.ctx){
		var movie models.Movie
		err := cursor.Decode(&movie)
		if err != nil {
			return nil, err
		}
		moviesInPage = append(moviesInPage, &movie)
	}
	if err := cursor.Err(); err != nil {
		return nil, err
	}
	cursor.Close(m.ctx)
	if len(moviesInPage) == 0{
		return nil, errors.New("documents not found")
	}
	return moviesInPage, nil
}
func (m *MovieServiceImpl) UpdateMovie(movie *models.Movie) error{
	filter := bson.D{bson.E{Key: "id", Value: movie.Id}}
	update := bson.D{
		bson.E{Key: "$set", 
		Value: bson.D{
			bson.E{Key: "id", Value: movie.Id},
			bson.E{Key: "adult", Value: movie.Adult},
			bson.E{Key: "budget", Value: movie.Budget},
			bson.E{Key: "genres", Value: movie.Genres},
			bson.E{Key: "homepage", Value: movie.Homepage},
			bson.E{Key: "original_language", Value: movie.OriginalLanguage},
			bson.E{Key: "popularity", Value: movie.Popularity},
			bson.E{Key: "poster_path", Value: movie.PosterPath},
			bson.E{Key: "production_company", Value: movie.ProductionCompany}, 
			bson.E{Key: "production_countries", Value: movie.ProductionCountries},
			bson.E{Key: "release_date", Value: movie.ReleaseDate},
			bson.E{Key: "revenue", Value: movie.Revenue},
			bson.E{Key: "status", Value: movie.Status},
			bson.E{Key: "tagline", Value: movie.Tagline},
			bson.E{Key: "vote_average", Value: movie.VoteAverage},
			bson.E{Key: "title", Value: movie.Title},
			bson.E{Key: "overview", Value: movie.Overview},
			bson.E{Key: "vote_count", Value: movie.VoteCount},
			},
		},
	}
	result, _ := m.movieCollection.UpdateOne(m.ctx, filter, update)
	if result.MatchedCount != 1 {
		return errors.New("no matched document found for update")
	}
	return nil
}
func (m *MovieServiceImpl) DeleteMovie(movieId *int) error{
	filter := bson.D{bson.E{Key: "id", Value: movieId}}
	result, _ := m.movieCollection.DeleteOne(m.ctx, filter)
	if result.DeletedCount != 1{
		return errors.New("no matched document found for delete")
	}
	return nil
}