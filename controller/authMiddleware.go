package controller

import (
	"context"
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
			ctx := context.WithValue(r.Context(), userContextKey, &name)
			ctx.Value(userContextKey)
			next.ServeHTTP(w, r.WithContext(ctx))
		})
	}
}
func ForContext(ctx context.Context) *string {
	raw, _ := ctx.Value(userContextKey).(*string)
	return raw
}
