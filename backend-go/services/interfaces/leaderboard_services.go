package interfaces

import "movies_backend/models"

type LeaderboardServices interface {
	GetLeaderboard() ([]*models.Leaderboard, error)
}