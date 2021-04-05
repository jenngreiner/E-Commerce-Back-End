const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const tagData = await Tag.findAll(
      {
        include: [
          {
            model: Product,
            attributes: ['id', 'product_name', 'price', 'stock']
          }
        ]
      }
    );
    const tags = tagData.map((tag) => tag.get({ plain: true }));
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const tagData = await Tag.findByPk(req.params.id,
      {
        include: [
          {
            model: Product,
            attributes: ['id', 'product_name', 'price', 'stock']
          }
        ]
      });
    // Include its associated Product data
    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }
        res.status(200).json(tagData);

  } catch (err) {
    res.status(500).json(err);
  }
});

  // create a new tag
router.post('/', async (req, res) => {
  /* req.body should look like this...
    {
      tag_name: "black"
    }
  */
  try {
    const tagData = await Tag.create(req.body)
    res.status(200).json(tagData)
  } catch(err) {
  res.status(400).json(err);
  }
});
  


router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
  const tagData = await Tag.update({
    where: {
      id: req.params.id
    }
  });
  if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }
     res.status(200).json(tagData);

  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
try {
  const tagData = await Tag.destroy({
    where: {
      id: req.params.id
    }
  });
  if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }
     res.status(200).json(tagData);

} catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
