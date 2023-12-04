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

type MovieDiscussionServicesImpl struct {
	movieDiscussionCollection *mongo.Collection
	ctx                       context.Context
}

func NewMovieDiscussionServices(movieDiscussionCollection *mongo.Collection, ctx context.Context) interfaces.MovieDiscussionServices {
	return &MovieDiscussionServicesImpl{
		movieDiscussionCollection: movieDiscussionCollection,
		ctx:                       ctx,
	}
}

func (m *MovieDiscussionServicesImpl) CreateMovieDiscussion(movieDiscussion *models.MovieDiscussion) error {
	_, err := m.movieDiscussionCollection.InsertOne(m.ctx, movieDiscussion)
	return err
}

func (m *MovieDiscussionServicesImpl) GetMovieDiscussion(movieDiscussionId *int) (*models.MovieDiscussion, error) {
	var movieDiscussion *models.MovieDiscussion
	query := bson.D{bson.E{Key: "discussion_id", Value: movieDiscussionId}}
	err := m.movieDiscussionCollection.FindOne(m.ctx, query).Decode(&movieDiscussion)
	return movieDiscussion, err
}
func (m *MovieDiscussionServicesImpl) GetMovieDiscussionsByMovieId(movieId *int) ([]*models.MovieDiscussion, error) {
	var movieDiscussions []*models.MovieDiscussion

	query := bson.D{bson.E{Key: "movie_id", Value: movieId}}
	cursor, err := m.movieDiscussionCollection.Find(m.ctx, query)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(m.ctx)

	for cursor.Next(m.ctx) {
		var movieDiscussion *models.MovieDiscussion
		if err := cursor.Decode(&movieDiscussion); err != nil {
			return nil, err
		}
		movieDiscussions = append(movieDiscussions, movieDiscussion)
	}

	if err := cursor.Err(); err != nil {
		return nil, err
	}

	return movieDiscussions, nil
}
//------------------------------------------------------------
func (m *MovieDiscussionServicesImpl) GetMovieDiscussionsByUserId(userId *int) ([]*models.MovieDiscussion, error) {
	var movieDiscussions []*models.MovieDiscussion
	query := bson.M{
		"discussion_part.user_id": userId,
	}
	cursor, err := m.movieDiscussionCollection.Find(m.ctx, query)
	
	if err != nil {
		return nil, err
	}
	defer cursor.Close(m.ctx)

	for cursor.Next(m.ctx) {
		var movieDiscussion *models.MovieDiscussion
		if err := cursor.Decode(&movieDiscussion); err != nil {
			return nil, err
		}
		movieDiscussions = append(movieDiscussions, movieDiscussion)
	}

	if err := cursor.Err(); err != nil {
		return nil, err
	}

	return movieDiscussions, nil
}
//----------------------------------------------------------

func (m *MovieDiscussionServicesImpl) UpdateMovieDiscussion(movieDiscussion *models.MovieDiscussion) error {
	filter := bson.D{bson.E{Key: "discussion_id", Value: movieDiscussion.DiscussionId}}
	update := bson.D{
		bson.E{Key: "$set",
			Value: bson.D{
				bson.E{Key: "subject", Value: movieDiscussion.Subject},
				bson.E{Key: "status", Value: movieDiscussion.Status},
				bson.E{Key: "discussion_part", Value: movieDiscussion.DiscussionPart},
			},
		},
	}
	result, _ := m.movieDiscussionCollection.UpdateOne(m.ctx, filter, update)
	if result.MatchedCount != 1 {
		return errors.New("no matched document found for update")
	}
	return nil
}

func (m *MovieDiscussionServicesImpl) DeleteMovieDiscussion(movieDiscussionId *int) error {
	filter := bson.D{bson.E{Key: "discussion_id", Value: movieDiscussionId}}
	result, _ := m.movieDiscussionCollection.DeleteOne(m.ctx, filter)
	if result.DeletedCount != 1 {
		return errors.New("no matched document found for delete")
	}
	return nil
}

func (m *MovieDiscussionServicesImpl) CreateMovieDiscussionPart(discussionPart *models.DiscussionPart, discussionId *int) error {

	filter := bson.M{"discussion_id": discussionId}
	update := bson.M{
		"$push": bson.M{"discussion_part": discussionPart},
	}
	_, err := m.movieDiscussionCollection.UpdateOne(m.ctx, filter, update)
	return err
}

func (m *MovieDiscussionServicesImpl) GetMovieDiscussionPartInPage(pageNumber int, partPerPage int, discussionId *int) ([]*models.DiscussionPart, error) {
	var partsInPage []*models.DiscussionPart

	filter := bson.M{"discussion_id": discussionId}

	projection := bson.M{"discussion_parts": bson.M{"$slice": []interface{}{(pageNumber - 1) * partPerPage, partPerPage}}}

	result := m.movieDiscussionCollection.FindOne(m.ctx, filter, options.FindOne().SetProjection(projection))
	if result.Err() != nil {
		return nil, result.Err()
	}

	var movieDiscussion models.MovieDiscussion
	if err := result.Decode(&movieDiscussion); err != nil {
		return nil, err
	}

	for _, part := range movieDiscussion.DiscussionPart {
		partsInPage = append(partsInPage, &part)
	}

	if len(partsInPage) == 0 {
		return nil, errors.New("documents not found")
	}

	return partsInPage, nil
}

func (m *MovieDiscussionServicesImpl) UpdateMovieDiscussionPart(discussionId *int, partId *int, updatedPart *models.DiscussionPart) error {
	filter := bson.M{
		"discussion_id":           discussionId,
		"discussion_part.part_id": partId,
	}

	update := bson.M{
		"$set": bson.M{
			"discussion_part.$": updatedPart,
		},
	}

	result, err := m.movieDiscussionCollection.UpdateOne(m.ctx, filter, update)
	if err != nil {
		return err
	}

	if result.MatchedCount != 1 {
		return errors.New("no matched document found for update")
	}

	return nil
}

func (m *MovieDiscussionServicesImpl) DeleteMovieDiscussionPart(discussionId *int, partId *int) error {
	filter := bson.M{
		"discussion_id":           discussionId,
		"discussion_part.part_id": partId,
	}

	update := bson.M{
		"$pull": bson.M{
			"discussion_part": bson.M{"part_id": partId},
		},
	}

	result, err := m.movieDiscussionCollection.UpdateOne(m.ctx, filter, update)
	if err != nil {
		return err
	}

	if result.MatchedCount != 1 {
		return errors.New("no matched document found for delete")
	}

	return nil
}
