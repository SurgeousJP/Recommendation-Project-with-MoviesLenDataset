package interfaces

import "movies_backend/models"

type KeywordService interface {
	CreateKeyword(*models.Keyword) error
	GetKeyword(*int) (*models.Keyword, error)
	UpdateKeyword(*models.Keyword) error
	DeleteKeyword(*int) error
}