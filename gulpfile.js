const gulp = require("gulp");
const http = require("http");
const https = require("https");
const webserver = require("gulp-webserver");
const express = require("express");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const sass = require("gulp-sass");
const csso = require("gulp-csso");
const autoprefixer = require("gulp-autoprefixer");

gulp.task("compileJS", () => {
	gulp.src("src/scripts/**/*.js")
		.pipe(babel({
			presets: ["@babel/env"]
		}))
		.pipe(uglify())
		.pipe(gulp.dest("dist/scripts"))
	gulp.src("src/views/**/*.js")
		.pipe(babel({
			presets: ["@babel/env"]
		}))
		.pipe(uglify())
		.pipe(gulp.dest("dist/views"))
	gulp.src("src/static/**/*").pipe(gulp.dest("dist/static"));
})

gulp.task("compileCSS", () => {
	gulp.src("src/styles/**/*.scss")
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(csso())
		.pipe(gulp.dest("dist/styles"))
})

gulp.task("compileHTML", () => {
	gulp.src("src/views/**/*.html")
		.pipe(gulp.dest("dist/views"))
})

gulp.task("compileIMG",()=>{
	gulp.src("src/static/imgs/*")
		.pipe(gulp.dest("dist/static/imgs"))
})

gulp.task("server", () => {
	//静态资源服务器 : 9999
	gulp.src("dist")
		.pipe(webserver({
			livereload: true,
			port: 9999
		}))
	gulp.watch("src/views/**/*.js", ["compileJS"]);
	gulp.watch("src/scripts/**/*.js", ["compileJS"]);
	gulp.watch("src/styles/**/*.scss", ["compileCSS"]);
	gulp.watch("src/views/**/*.html", ["compileHTML"])

	//接口代理服务
	let app = express();
	app.get("/", (req, res) => {
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.setHeader("Content-Type", "text/plain;charset=utf8");
		res.end("welcome")
	})
	app.get("/home", (req, res) => {
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.setHeader("Content-Type", "text/plain;charset=utf8");
		let proxy = https.request({
			hostname: "www.smartisan.com",
			path: "/product/shop_categories",
			method: "get"
		}, (response) => {
			response.pipe(res);
		});
		proxy.end();
	})
	app.get("/city", (req, res) => {
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.setHeader("Content-Type", "text/plain; charset=utf8");
		let proxy = http.request({
			hostname: "hotel.elong.com",
			path: "/ajax/search/hotsuggest/?cityId=0101&_=1557992324355",
			method: 'get'
		}, (response) => {
			response.pipe(res);
		});
		proxy.end();
	})
	app.listen(8888);
})

gulp.task("build", ["compileJS", "compileCSS", "compileHTML","compileIMG"])