import createError from "http-errors";
import express from "express";
import fileUpload from "express-fileupload";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";

import { NODE_ENV } from "./config";

// ****************************************************************************
// 										              Endpoints
// ****************************************************************************




// ****************************************************************************
// 										           Inicio de App
// ****************************************************************************

const app = express();

app.use(cors());

if (NODE_ENV !== "production") app.use(logger("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: "./uploads",
		debug: NODE_ENV !== "production",
	})
);

// ****************************************************************************
// 										              Endpoints api
// ****************************************************************************



app.use("/uploads", express.static(path.join(path.resolve(), "/uploads")));

app.get("/", (_req, res) => {
	res.send("API is running....");
});

// catch 404 and forward to error handler
app.use((_req, _res, next) => next(createError(404)));

// error handler
app.use((err: any, req: any, res: any) => {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.json({ error: err });
});

export default app;
