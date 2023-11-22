package helper

import (
	"fmt"
	"movies_backend/models"
	// "log"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"net/http"
	"os"
	"time"
	// "github.com/joho/godotenv"
)

var (
	secret         *[]byte
	apiKey         *string
	jwtTokenString *string
)

func loadEnvVariables() {
	// err := godotenv.Load()
	// if err != nil {
	// 	log.Fatal("Error loading .env file")
	// }
	temp_secret := []byte(os.Getenv("JWT_SECRET_KEY"))
	secret = &temp_secret
	temp_apiKey := os.Getenv("JWT_API_KEY")
	apiKey = &temp_apiKey
}

func GenerateJWTTokenString(user *models.User) (string, error) {
	/*
		HS256 (HMAC with SHA-256) is a symmetric keyed hashing algorithm that uses one secret key.
		Symmetric means two parties share the secret key.
		The key is used for both generating the signature and validating it.
	*/
	loadEnvVariables()

	token := jwt.New(jwt.SigningMethodHS256)

	claims := token.Claims.(jwt.MapClaims)

	claims["exp"] = time.Now().Add(time.Hour).Unix()
	claims["user"] = user

	tokenStr, err := token.SignedString(*secret)

	if err != nil {
		fmt.Println(err.Error())
		return "", err
	}

	return tokenStr, nil
}

func JWTAuthenticateMiddleware() gin.HandlerFunc {
	loadEnvVariables()

	return func(c *gin.Context) {
		var tokenRequest struct {
			TokenString string `json:"token"`
		}

		if err := c.ShouldBindJSON(&tokenRequest); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid request payload"})
			return
		}

		tokenString := tokenRequest.TokenString
		if tokenString == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "not authorized, missing token"})
			c.Abort()
			return
		}

		token, err := jwt.Parse(tokenString, func(t *jwt.Token) (interface{}, error) {
			_, ok := t.Method.(*jwt.SigningMethodHMAC)
			if !ok {
				return nil, fmt.Errorf("invalid token")
			}
			return []byte(*secret), nil
		})

		if err != nil || !token.Valid {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
			c.Abort()
			return
		}

		claims, _ := token.Claims.(jwt.MapClaims)
		user := claims["user"]
		c.Set("user", user)

		c.Next()
	}
}

func GetJwtToken(c *gin.Context) {
	loadEnvVariables()
	var loginRequest struct {
		User  models.User `json:"user"`
		Token string      `json:"token"`
	}

	if err := c.ShouldBindJSON(&loginRequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid request payload"})
		return
	}

	accessKey := c.GetHeader("Access")
	if accessKey != *apiKey {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "not authorized"})
		return
	}

	token, err := GenerateJWTTokenString(&loginRequest.User)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to create token"})
		return
	}

	c.String(http.StatusOK, token)
	jwtTokenString = &token
}
