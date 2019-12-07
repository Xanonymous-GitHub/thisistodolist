package model

import (
	"context"
	"github.com/labstack/echo"
)

type CustomContext struct {
	echo.Context
	ctx context.Context
}
