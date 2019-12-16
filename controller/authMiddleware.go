package controller

import (
	"context"
	"github.com/Xanonymous-GitHub/thisistodolist/model"
	prisma "github.com/Xanonymous-GitHub/thisistodolist/prisma/client"
	"net/http"
)

var userContextKey = "konodioda"

type addcookieResponseWriter struct {
	http.ResponseWriter
	cookieValue string
}

func Auth(db *prisma.Client) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			addcookieResponse := addcookieResponseWriter{w, ""}
			ip, _ := GetIP(r)
			token, err := r.Cookie("sessionID")
			if err != nil || token == nil {
				detail := model.AuthDetail{IP: ip, Token: &addcookieResponse.cookieValue}
				ctx := context.WithValue(r.Context(), userContextKey, detail)
				next.ServeHTTP(&addcookieResponse, r.WithContext(ctx))
				return
			}
			var session *prisma.Session
			session, err = db.Session(prisma.SessionWhereUniqueInput{Token: &token.Value}).Exec(r.Context())
			if err != nil || session == nil {
				http.SetCookie(&addcookieResponse, &http.Cookie{MaxAge: -1, Name: "sessionID"})
				http.Redirect(&addcookieResponse, r, "/signin", 302)
				return
			}
			name := session.Username

			detail := model.AuthDetail{Username: &name, IP: ip, Token: &addcookieResponse.cookieValue}
			ctx := context.WithValue(r.Context(), userContextKey, detail)
			next.ServeHTTP(&addcookieResponse, r.WithContext(ctx))
		})
	}
}
func ForContext(ctx context.Context) model.AuthDetail {
	raw, _ := ctx.Value(userContextKey).(model.AuthDetail)
	return raw
}
func (w *addcookieResponseWriter) Write(b []byte) (int, error) {
	if w.cookieValue != "" {
		http.SetCookie(w, &http.Cookie{
			Name:     "sessionID",
			Value:    w.cookieValue,
			HttpOnly: false,
			Path:     "/",
			Domain:   "0.0.0.0",
		})
	}
	return w.ResponseWriter.Write(b)
}
