const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try{
    const tagAll = await Tag.findAll({
      include: [{ model: Product, through: ProductTag, as: "Product"}]
    });
    res.status(500).json(tagAll);
  
    }catch (err){
      res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try{
    const tagByID = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag, as: "Product"}]
    });
    if(!tagByID){
      res.status(404).json({message:'No Category by that id!'});
      return;
    }

    res.status(200).json(tagByID);

  }catch(err){
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try{
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!tagData[0]) {
      res.status(404).json({ message: 'No tag with this id!' });
      return;
    }
    res.status(200).json(tagData);

  }catch (err){
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try{
    const tagDelete = await Tag.destroy({
      where:{
        id: req.params.id
      }
    });
    if(!tagDelete){
      res.status(404).json({message: 'Tag not found with that id!'})
      return;
    }
    res.status(200).json(tagDelete);

  }catch (err){
    res.status(500).json(err);
  }
});

module.exports = router;
