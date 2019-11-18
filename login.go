package main

import (
	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
)

type LoginForm struct {
	User     string `form:"user" gorm : "column : username"`
	Password string `form:"password" gorm : "column : password" `
}

func checkErr(err error) {
	if err != nil {
		panic(err)
	}
}

func main() {
	router := gin.Default()
	router.Delims("[[", "]]")
	router.LoadHTMLGlob("./*.html")

	router.GET("/login", func(c *gin.Context) {
		c.HTML(200, "login.html", nil)
	})

	router.POST("/login", func(c *gin.Context) {
		username := c.PostForm("user")
		password := c.PostForm("password")

		db, err := gorm.Open("mysql", "entroy:G122367136@/test_database")
		defer db.Close()

		if err != nil {
			panic("failed to connect database")
		}

		db.Table("login").Where("username = ? password = ?", username, password)
		checkErr(err)

		if err != nil {
			c.HTML(404, "login.html", nil)
		} else {
			c.HTML(200, "login.html", nil)
		}
	})
	router.POST("/register", func(c *gin.Context) {
		db, err := gorm.Open("mysql", "entroy:G122367136@/test_database")
		defer db.Close()

		if err != nil {
			panic("failed to connect database")
		}
		var newuser LoginForm
		newuser.User = c.PostForm("user")
		newuser.Password = c.PostForm("password")
		db.Create(&newuser)
		c.HTML(200, "login.html", nil)
	})
	router.Run(":8080")
}
