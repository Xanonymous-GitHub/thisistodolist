package controller

import (
	"net/http"

	"../model"
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
)

func CheckCookie() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Header("Cache-Control", "no-cache")
		if c.Request.URL.Path == "/login" {
			c.Next()
		}
		username, err := c.Cookie("username")
		if err != nil {
			c.Redirect(301, "/login")
			c.Abort()
			return
		}
		password, err := c.Cookie("password")
		if err != nil {
			c.Redirect(301, "/login")
			c.Abort()
			return
		}
		db, err := gorm.Open("mysql", "wayne:Fuck06050@/todolist?charset=utf8&parseTime=True&loc=Local")
		defer db.Close()

		if err != nil {
			panic("failed to connect database")
		}
		var userinfo model.LoginForm
		if db.Table("userinfo").Where("username = ?", username).First(&userinfo).RecordNotFound() {
			c.SetCookie("username", "", -1, "/", "35.189.167.203", false, true)
			c.SetCookie("password", "", -1, "/", "35.189.167.203", false, true)
			c.String(http.StatusUnauthorized, "user is hasn't register")
			c.Header("Cache-Control", "no-cache")
			c.Redirect(301, "/register")
			c.Abort()
			return
		}
		if userinfo.Password != password {
			c.SetCookie("username", "", -1, "/", "35.189.167.203", false, true)
			c.SetCookie("password", "", -1, "/", "35.189.167.203", false, true)
			c.String(http.StatusUnauthorized, "your password is change")
			c.Header("Cache-Control", "no-cache")
			c.Redirect(301, "/login")
			c.Abort()
			return
		}

		c.Next()
	}
}
