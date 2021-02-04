import bcrypt from 'bcryptjs';
const data = {

    users: [
       { name:'Sneha',
        email:'adc@gmail.com',
        password:bcrypt.hashSync('1234', 8),
        isAdmin: true,
    },
    { name:'TwoSneha',
        email:'ac@gmail.com',
        password:bcrypt.hashSync('234', 8),
        isAdmin: false,
    }
    ],

    products : [
        {
           
            name: 'Black Tee',
            category: 'Shirts',
            image: '/images/image1.jpg',
            price: 120,
            countInStock:2,
            brand:'Nike',
            rating: 5.0,
            numReviews: 10,
            description: 'high quality product',
        },
        {
            
            name: 'Womens Tshirt',
            category: 'Shirts',
            image: '/images/image2.jpg',
            price: 120,
            countInStock:0,
            brand:'Nike',
            rating: 5.0,
            numReviews: 10,
            description: 'high quality product',
        },
        {
           
            name: 'Slim Shirt',
            category: 'Shirts',
            image: '/images/image3.jpg',
            price: 120,
            countInStock:22,
            brand:'Nike',
            rating: 4.0,
            numReviews: 10,
            description: 'high quality product',
        },
        {
          
            name: 'plain Shirt',
            category: 'Shirts',
            image: '/images/image4.jpg',
            price: 120,
            countInStock:2,
            brand:'Nike',
            rating: 3.5,
            numReviews: 10,
            description: 'high quality product',
        },
        {
         
            name: ' Slim Shirt',
            category: 'Shirts',
            image: '/images/image5.jpg',
            price: 120,
            countInStock:12,
            brand:'Nike',
            rating: 2.5,
            numReviews: 10,
            description: 'high quality product',
        }
    ],
}

export default data;