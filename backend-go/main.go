package main

import (
	"context"
	"log"
	"movies_backend/controllers"
	"movies_backend/services/implementations"
	"movies_backend/services/interfaces"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

var (
	server *gin.Engine

	databaseName string

	movieCollection *mongo.Collection
	movieService    interfaces.MovieService
	movieController controllers.MovieController

	keywordCollection *mongo.Collection
	keywordService    interfaces.KeywordService
	keywordController controllers.KeywordController

	ratingCollection *mongo.Collection
	ratingService    interfaces.RatingService
	ratingController controllers.RatingController

	crewCollection *mongo.Collection
	crewService    interfaces.CrewService
	crewController controllers.CrewController

	castCollection *mongo.Collection
	castService    interfaces.CastService
	castController controllers.CastController

	userCollection *mongo.Collection
	userService    interfaces.UserService
	userController controllers.UserController

	ctx         context.Context
	mongoClient *mongo.Client
)

const (
	NUMBER_OF_SECONDS_IN_ONE_DAY = 86400
	DEFAULT_DATABASE_CODE        = 0
	DEFAULT_PORT                 = "9090"
)

func init() {
	ctx = context.TODO()

	// You should load the DB_CONNECTION_STRING, SERVER_GROUP, PORT from your .env environment,
	// set it to fit your usage, you can check it from previous commits for more information

	// Load environment variables from the .env file (in local)
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

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

	databaseName = os.Getenv("DB_NAME")

	movieCollection = mongoClient.Database(databaseName).Collection("movies")
	movieService = implementations.NewMovieService(movieCollection, ctx)
	movieController = controllers.NewMovieController(movieService)

	keywordCollection = mongoClient.Database(databaseName).Collection("keywords")
	keywordService = implementations.NewKeywordService(keywordCollection, ctx)
	keywordController = controllers.NewKeywordController(keywordService)

	ratingCollection = mongoClient.Database(databaseName).Collection("ratings")
	ratingService = implementations.NewRatingService(ratingCollection, ctx)
	ratingController = controllers.NewRatingController(ratingService)

	crewCollection = mongoClient.Database(databaseName).Collection("crews")
	crewService = implementations.NewCrewService(crewCollection, ctx)
	crewController = controllers.NewCrewController(crewService)

	castCollection = mongoClient.Database(databaseName).Collection("casts")
	castService = implementations.NewCastService(castCollection, ctx)
	castController = controllers.NewCastController(castService)

	userCollection = mongoClient.Database(databaseName).Collection("users")
	userService = implementations.NewUserService(userCollection, ctx)
	userController = controllers.NewUserController(userService)

	server = gin.Default()
	// Set up CORS (Cross-Origin Resource Sharing)
	server.Use(cors.Default())
	server.SetTrustedProxies(nil)
}

func main() {
	defer mongoClient.Disconnect(ctx)

	serverGroup := os.Getenv("SERVER_GROUP")

	port := os.Getenv("PORT")
	if port == "" {
		port = DEFAULT_PORT
	}

	basePath := server.Group(serverGroup)

	movieController.RegisterMovieRoute(basePath)
	keywordController.RegisterKeywordRoute(basePath)
	ratingController.RegisterRatingRoute(basePath)
	crewController.RegisterCrewRoute(basePath)
	castController.RegisterCastRoute(basePath)
	userController.RegisterUserRoute(basePath)

	log.Fatal(server.Run(":" + port))
}
