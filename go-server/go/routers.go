/*
 * Tramvajske stanice
 *
 * API napravljen u sklopu 3. laboratorijske vježbe za predmet Otvoreno Računalstvo. Definira operacije koje nude mogućnosti manipuliranja skupa podataka o tramvajskim stanicama.
 *
 * API version: 1.0.0
 * Generated by: Swagger Codegen (https://github.com/swagger-api/swagger-codegen.git)
 */
package swagger

import (
	"net/http"
	"strings"
	_ "embed"
	"github.com/gorilla/mux"
	"github.com/jackc/pgx/v5"
)

type Route struct {
	Name        string
	Method      string
	Pattern     string
	HandlerFunc http.HandlerFunc
}

type Routes []Route

func NewRouter(conn *pgx.Conn) *mux.Router {
	var routes = Routes{
		Route{
			"Index",
			"GET",
			"/",
			Index,
		},

		Route{
			"StationsGet",
			strings.ToUpper("Get"),
			"/stations",
			StationsGet(conn),
		},

		Route{
			"StationsIdDelete",
			strings.ToUpper("Delete"),
			"/stations/{id}",
			StationsIdDelete,
		},

		Route{
			"StationsIdGet",
			strings.ToUpper("Get"),
			"/stations/{id}",
			StationsIdGet(conn),
		},

		Route{
			"StationsIdPut",
			strings.ToUpper("Put"),
			"/stations/{id}",
			StationsIdPut,
		},

		Route{
			"StationsPost",
			strings.ToUpper("Post"),
			"/stations",
			StationsPost,
		},

		Route{
			"StationsStationIdTramsGet",
			strings.ToUpper("Get"),
			"/stations/{stationId}/trams",
			StationsStationIdTramsGet,
		},

		Route{
			"TramsGet",
			strings.ToUpper("Get"),
			"/trams",
			TramsGet(conn),
		},

		Route{
			"TramsIdDelete",
			strings.ToUpper("Delete"),
			"/trams/{id}",
			TramsIdDelete(conn),
		},

		Route{
			"TramsIdGet",
			strings.ToUpper("Get"),
			"/trams/{id}",
			TramsIdGet(conn),
		},

		Route{
			"TramsIdPut",
			strings.ToUpper("Put"),
			"/trams/{id}",
			TramsIdPut(conn),
		},

		Route{
			"TramsPost",
			strings.ToUpper("Post"),
			"/trams",
			TramsPost(conn),
		},

		Route{
			"TramsTramIdStationsGet",
			strings.ToUpper("Get"),
			"/trams/{id}/stations",
			TramsTramIdStationsGet(conn),
		},
	}

	router := mux.NewRouter().StrictSlash(true)
	
	router.Use(CORS)
	
	for _, route := range routes {
		var handler http.Handler
		handler = route.HandlerFunc
		handler = Logger(handler, route.Name)
		router.
			Methods(route.Method).
			Path(route.Pattern).
			Name(route.Name).
			Handler(handler)
	}
	
    	router.Methods("OPTIONS").HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        	w.Header().Set("Access-Control-Allow-Origin", "*")
        	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
        	w.WriteHeader(http.StatusOK)
    	})

	return router
}

//go:embed swagger.json
var swaggerFile []byte

func Index(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(http.StatusOK)
    w.Write(swaggerFile)
}

func CORS(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        w.Header().Set("Access-Control-Allow-Origin", "*")
        w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
        next.ServeHTTP(w, r)
    })
}


