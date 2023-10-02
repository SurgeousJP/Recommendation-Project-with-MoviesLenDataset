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
	server            *gin.Engine
	movieCollection   *mongo.Collection
	movieService      interfaces.MovieService
	movieController   controllers.MovieController

	keywordCollection *mongo.Collection
	keywordService    interfaces.KeywordService
	keywordController controllers.KeywordController

	ctx               context.Context
	mongoClient       *mongo.Client
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

	movieCollection = mongoClient.Database(os.Getenv("DB_NAME")).Collection("movies")
	movieService = implementations.NewMovieService(movieCollection, ctx)
	movieController = controllers.NewMovieController(movieService)

	keywordCollection = mongoClient.Database(os.Getenv("DB_NAME")).Collection("keywords")
	keywordService = implementations.NewKeywordService(keywordCollection, ctx)
	keywordController = controllers.NewKeywordController(keywordService)

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

	log.Fatal(server.Run(":" + port))
}
