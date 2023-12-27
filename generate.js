import { faker } from '@faker-js/faker/locale/en';
import * as fs from 'fs';


const randomCategoryList = (n) => {
    if (n <= 0) {
        return [];
    }
    const CategoryList = [];

    Array.from(new Array(n)).forEach(() => {
        const category = {
            id: faker.string.uuid(),
            name: faker.commerce.department(),
            createdAt: faker.date.past(),
            updatedAt: faker.date.recent(),
        }
        CategoryList.push(category);
    })

    return CategoryList;
};


const randomProductList = (categoryList, numberOfProducts) => {
    if (numberOfProducts <= 0) {
        return [];
    }
    const productList = [];

    for (const category of categoryList) {
        Array.from(new Array(numberOfProducts)).forEach(() => {
            const product = {
                categoryId: category.id,
                id: faker.string.uuid(),
                name: faker.commerce.productName(),
                color: faker.color.human(),
                price: faker.commerce.price(),
                description: faker.commerce.productDescription(),
                createdAt: faker.date.past(),
                updatedAt: faker.date.recent(),
                thumbnailUrl: faker.image.url(400, 400)
            }
            productList.push(product)
        })
        
    }
    return productList;
};



(() => {

    const categoryList = randomCategoryList(5);
    const productList = randomProductList(categoryList,10);
    const db = {
        categories: categoryList,
        products: productList,
        profile: {
            name: "Po"
        },
    };

    fs.writeFile('db.json', JSON.stringify(db), () => {
        console.log("Generate data successfully =))");
    });

})();

