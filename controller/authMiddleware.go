package controller

import (
	"context"
	"github.com/Xanonymous-GitHub/thisistodolist/model"
	prisma "github.com/Xanonymous-GitHub/thisistodolist/prisma/client"
	"net/http"
)

var userContextKey = "konodioda"

func Auth(db *prisma.Client) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			//token, err := r.Cookie("session")
			/*if err != nil || token == nil {
				next.ServeHTTP(w, r)
				return
			}*/
			//var session *prisma.Session
			//session,err=db.Session(prisma.SessionWhereUniqueInput{Token:&token.Value}).Exec(r.Context())
			/*if err!=nil{
				http.Error(w,"Token error",http.StatusForbidden)
			}*/
			//ctx:=context.WithValue(r.Context(),userContextKey,session.Username)
			name := "wayne"
			ip, _ := GetIP(r)
			detail := model.AuthDetail{Username: &name, IP: ip}
			ctx := context.WithValue(r.Context(), userContextKey, detail)
			next.ServeHTTP(w, r.WithContext(ctx))
			if r.Context().Value("token") != nil {
				cookie := &http.Cookie{Name: "session", Value: r.Context().Value("token").(string), HttpOnly: false}
				http.SetCookie(w, cookie)
			}
		})
	}
}
func ForContext(ctx context.Context) model.AuthDetail {
	raw, _ := ctx.Value(userContextKey).(model.AuthDetail)
	return raw
}
