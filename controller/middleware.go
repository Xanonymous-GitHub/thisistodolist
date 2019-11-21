package controller

import (
	"time"

	"../model"
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
)

func CheckCookie() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Header("Cache-Control", "no-cache")
		if c.Request.URL.Path == "/login" {
			c.Next()
			return
		}
		if c.Request.URL.Path == "/signup" {
			c.Next()
			return
		}
		sessionID, err := c.Cookie("sessionID")
		if err != nil {
			c.Redirect(302, "/login")
			c.Abort()
			return
		}
		db, err := gorm.Open("mysql", "wayne:Fuck06050@/todolist?charset=utf8&parseTime=True&loc=Local")
		defer db.Close()

		if err != nil {
			panic("failed to connect database")
		}
		var session model.SessionMysqlModel
		if db.Table("session").Where("sessionId = ?", sessionID).First(&session).RecordNotFound() {
			c.SetCookie("sessionID", "", -1, "/", "35.189.167.203", false, false)
			c.Redirect(302, "/login")
			c.Abort()
			return
		}
		if session.ClientIP != c.ClientIP() {
			c.SetCookie("sessionID", "", -1, "/", "35.189.167.203", false, false)
			c.Redirect(302, "/login")
			c.Abort()
			return
		}
		diff := time.Now().Sub(session.CreateTime)
		if diff.Seconds() > 1000 {
			c.SetCookie("sessionID", "", -1, "/", "35.189.167.203", false, false)
			c.Redirect(302, "/login")
			c.Abort()
			return
		}
		c.Set("username", session.Username)
		c.Next()
	}
}
