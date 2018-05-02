// validate dữ liệu đầu vào
var Joi = require("joi");

// example
module.exports = {
  changePassword: {
    body: {
      password: Joi.string()
        .alphanum()
        .required()
    }
  },

  login: {
    body: Joi.object().keys(
      {
        email: Joi.string()
          .email()
          .min(4)
          .max(45)
          .required(),
        password: Joi.string()
          .alphanum()
          .min(4)
          .max(16)
          .required()
      }
    )
  },

  // camera
  createCamera: {
    body: Joi.object().keys(
      {
        uri: Joi.string().required(),
        location: Joi.string().required()
      }
    )
  },

  updateCamera: {
    body: Joi.object().keys(
      {
        id: Joi.number().required(),
        uri: Joi.string().required(),
        location: Joi.string().required()
      }
    )
  },


  // product
  createProduct: {
    body: {
      name: Joi.string()
        .min(3)
        .max(30)
        .required(),

      original_price: Joi.number().required(),

      sale_price: Joi.number().required(),

      status: Joi.string()
        .allow("HIDDEN", "SHOW")
        .required()
        .default("SHOW"),

      images: Joi.array().items(
        Joi.object().keys({
          id: Joi.number().required(),
          path: Joi.string().required(),
          size: Joi.number(),
          mimetype: Joi.string().required(),
          originalname: Joi.string().required(),
          encoding: Joi.string().required(),
          filename: Joi.string().required(),
          is_used: Joi.boolean(),
          priority: Joi.number().default(0),
          created_at: Joi.date(),
          updated_at: Joi.date()
        })
      ),

      description: Joi.string()
        .max(5000)
        .required()
    }
  },
  updateProduct: {
    body: {
      name: Joi.string()
        .min(3)
        .max(30)
        .required(),

      original_price: Joi.number().required(),

      sale_price: Joi.number().required(),

      status: Joi.string()
        .allow("HIDDEN", "SHOW")
        .required()
        .default("SHOW"),

      images: Joi.array().items(
        Joi.object().keys({
          id: Joi.number().required(),
          path: Joi.string().required(),
          size: Joi.number(),
          mimetype: Joi.string().required(),
          originalname: Joi.string().required(),
          encoding: Joi.string().required(),
          filename: Joi.string().required(),
          is_used: Joi.boolean(),
          priority: Joi.number().default(0),
          created_at: Joi.date(),
          updated_at: Joi.date()
        })
      ),

      description: Joi.string()
        .max(5000)
        .required()
    }
  },

  updateStatusProduct: {
    body: {
      status: Joi.string()
        .allow("HIDDEN", "SHOW")
        .required()
        .default("SHOW")
    }
  },

  findAll: {
    query: {
      nameProduct: Joi.string()
        .min(3)
        .max(30),

      status: Joi.string()
        .allow("HIDDEN", "SHOW")
        .default("SHOW")
    }
  }
};
