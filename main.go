package main

import (
	"github.com/99designs/gqlgen/handler"
	"github.com/Xanonymous-GitHub/thisistodolist/controller"
	"github.com/Xanonymous-GitHub/thisistodolist/graphql"
	"github.com/Xanonymous-GitHub/thisistodolist/graphql/reslover"
	prisma "github.com/Xanonymous-GitHub/thisistodolist/prisma/client"
	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"net/http"
)

func main() {
	client := prisma.New(nil)
	var resolver = &reslover.Resolver{
		Prisma: client,
	}
	router := chi.NewRouter()
	router.Use(controller.Auth(client))
	router.Use(middleware.Logger)
	router.Use(middleware.Recoverer)
	router.Post("/query", handler.GraphQL(graphql.NewExecutableSchema(graphql.Config{Resolvers: resolver})))
	router.Get("/", handler.Playground("GraphQL playground", "/query"))
	http.ListenAndServe(":8888", router)
}
