package controllers

import (
	"database/sql"
	"news_app/models"
	"strconv"

	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
)

var DB *sql.DB

func InitializeDatabase(database *sql.DB) {
	DB = database
}

// Получить все новости
// @Summary Get all news
// @Description Get all news articles
// @Tags news
// @Accept  json
// @Produce  json
// @Success 200 {array} models.News
// @Router /api/news [get]
func GetNews(c *gin.Context) {
	query := "SELECT id, title, author, content FROM news"
	rows, err := DB.Query(query)
	if err != nil {
		c.JSON(500, gin.H{"error": "Error fetching news from the database"})
		return
	}
	defer rows.Close()

	var newsList []models.News
	for rows.Next() {
		var news models.News
		if err := rows.Scan(&news.ID, &news.Title, &news.Author, &news.Content); err != nil {
			c.JSON(500, gin.H{"error": "Error scanning news"})
			return
		}
		newsList = append(newsList, news)
	}

	if err := rows.Err(); err != nil {
		c.JSON(500, gin.H{"error": "Error after fetching news"})
		return
	}

	c.JSON(200, newsList)
}

// Создать новость
// @Summary Create a news article
// @Description Create a new news article
// @Tags news
// @Accept  json
// @Produce  json
// @Param title body string true "News Title"
// @Param author body string true "News Author"
// @Param content body string true "News Content"
// @Success 201 {object} models.News
// @Router /api/news/create [post]
func CreateNews(c *gin.Context) {
	var news models.News
	if err := c.ShouldBindJSON(&news); err != nil {
		c.JSON(400, gin.H{"error": "Invalid request payload"})
		return
	}

	if news.Title == "" || news.Author == "" || news.Content == "" {
		c.JSON(400, gin.H{"error": "Missing required fields"})
		return
	}

	query := "INSERT INTO news (title, author, content) VALUES ($1, $2, $3) RETURNING id"
	var newsID int
	err := DB.QueryRow(query, news.Title, news.Author, news.Content).Scan(&newsID)
	if err != nil {
		c.JSON(500, gin.H{"error": "Error saving news to the database"})
		return
	}

	news.ID = newsID
	c.JSON(201, news)
}

// Обновить новость
// @Summary Update an existing news article
// @Description Update an existing news article by ID
// @Tags news
// @Accept  json
// @Produce  json
// @Param id path int true "News ID"
// @Param title body string true "News Title"
// @Param author body string true "News Author"
// @Param content body string true "News Content"
// @Success 200 {object} models.News
// @Router /api/news/update/{id} [put]
func UpdateNews(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil || id == 0 {
		c.JSON(400, gin.H{"error": "Invalid ID format"})
		return
	}

	var news models.News
	if err := c.ShouldBindJSON(&news); err != nil {
		c.JSON(400, gin.H{"error": "Invalid request payload"})
		return
	}

	query := "UPDATE news SET title = $1, author = $2, content = $3 WHERE id = $4"
	_, err = DB.Exec(query, news.Title, news.Author, news.Content, id)
	if err != nil {
		c.JSON(500, gin.H{"error": "Error updating news in the database"})
		return
	}

	news.ID = id
	c.JSON(200, news)
}

// Удалить новость
// @Summary Delete a news article
// @Description Delete a news article by ID
// @Tags news
// @Param id path int true "News ID"
// @Success 200 {string} string "News deleted"
// @Router /api/news/delete/{id} [delete]
func DeleteNews(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil || id == 0 {
		c.JSON(400, gin.H{"error": "Invalid ID format"})
		return
	}

	query := "DELETE FROM news WHERE id = $1"
	result, err := DB.Exec(query, id)
	if err != nil {
		c.JSON(500, gin.H{"error": "Error deleting news from the database"})
		return
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		c.JSON(500, gin.H{"error": "Error getting affected rows"})
		return
	}

	if rowsAffected == 0 {
		c.JSON(404, gin.H{"error": "News not found"})
		return
	}

	c.JSON(200, gin.H{"message": "News deleted"})
}
