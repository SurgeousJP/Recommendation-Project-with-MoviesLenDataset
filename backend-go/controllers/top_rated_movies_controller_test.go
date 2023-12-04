package controllers

import (
	"context"
	"log"
	"movies_backend/services/implementations"
	"movies_backend/services/interfaces"
	"net/http"
	"net/http/httptest"
	"os"
	"testing"

	// "github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	// "github.com/joho/godotenv"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/suite"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

type TopRatedMoviesTestSuite struct{
	suite.Suite
	r *gin.Engine
	TopRatedMoviesCollection *mongo.Collection
	TopRatedMoviesService interfaces.TopRatedMovieServices
	TopRatedMoviesController TopRatedMoviesController
	setUpDone bool
}

func (suite *TopRatedMoviesTestSuite) SetupTest() {
	if suite.setUpDone {
		return
	}

	ctx := context.TODO()
 
	// err := godotenv.Load("../.env")
	// if err != nil {
	// 	log.Fatal("Error loading .env file")
	// }

	// Retrieve the connection string from the environment
	connectionString := os.Getenv("DB_CONNECTION_STRING")

	mongoConn := options.
	Client().
	ApplyURI(connectionString)

	mongoClient, err := mongo.Connect(ctx, mongoConn)
	if err != nil {
		log.Fatal(err)
	}
	if err := mongoClient.Ping(ctx, readpref.Primary()); err != nil {
		log.Fatal(err)
	}
	suite.r = suite.setupRouter()

    suite.TopRatedMoviesCollection = mongoClient.Database(os.Getenv("DB_NAME")).Collection("top_rated_movies")
	suite.TopRatedMoviesService = implementations.NewTopRatedMoviesService(suite.TopRatedMoviesCollection, ctx)
	suite.TopRatedMoviesController = NewTopRatedMoviesController(suite.TopRatedMoviesService)

	suite.setUpDone = true
}

func (suite *TopRatedMoviesTestSuite) setupRouter() *gin.Engine {
	r := gin.New()
	r.GET("/topMovies/get", suite.TopRatedMoviesController.GetTopRatedMovies)
	return r
}

func (suite *TopRatedMoviesTestSuite) TestGetTopRatedMoviesSuccessfully() {
	// Create a fake HTTP request
	req, _ := http.NewRequest("GET", "/topMovies/get", nil)

	// Create a response recorder to record the response
	w := httptest.NewRecorder()

	// Perform the request
	suite.r.ServeHTTP(w, req)

	// Check the response status code
	assert.Equal(suite.T(), http.StatusOK, w.Code)	

}

func TestTopRatedMoviesTestSuite (t *testing.T){
	suite.Run(t, new(TopRatedMoviesTestSuite))
}