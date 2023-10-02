package interfaces

import "movies_backend/models"

type CrewService interface {
	CreateCrew(*models.Crew) error
	GetCrew(*int) (*models.Crew, error)
	UpdateCrew(*models.Crew) error
	DeleteCrew(*int) error
}
