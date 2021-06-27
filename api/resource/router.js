// build your `/api/resources` router here
const router = require("express").Router();
const Resources = require("./model");

router.get("/", async (req, res, next) => {
  console.log("Get fired from Resources Router");
  try {
    const resources = await Resources.getAll();
    console.log("resources returned from resources GET request", resources);
    res.status(200).json(resources);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
   const resource = req.body
    try {
        const newResource = await Resources.create(resource)
        res.status(200).json(newResource)
    
    } catch (err){
        next(err)
    }
})

module.exports = router;
