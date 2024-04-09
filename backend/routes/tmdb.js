import mediaController from "../controllers/media_controller.js";
import express from "express";

const router = express.Router({ mergeParams: true });

router.get("/search", mediaController.search);

router.get("/genres", mediaController.getGenres);

router.get("/detail/:mediaId", mediaController.getDetail);

router.get("/:mediaCategory", mediaController.getList);

export default router;