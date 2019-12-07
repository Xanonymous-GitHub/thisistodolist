package controller

import (
	"context"
	"github.com/Xanonymous-GitHub/thisistodolist/model"
	"github.com/labstack/echo"
)

func Process(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		ctx := context.WithValue(c.Request().Context(), "EchoContextKey", c)
		c.SetRequest(c.Request().WithContext(ctx))

		cc := &model.CustomContext{c, ctx}

		return next(cc)
	}
}
