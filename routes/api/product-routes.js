const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  Product.findAll(
    {
      include: [Category,
        {
          model: Tag, through: ProductTag
        }],
    }
  ).then(data => res.json(data))

});

// get one product
router.get('/:id', async (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  Product.findByPk(req.params.id,
    {
      include: [Category,
        {
          model: Tag, through: ProductTag
        }],
    }
  ).then(data => res.json(data))

});

// create new product
router.post('/', (req, res) => {

  Product.create(req.body).then(data => res.json(data))


});

// update product
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  }).then(data=>res.json(data))

});

router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
  Product.destroy({
    where: {
      id: req.params.id,
    },
  }).then(data => res.json(data))
});

module.exports = router;
