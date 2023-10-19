const productModel = require('../models/product.model');
// Import the product model.

let ProductModel = require('../models/product.model');
// Import the product model again; this line is redundant and can be removed.

module.exports.save = async (req, res) => {
    // Save a new product based on the request body.
    const product = new ProductModel(req.body);
    // Create a new product instance.

    let result = await product.save();
    // Save the product to the database and await the result.
    res.json(result);
    // Send the result as JSON response.
}

module.exports.update = async (req, res) => {
    // Update a product by its ID.
    let result = await productModel.findOneAndUpdate(req.params.id, req.body);
    // Find and update the product in the database.
    res.json(result);
    // Send the result as JSON response.
}

module.exports.findById = async (req, res) => {
    const id = req.query.id;
    // Get the product ID from the request query.

    let result = await ProductModel.findById(id);
    // Find a product by its ID in the database.
    res.json(result);
    // Send the result as JSON response.
}

module.exports.find = async (req, res) => {
    if (req.query.name) {
        // If a 'name' parameter is provided in the request query.

        ProductModel.find({ name: { $regex: new RegExp(req.query.name), $options: "i" }})
            .then(data => {
                // Use a regular expression to search for products by name case-insensitively.
                res.send(data);
                // Send the search results as a response.
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving tutorials."
                });
            });
    } else {
        // If no 'name' parameter is provided in the request query.

        let result = await ProductModel.find(req.params);
        // Find and retrieve all products in the database.
        res.json(result);
        // Send the result as JSON response.
    }
}

module.exports.deleteById = async (req, res) => {
    const id = req.query.id;
    // Get the product ID from the request query.

    let result = await ProductModel.deleteOne({ _id: id });
    // Delete the product with the specified ID from the database.
    res.json(result);
    // Send the deletion result as a JSON response.
}

module.exports.deleteAll = async (req, res) => {
    let result = await ProductModel.deleteMany();
    // Delete all products in the database.
    res.json(result);
    // Send the deletion result as a JSON response.
}
