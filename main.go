package main

import (
	"github.com/99designs/gqlgen/handler"
	"github.com/Xanonymous-GitHub/thisistodolist/gqlgen"
	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"net/http"
)

func main() {
	router := chi.NewRouter()
	router.Use(middleware.Logger)
	router.Use(middleware.Recoverer)
	router.Post("/query", handler.GraphQL(gqlgen.NewExecutableSchema(gqlgen.Config{Resolvers: &gqlgen.Resolver{}})))
	router.Get("/", handler.Playground("GraphQL playground", "/query"))
	http.ListenAndServe(":8888", router)
}
