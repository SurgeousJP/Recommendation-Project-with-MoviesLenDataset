package main

import (
	"context"
	"fmt"
	"log"
	"movies_backend/controllers"
	"movies_backend/helper"
	"movies_backend/models"
	"movies_backend/services/implementations"
	"movies_backend/services/interfaces"
	"os"
	"time"

	jwt "github.com/appleboy/gin-jwt/v2"
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

	movieDiscussionCollection *mongo.Collection
	movieDiscussionService    interfaces.MovieDiscussionServices
	// movieDiscussionController controllers.MovieDiscussionController

	ctx         context.Context
	mongoClient *mongo.Client
	identityKey = "userId"
	jwtSecret []byte
)

type login struct {
	Username string `form:"username" json:"username" binding:"required"`
	Password string `form:"password" json:"password" binding:"required"`
}

const (
	NUMBER_OF_SECONDS_IN_ONE_DAY = 86400
	DEFAULT_DATABASE_CODE        = 0
	DEFAULT_PORT                 = "9090"
)

func Init() {
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

	mongoClient, err = mongo.Connect(ctx, mongoConn)
	if err != nil {
		log.Fatal(err)
	}
	if err := mongoClient.Ping(ctx, readpref.Primary()); err != nil {
		log.Fatal(err)
	}

	databaseName = os.Getenv("DB_NAME")

	jwtSecret = []byte(os.Getenv("JWT_SECRET_KEY"))
	fmt.Print(jwtSecret)

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

	movieDiscussionCollection = mongoClient.Database(databaseName).Collection("discussion_movie")
	movieDiscussionService = implementations.NewMovieDiscussionServices(movieDiscussionCollection, ctx)
	// movieDiscussionController = controllers.NewMovieDiscussionController(movieDiscussionService)

	server = gin.Default()
	// Set up CORS (Cross-Origin Resource Sharing)
	server.Use(cors.Default())
	server.SetTrustedProxies(nil)
}

func main() {
	Init()

	// Define the middleware
	authMiddleware, err := jwt.New(&jwt.GinJWTMiddleware{
		Realm:       "validation zone",
		Key:         jwtSecret,
		Timeout:     time.Hour,
		MaxRefresh:  time.Hour,
		IdentityKey: identityKey,
		PayloadFunc: func(data interface{}) jwt.MapClaims {
			if v, ok := data.(*models.User); ok {
				return jwt.MapClaims{
					identityKey: v.UserId,
					// Add other claims as needed
				}
			}
			return jwt.MapClaims{}
		},
		IdentityHandler: func(c *gin.Context) interface{} {
			claims := jwt.ExtractClaims(c)
			return &models.User{
				UserId: int(claims[identityKey].(float64)),
				// Retrieve other claims as needed
			}
		},
		Authenticator: func(c *gin.Context) (interface{}, error) {
			var loginVals login
			if err := c.ShouldBind(&loginVals); err != nil {
				return "", jwt.ErrMissingLoginValues
			}
			username := loginVals.Username
			password := loginVals.Password

			user, err := userController.UserService.GetUserFromUsername(&username)

			if err != nil {
				return nil, jwt.ErrFailedAuthentication
			}

			if username == user.Username && helper.CheckPassword(user.PasswordHash, password) {
				return &models.User{
					UserId:   user.UserId,
					Username: user.Username,
					// Set other user data as needed
				}, nil
			}

			return nil, jwt.ErrFailedAuthentication
		},
		Authorizator: func(data interface{}, c *gin.Context) bool {
			user, _ := c.Get(identityKey)

			if v, ok := data.(*models.User); ok && v.UserId == user.(*models.User).UserId {
				return true
			}
			return false
		},
		Unauthorized: func(c *gin.Context, code int, message string) {
			c.JSON(code, gin.H{
				"code":    code,
				"message": message,
			})
		},
		TokenLookup: "header: Authorization, query: token, cookie: jwt",

		TokenHeadName: "Bearer",

		TimeFunc: time.Now,
	})

	if err != nil {
		log.Fatal("JWT Error:" + err.Error())
	}

	// When you use jwt.New(), the function is already automatically called for checking,
	// which means you don't need to call it again.
	errInit := authMiddleware.MiddlewareInit()

	if errInit != nil {
		log.Fatal("authMiddleware.MiddlewareInit() Error:" + errInit.Error())
	}

	defer mongoClient.Disconnect(ctx)

	serverGroup := os.Getenv("SERVER_GROUP")

	port := os.Getenv("PORT")
	if port == "" {
		port = DEFAULT_PORT
	}

	basePath := server.Group(serverGroup)
	basePath.POST("/login", authMiddleware.LoginHandler)
	basePath.GET("/refresh_token", authMiddleware.RefreshHandler)
	basePath.Use(authMiddleware.MiddlewareFunc())

	movieController.RegisterMovieRoute(basePath)
	keywordController.RegisterKeywordRoute(basePath)
	ratingController.RegisterRatingRoute(basePath)
	crewController.RegisterCrewRoute(basePath)
	castController.RegisterCastRoute(basePath)
	userController.RegisterUserRoute(basePath)
	// movieDiscussionController.RegisterMovieDiscussionRoute(basePath)

	log.Fatal(server.Run(":" + port))
}
