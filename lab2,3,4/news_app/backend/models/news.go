package models

type News struct {
	ID      int    `json:"id"`
	Title   string `json:"title" binding:"required,min=3,max=100"`
	Author  string `json:"author" binding:"required,min=3,max=50"`
	Content string `json:"content" binding:"min=10"`
}
