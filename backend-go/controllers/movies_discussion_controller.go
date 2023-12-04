package controllers

import (
	"movies_backend/constants"
	"movies_backend/models"
	"movies_backend/services/interfaces"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type MovieDiscussionController struct {
	MovieDiscussionServices interfaces.MovieDiscussionServices
}

func NewMovieDiscussionController(movieDiscussionService interfaces.MovieDiscussionServices) MovieDiscussionController {
	return MovieDiscussionController{
		MovieDiscussionServices: movieDiscussionService,
	}
}

func (mc *MovieDiscussionController) CreateMovieDiscussion(ctx *gin.Context) {
	var movieDiscussion models.MovieDiscussion
	if err := ctx.ShouldBindJSON(&movieDiscussion); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	if err := mc.MovieDiscussionServices.CreateMovieDiscussion(&movieDiscussion); err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"message": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "Successful"})
}

func (mc *MovieDiscussionController) GetMovieDiscussion(ctx *gin.Context) {
	discussionId, err := strconv.Atoi(ctx.Param("id"))
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}
	movieDiscussion, err := mc.MovieDiscussionServices.GetMovieDiscussion(&discussionId)

	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"message": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, movieDiscussion)
}
func (mc *MovieDiscussionController) GetMovieDiscussionsByMovieId(ctx *gin.Context) {
	movieId, err := strconv.Atoi(ctx.Param("movie_id"))
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	movieDiscussions, err := mc.MovieDiscussionServices.GetMovieDiscussionsByMovieId(&movieId)
	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"message": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, movieDiscussions)
}

func (mc *MovieDiscussionController) GetMovieDiscussionsByUserId(ctx *gin.Context) {
	userId, err := strconv.Atoi(ctx.Param("user_id"))
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	movieDiscussions, err := mc.MovieDiscussionServices.GetMovieDiscussionsByUserId(&userId)
	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"message": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, movieDiscussions)
}

func (mc *MovieDiscussionController) UpdateMovieDiscussion(ctx *gin.Context) {
	var movieDiscussion models.MovieDiscussion

	if err := ctx.ShouldBindJSON(&movieDiscussion); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	if err := mc.MovieDiscussionServices.UpdateMovieDiscussion(&movieDiscussion); err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"message": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "Successful"})
}

func (mc *MovieDiscussionController) DeleteMovieDiscussion(ctx *gin.Context) {
	discussionId, err := strconv.Atoi(ctx.Param("id"))

	if err != nil || int64(discussionId) <= 0 {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": "Invalid movie id"})
		return
	}
	err = mc.MovieDiscussionServices.DeleteMovieDiscussion(&discussionId)

	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"message": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "Successful"})
}

func (mc *MovieDiscussionController) CreateMovieDiscussionPart(ctx *gin.Context) {

	discussionId, err := strconv.Atoi(ctx.Param("discussion_id"))
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	var discussionPart models.DiscussionPart
	if err := ctx.ShouldBindJSON(&discussionPart); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	if err := mc.MovieDiscussionServices.CreateMovieDiscussionPart(&discussionPart, &discussionId); err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"message": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "Successful"})
}

func (mc *MovieDiscussionController) GetMovieDiscussionPartInPage(ctx *gin.Context) {
	discussionId, err := strconv.Atoi(ctx.Param("discussion_id"))

	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	pageNumber := ctx.Param("pageNumber")
	pageNumberInt, err := strconv.Atoi(pageNumber)

	if err != nil || int64(pageNumberInt) <= 0 {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": "Invalid page number"})
		return
	}

	partsPerPage := constants.DISCUSSION_PART_PER_PAGE

	parts, err := mc.MovieDiscussionServices.GetMovieDiscussionPartInPage(pageNumberInt, partsPerPage, &discussionId)

	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"message": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, parts)
}

func (mc *MovieDiscussionController) UpdateMovieDiscussionPart(ctx *gin.Context) {
	var updatedPart models.DiscussionPart
	discussionId, _ := strconv.Atoi(ctx.Param("discussion_id"))
	partId, err := strconv.Atoi(ctx.Param("part_id"))

	if err != nil || int64(discussionId) <= 0 || int64(partId) <= 0 {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": "Invalid discussion or part id"})
		return
	}

	if err := ctx.ShouldBindJSON(&updatedPart); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	err = mc.MovieDiscussionServices.UpdateMovieDiscussionPart(&discussionId, &partId, &updatedPart)

	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"message": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "Successful"})
}

func (mc *MovieDiscussionController) DeleteMovieDiscussionPart(ctx *gin.Context) {
	discussionId, _ := strconv.Atoi(ctx.Param("discussion_id"))
	partId, err := strconv.Atoi(ctx.Param("part_id"))

	if err != nil || int64(discussionId) <= 0 || int64(partId) <= 0 {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": "Invalid discussion or part id"})
		return
	}

	err = mc.MovieDiscussionServices.DeleteMovieDiscussionPart(&discussionId, &partId)

	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"message": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "Successful"})
}

func (mc *MovieDiscussionController) RegisterMovieDiscussionRoute(rg *gin.RouterGroup) {
	movieDiscussionRoute := rg.Group("/movieDiscussion")
	// The URI must be diffent structure from each other !
	movieDiscussionRoute.POST("/create", mc.CreateMovieDiscussion)

	movieDiscussionRoute.GET("/get/:id", mc.GetMovieDiscussion)

	movieDiscussionRoute.PATCH("/update", mc.UpdateMovieDiscussion)

	movieDiscussionRoute.DELETE("/delete/:id", mc.DeleteMovieDiscussion)

	movieDiscussionRoute.GET("/getByMovie/:movie_id", mc.GetMovieDiscussionsByMovieId)

	movieDiscussionRoute.GET("/getByUser/:user_id", mc.GetMovieDiscussionsByUserId)

	movieDiscussionRoute.PATCH("/create/part/:discussion_id", mc.CreateMovieDiscussionPart)

	movieDiscussionRoute.GET("/get/part/:discussion_id/:pageNumber", mc.GetMovieDiscussionPartInPage)

	movieDiscussionRoute.PATCH("/update/part/:discussion_id/:part_id", mc.UpdateMovieDiscussionPart)

	movieDiscussionRoute.PATCH("/delete/part/:discussion_id/:part_id", mc.DeleteMovieDiscussionPart)
}
