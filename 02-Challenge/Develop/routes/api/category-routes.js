const router = require('express').Router();
const { Category, Product,ProductTag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try{
  const catAll = await Category.findAll({
    include: [{ model: Product, through: ProductTag, as: "Product"}]
  });
  res.status(500).json(catAll);

  }catch (err){
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try{
    const catByID = await Category.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag, as: "Product"}]
    });
    if(!catByID){
      res.status(404).json({message:'No Category by that id!'});
      return;
    }

    res.status(200).json(catByID);

  }catch(err){
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const catData = await Category.create(req.body);
    res.status(200).json(catData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try{
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData[0]) {
      res.status(404).json({ message: 'No user with this id!' });
      return;
    }
    res.status(200).json(categoryData);

  }catch (err){
    res.status(500).json(err);
  }

});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try{
    const catDelete = await Category.destroy({
      where:{
        id: req.params.id
      }
    });
    if(!catDelete){
      res.status(404).json({message: 'Category not found with that id!'})
      return;
    }
    res.status(200).json(catDelete);

  }catch (err){
    res.status(500).json(err);
  }
});

module.exports = router;
