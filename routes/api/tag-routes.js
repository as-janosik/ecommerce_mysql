const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll().then(data=>res.json(data))
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data

  Tag.findByPk(req.params.id).then(data=>res.json(data))

});

router.post('/', async (req, res) => {
  // create a new tag

  Tag.create(req.body).then(data=>res.json(data))

});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  }).then(data=>res.json(data))

});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  }).then(data=>res.json(data))

});

module.exports = router;
