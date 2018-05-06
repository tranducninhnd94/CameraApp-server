// validate dữ liệu đầu vào
var Joi = require("joi");

// example
module.exports = {
  changePassword: {
    body: {
      password: Joi.string().alphanum().required()
    }
  },

  login: {
    body: Joi.object().keys(
      {
        email: Joi.string().email().min(4).max(45).required(),
        password: Joi.string().alphanum().min(4).max(16).required()
      }
    )
  },

  // camera
  createCamera: {
    body: Joi.object().keys(
      {
        name: Joi.string().required(),
        namespace: Joi.string().required(),
        resolution: Joi.string(),
        fileOutput: Joi.string(),
        uri: Joi.string().required(),
        location: Joi.string().required()
      }
    )
  },

  updateCamera: {
    body: Joi.object().keys(
      {
        id: Joi.number().required(),
        name: Joi.string().required(),
        namespace: Joi.string().required(),
        resolution: Joi.string(),
        fileOutput: Joi.string(),
        uri: Joi.string().required(),
        location: Joi.string().required()
      }
    )
  },

  findAllCamera: {
    query: {
      name: Joi.string(),
      uri: Joi.string(),
      location: Joi.string(),
      pageNum: Joi.number().min(0),
      pageSize: Joi.number().min(1)
    }
  },

  getDetailCamera: {
    query: {
      cameraId: Joi.number().required()
    }
  },

  //type
  creatType: {
    body: {
      name: Joi.string().min(3).max(30).required()
    }
  },

  updateType: {
    body: {
      id: Joi.number().required(),
      name: Joi.string().min(3).max(30).required()
    }
  },

  findAllType: {
    query: {
      name: Joi.string().min(3).max(30),
      pageNum: Joi.number().min(0).default(0),
      pageSize: Joi.number().min(1).default(5)
    }
  },

  // product
  createProduct: {
    body: {
      name: Joi.string().min(3).max(30).required(),
      original_price: Joi.number().required(),
      sale_price: Joi.number().required(),
      status: Joi.string().allow("HIDDEN", "SHOW").required().default("SHOW"),
      type: Joi.object().keys(
        {
          id: Joi.number().required(),
          name: Joi.string().required(),
        }
      ),
      images: Joi.array().items(
        Joi.object().keys({
          id: Joi.number().required(),
          path: Joi.string().required(),
          size: Joi.number(),
          mimetype: Joi.string().required(),
          originalname: Joi.string().required(),
          encoding: Joi.string().required(),
          filename: Joi.string().required(),
          priority: Joi.number().default(0),
          created_at: Joi.date(),
          updated_at: Joi.date()
        })
      ),
      description: Joi.string().max(5000).required()
    }
  },
  updateProduct: {
    body: {
      name: Joi.string().min(3).max(30).required(),
      original_price: Joi.number(),
      sale_price: Joi.number(),
      status: Joi.string().allow("HIDDEN", "SHOW").required().default("SHOW"),
      images: Joi.array().items(
        Joi.object().keys({
          id: Joi.number().required(),
          path: Joi.string().required(),
          size: Joi.number(),
          mimetype: Joi.string().required(),
          originalname: Joi.string().required(),
          encoding: Joi.string().required(),
          filename: Joi.string().required(),
          priority: Joi.number().default(0),
          created_at: Joi.date(),
          updated_at: Joi.date()
        })
      ),
      description: Joi.string().max(5000)
    }
  },

  updateStatusProduct: {
    body: {
      status: Joi.string().allow("HIDDEN", "SHOW").required().default("SHOW")
    }
  },

  findAllProduct: {
    query: {
      name: Joi.string().min(3).max(30),
      minPrice: Joi.number().min(1000),
      maxPrice: Joi.number().min(1000),
      status: Joi.string().allow("HIDDEN", "SHOW").default("SHOW"),
      pageNum: Joi.number().min(0).default(0),
      pageSize: Joi.number().min(1).default(5)
    }
  },

  getDetailProduct: {
    query: {
      productId: Joi.number().required()
    }
  },

  deleteProduct: {
    query: {
      arrId: Joi.array().required()
    }
  }
};
