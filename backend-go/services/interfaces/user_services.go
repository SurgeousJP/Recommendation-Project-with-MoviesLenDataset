package interfaces

import "movies_backend/models"

type UserService interface {
	CreateUser(*models.User) error
	GetUser(*int) (*models.User, error)
	UpdateUser(*models.User) error
	DeleteUser(*int) error
	GetUserFromUsername(*string) (*models.User, error)
	GetNewUserId() (int)
}