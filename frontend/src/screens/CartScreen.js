import React from 'react'

export default function CartScreen(props) {
    const productId = props.match.params.id;
    //get qty from url if the props.location.search value doesnt exists make it 1
    const qty = props.location.search ? Number (props.location.search.split('=')[1])
    : 1;
    return (
        <div>
            <h1> Cart Screen </h1>
            <p>ADD TO CART : ProductID:{productId} QTY: {qty}</p>
        </div>
    )
}
