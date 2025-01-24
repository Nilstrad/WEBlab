package models

type News struct {
	ID      int    `json:"id"`
	Title   string `json:"title" binding:"required,min=3,max=100"`
	Author  string `json:"author"`
	Content string `json:"content" binding:"min=10"`
}
