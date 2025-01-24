package main

import (
	"fmt"
	"log"
	db "news_app/config"
	"news_app/controllers"
	"news_app/repository"
	"news_app/routes"
	"news_app/service"

	"github.com/gin-gonic/gin"
	"github.com/golang-migrate/migrate/v4"
	_ "github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	_ "github.com/lib/pq"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

func main() {
	err := db.LoadEnvVariables()
	if err != nil {
		log.Fatalf("Ошибка при загрузке .env файла: %v", err)
	}

	err = db.Connect()
	if err != nil {
		log.Fatalf("Ошибка подключения к базе данных: %v", err)
	}
	defer db.DB.Close()

	err = migrateDatabase()
	if err != nil {
		log.Fatalf("Ошибка применения миграций: %v", err)
	}

	repo := repository.NewNewsRepository(db.DB)
	svc := service.NewNewsService(repo)
	ctrl := controllers.NewNewsController(svc)

	r := gin.Default()

	r.Use(func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
		c.Header("Access-Control-Allow-Headers", "Content-Type, Authorization")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	})

	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	routes.RegisterRoutes(r, ctrl)

	fmt.Println("Сервер запущен на порту :8080")
	if err := r.Run(":8080"); err != nil {
		log.Fatalf("Не удалось запустить сервер: %v", err)
	}
}

func migrateDatabase() error {
	m, err := migrate.New(
		"file://migrations",
		fmt.Sprintf("postgres://%s:%s@%s/%s?sslmode=%s",
			db.GetEnvVariable("DB_USER"),
			db.GetEnvVariable("DB_PASSWORD"),
			db.GetEnvVariable("DB_HOST"),
			db.GetEnvVariable("DB_NAME"),
			db.GetEnvVariable("DB_SSLMODE"),
		),
	)
	if err != nil {
		return fmt.Errorf("ошибка создания миграции: %v", err)
	}

	if err := m.Up(); err != nil && err.Error() != "no change" {
		log.Printf("Ошибка применения миграции: %v", err)
		if err := m.Down(); err != nil && err.Error() != "no change" {
			return fmt.Errorf("ошибка отката миграции: %v", err)
		}
		return fmt.Errorf("ошибка применения миграции и отката: %v", err)
	}

	fmt.Println("Миграции выполнены успешно")
	return nil
}
