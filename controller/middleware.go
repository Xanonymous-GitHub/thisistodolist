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
		if c.Request.URL.Path == "/signin" || c.Request.URL.Path == "/signup" {
			sessionID, err := c.Cookie("sessionID")
			if err != nil {
				c.Next()
				return
			}
			db, err := gorm.Open("mysql", "wayne:Fuck06050@/todolist?charset=utf8&parseTime=True&loc=Local")
			defer db.Close()

			if err != nil {
				panic("failed to connect database")
			}
			var session model.SessionMysqlModel
			if db.Table("session").Where("sessionId = ?", sessionID).First(&session).RecordNotFound() {
				c.SetCookie("sessionID", "", -1, "/", "trusaidlin.tk", false, false)
				c.Next()
				return
			}
			if session.ClientIP != c.ClientIP() {
				c.SetCookie("sessionID", "", -1, "/", "trusaidlin.tk", false, false)
				c.Next()
				return
			}
			diff := time.Now().Sub(session.CreateTime)
			if diff.Seconds() > 1000 {
				c.SetCookie("sessionID", "", -1, "/", "trusaidlin.tk", false, false)
				c.Next()
				return
			}
			c.Redirect(302, "/todolist")
			c.Abort()
			return
		}

		sessionID, err := c.Cookie("sessionID")
		if err != nil {
			c.Redirect(302, "/signin")
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
			c.SetCookie("sessionID", "", -1, "/", "trusaidlin.tk", false, false)
			c.Redirect(302, "/signin")
			c.Abort()
			return
		}
		if session.ClientIP != c.ClientIP() {
			c.SetCookie("sessionID", "", -1, "/", "trusaidlin.tk", false, false)
			c.Redirect(302, "/signin")
			c.Abort()
			return
		}
		diff := time.Now().Sub(session.CreateTime)
		if diff.Seconds() > 1000 {
			c.SetCookie("sessionID", "", -1, "/", "trusaidlin.tk", false, false)
			c.Redirect(302, "/signin")
			c.Abort()
			return
		}
		c.Set("username", session.Username)
		c.Next()
	}
}
