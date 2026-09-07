export function mapOrder(order: any) {
    return {
        id: order.id,

        status: order.status,

        subtotal: Number(
            order.subtotal
        ),

        deliveryFee: Number(
            order.deliveryFee
        ),

        total: Number(
            order.total
        ),

        customerNote:
            order.customerNote,

        address: order.address
            ? {
                id:
                    order.address.id,
                label:
                    order.address.label,
                fullName:
                    order.address.fullName,
                phone:
                    order.address.phone,
                city:
                    order.address.city,
                subCity:
                    order.address.subCity,
                woreda:
                    order.address.woreda,
                kebele:
                    order.address.kebele,
                street:
                    order.address.street,
                landmark:
                    order.address.landmark,
            }
            : null,

        items:
            order.items.map(
                (item: any) => ({
                    id: item.id,

                    productId:
                        item.productId,

                    productName:
                        item.productName,

                    productImage:
                        item.productImage,

                    quantity:
                        item.quantity,

                    unitPrice:
                        Number(
                            item.unitPrice
                        ),

                    totalPrice:
                        Number(
                            item.totalPrice
                        ),
                })
            ),

        createdAt:
            order.createdAt,

        updatedAt:
            order.updatedAt,
    };
}