module.exports = {

    infoCreate: (obj) => {
        return {
            name: obj.name,
            original_price: obj.original_price,
            sale_price: obj.sale_price,
            status: obj.status,
            description: obj.description
        }
    },

    infoUpdate: (obj) => {
        return {
            id: obj.id,
            name: obj.name,
            original_price: obj.original_price,
            sale_price: obj.sale_price,
            status: obj.status,
            description: obj.description
        }
    },

    infoResponse: (obj) => {
        return {
            id: obj.id,
            name: obj.name,
            original_price: obj.original_price,
            sale_price: obj.sale_price,
            status: obj.status,
            description: obj.description,
            images: obj.images,
            create_at: obj.create_at,
            update_at: obj.update_at
        }
    }
}