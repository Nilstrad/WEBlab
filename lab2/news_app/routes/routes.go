package routes

import (
	"net/http"
	"news_app/controllers"

	"github.com/gin-gonic/gin"
)

func RegisterRoutes(router *gin.Engine) {
	router.Static("/static", "./static")

	router.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.html", nil)
	})

	router.GET("/create-news", func(c *gin.Context) {
		c.HTML(http.StatusOK, "create-news.html", nil)
	})

	router.GET("/update-news", func(c *gin.Context) {
		c.HTML(http.StatusOK, "update-news.html", nil)
	})

	router.GET("/delete-news", func(c *gin.Context) {
		c.HTML(http.StatusOK, "delete-news.html", nil)
	})

	router.GET("/view-news", func(c *gin.Context) {
		c.HTML(http.StatusOK, "view-news.html", nil)
	})

	router.GET("/api/news", controllers.GetNews)
	router.POST("/api/news/create", controllers.CreateNews)
	router.PUT("/api/news/update/:id", controllers.UpdateNews)
	router.DELETE("/api/news/delete/:id", controllers.DeleteNews)
}
