requirejs.config({
	baseUrl : "http://localhost:9999/",
	paths:{
		"jquery": "scripts/libs/jquery-2.0.3",
		"sw": "scripts/libs/swiper",
		"validate": "scripts/libs/jquery.validate",
		"css": "scripts/libs/css"
	},
	shim:{
		"sw":{
			deps: ["css!styles/swiper.css"]
		}
	}
})