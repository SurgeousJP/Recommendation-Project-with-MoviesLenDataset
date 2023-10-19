package controllers

import (
	"movies_backend/constants"
	"movies_backend/models"
	"movies_backend/services/interfaces"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type MovieController struct {
	MovieService interfaces.MovieService
}

func NewMovieController(movieService interfaces.MovieService) MovieController {
	return MovieController{
		MovieService: movieService,
	}
}

func (mc *MovieController) CreateMovie(ctx *gin.Context) {
	var movie models.Movie
	if err := ctx.ShouldBindJSON(&movie); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	if err := mc.MovieService.CreateMovie(&movie); err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"message": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "Successful"})

}

func (mc *MovieController) CreateMovies(ctx *gin.Context) {
	var movies []*models.Movie
	if err := ctx.ShouldBindJSON(&movies); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	if err := mc.MovieService.CreateMovies(movies); err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"message": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "Successful"})
}

func (mc *MovieController) GetMovie(ctx *gin.Context) {
	movieId, err := strconv.Atoi(ctx.Param("id"))
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}
	movie, _ := mc.MovieService.GetMovie(&movieId)

	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"message": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, movie)
}

func (mc *MovieController) GetMoviesInPage(ctx *gin.Context) {
	pageNumber := ctx.Param("pageNumber")
	pageNumberInt, err := strconv.Atoi(pageNumber)

	if err != nil || int64(pageNumberInt) <= 0 {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": "Invalid page number"})
		return
	}

	moviesPerPage := constants.MOVIES_PER_PAGE

	movies, err := mc.MovieService.GetMoviesInPage(pageNumberInt, moviesPerPage)

	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"message": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, movies)
}

func (mc *MovieController) SearchMovie(ctx *gin.Context) {
	searchWord := ctx.Param("search_word")

	pageNumber := ctx.Param("pageNumber")
	pageNumberInt, err := strconv.Atoi(pageNumber)
	if err != nil || int64(pageNumberInt) <= 0 {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": "Invalid page number"})
		return
	}

	moviesPerPage := (constants.MOVIES_PER_PAGE)

	movies, err := mc.MovieService.SearchMovieInPage(&searchWord, &pageNumberInt, &moviesPerPage)

	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"message": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, movies)
}

func (mc *MovieController) UpdateMovie(ctx *gin.Context) {
	var movie models.Movie

	if err := ctx.ShouldBindJSON(&movie); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	if err := mc.MovieService.UpdateMovie(&movie); err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"message": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "Successful"})
}

func (mc *MovieController) DeleteMovie(ctx *gin.Context) {
	movieId, err := strconv.Atoi(ctx.Param("id"))

	if err != nil || int64(movieId) <= 0 {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": "Invalid movie id"})
		return
	}
	err = mc.MovieService.DeleteMovie(&movieId)

	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"message": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "Successful"})
}

func (mc *MovieController) RegisterMovieRoute(rg *gin.RouterGroup) {
	movieRoute := rg.Group("/movie")
	// The URI must be diffent structure from each other !
	movieRoute.POST("/create", mc.CreateMovie)

	movieRoute.POST("/createMany", mc.CreateMovies)

	movieRoute.GET("/get/:id", mc.GetMovie)

	movieRoute.GET("/get/page/:pageNumber", mc.GetMoviesInPage)

	movieRoute.GET("/search/:search_word/:pageNumber", mc.SearchMovie)

	movieRoute.PATCH("/update", mc.UpdateMovie)

	movieRoute.DELETE("/delete/:id", mc.DeleteMovie)
}
