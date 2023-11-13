package controllers

import (
	"movies_backend/helper"
	"movies_backend/models"
	"movies_backend/services/interfaces"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type UserController struct {
	UserService interfaces.UserService
}

func NewUserController(userService interfaces.UserService) UserController {
	return UserController{
		UserService: userService,
	}
}

func (uc *UserController) CreateUser(ctx *gin.Context) {
	var user models.User
	if err := ctx.ShouldBindJSON(&user); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	if user.UserId == 0 || user.Username == "" || user.PasswordHash == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": "wrong input structure"})
		return
	}
	hashPassword, err := helper.HashPassword(user.PasswordHash)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": "failed to hash the password"})
	}
	user.PasswordHash = hashPassword

	if err := uc.UserService.CreateUser(&user); err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"message": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "Successful"})
}

func (uc *UserController) GetUser(ctx *gin.Context) {
	userId, err := strconv.Atoi(ctx.Param("id"))
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}
	user, err := uc.UserService.GetUser(&userId)

	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"message": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, user)
}

func (uc *UserController) UpdateUser(ctx *gin.Context) {
	var user models.User

	if err := ctx.ShouldBindJSON(&user); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	if user.UserId == 0 || user.Username == "" || user.PasswordHash == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": "wrong input structure"})
		return
	}

	if err := uc.UserService.UpdateUser(&user); err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"message": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "Successful"})
}

func (uc *UserController) DeleteUser(ctx *gin.Context) {
	userId, err := strconv.Atoi(ctx.Param("id"))

	if err != nil || int64(userId) <= 0 {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": "Invalid movie id"})
		return
	}
	err = uc.UserService.DeleteUser(&userId)

	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"message": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "Successful"})
}

func (uc *UserController) Login(ctx *gin.Context) {
	var loginRequest struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}

	if err := ctx.ShouldBindJSON(&loginRequest); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": "Invalid request payload"})
		return
	}

	// Get the password hash from database
	user, err := uc.UserService.GetUserFromUsername(&loginRequest.Username)

	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"message": "username not found !"})
	}
	// Assuming you have a helper function to hash and compare passwords
	isValidPassword := helper.CheckPassword(user.PasswordHash, loginRequest.Password)
	if !isValidPassword {
		ctx.JSON(http.StatusUnauthorized, gin.H{"message": "Invalid password"})
		return
	}

	// Assuming you have a helper function to generate JWT token
	token, err := helper.GenerateJWTTokenString(user)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to create token"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"token": token, "user": user})
}

func (uc *UserController) protectedFunction(ctx *gin.Context) {
	user, _ := ctx.Get("user")
    ctx.JSON(http.StatusOK, gin.H{"message": "Access granted for user", "user": user})
}


func (uc *UserController) RegisterUserRoute(rg *gin.RouterGroup) {
	userRoute := rg.Group("/user")
	// The URI must be diffent structure from each other !
	userRoute.POST("/create", uc.CreateUser)

	userRoute.GET("/login", uc.Login)

	userRoute.GET("/authenticateUser", helper.JWTAuthenticateMiddleware(), uc.protectedFunction)

	userRoute.GET("/get/:id", uc.GetUser)

	userRoute.PATCH("/update", uc.UpdateUser)

	userRoute.DELETE("/delete/:id", uc.DeleteUser)
}
