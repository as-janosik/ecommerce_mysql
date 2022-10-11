const router = require('express').Router();
const { Category, Product,ProductTag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll().then(data=>res.json(data))
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findByPk(req.params.id).then(data=>res.json(data))
});

router.post('/', async (req, res) => {
  // create a new category
  Category.create(req.body).then(data=>res.json(data))
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  }).then(data=>res.json(data))

});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    },
  }).then(data=>res.json(data))
});

module.exports = router;
