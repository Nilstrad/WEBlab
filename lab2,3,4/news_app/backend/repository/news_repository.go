package repository

import (
	"context"
	"database/sql"
	"fmt"
	"news_app/models"
)

type NewsRepository interface {
	GetAll(ctx context.Context) ([]models.News, error)
	GetNewsByID(ctx context.Context, id int) (models.News, error)
	Create(ctx context.Context, news models.News) (int, error)
	Update(ctx context.Context, id int, news models.News) error
	Delete(ctx context.Context, id int) error
}

type newsRepository struct {
	db *sql.DB
}

func NewNewsRepository(db *sql.DB) NewsRepository {
	return &newsRepository{db: db}
}

func (r *newsRepository) GetAll(ctx context.Context) ([]models.News, error) {
	query := "SELECT id, title, author, content FROM news"
	rows, err := r.db.QueryContext(ctx, query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var newsList []models.News
	for rows.Next() {
		var news models.News
		if err := rows.Scan(&news.ID, &news.Title, &news.Author, &news.Content); err != nil {
			return nil, err
		}
		newsList = append(newsList, news)
	}

	return newsList, rows.Err()
}

func (r *newsRepository) GetNewsByID(ctx context.Context, id int) (models.News, error) {
	query := `SELECT id, title, author, content FROM news WHERE id = $1`
	row := r.db.QueryRowContext(ctx, query, id)

	var news models.News
	err := row.Scan(&news.ID, &news.Title, &news.Author, &news.Content)
	if err == sql.ErrNoRows {
		return models.News{}, fmt.Errorf("news not found")
	}
	if err != nil {
		return models.News{}, err
	}

	return news, nil
}

func (r *newsRepository) Create(ctx context.Context, news models.News) (int, error) {
	query := "INSERT INTO news (title, author, content) VALUES ($1, $2, $3) RETURNING id"
	var id int
	err := r.db.QueryRowContext(ctx, query, news.Title, news.Author, news.Content).Scan(&id)
	return id, err
}

func (r *newsRepository) Update(ctx context.Context, id int, news models.News) error {
	query := "UPDATE news SET title = $1, author = $2, content = $3 WHERE id = $4"
	_, err := r.db.ExecContext(ctx, query, news.Title, news.Author, news.Content, id)
	return err
}

func (r *newsRepository) Delete(ctx context.Context, id int) error {
	query := "DELETE FROM news WHERE id = $1"
	_, err := r.db.ExecContext(ctx, query, id)
	return err
}
