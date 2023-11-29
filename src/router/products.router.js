import { Router } from "express";
import productsModel from "../models/products.js"

const router = Router()

router.get("/", async (req, res) => {
    try {
        const { limit = 2, page = 1, query = {}, sort = -1 } = req.query;
        const sortOrder = sort === "asc" ? 1 : sort === "desc" ? -1 : -1;
        const result = await productsModel.paginate(query, {
            limit, page, sort: ({ price: sortOrder }), lean: true
        })
        const { docs: payload, page: pageM, hasPrevPage, prevPage, hasNextPage, nextPage, totalPages } = result;
        res.render("showProducts", {
            status: "Success",
            payload,
            totalPages,
            prevPage,
            nextPage,
            page: pageM,
            hasPrevPage,
            hasNextPage,
            prevLink: hasPrevPage ? `/api/products/?page=${prevPage}` : null,
            nextLink: hasNextPage ? `/api/products/?page=${nextPage}` : null,
        });
    } catch (e) { res.status(500).send({ status: "Error", message: e.message }); }
})
router.post("/", async (req, res) => {
    try {
        const newProduct = req.body;
        const result = await productsModel.create(newProduct);
        res.send({ status: "Success", payload: result });
    } catch (e) {
        res.status(500).send({ status: "Error", message: e.message });
    }
})
export default router