export function mapReview(
    review: any
) {
    return {
        id: review.id,

        rating: review.rating,

        comment: review.comment,

        createdAt: review.createdAt,

        updatedAt: review.updatedAt,

        user: review.user
            ? {
                id: review.user.id,
                name: review.user.name,
                image: review.user.image,
            }
            : undefined,

        product: review.product
            ? {
                id: review.product.id,
                name: review.product.name,
                slug: review.product.slug,

                images:
                    review.product.images?.map(
                        (image: any) => ({
                            id: image.id,
                            url: image.url,
                            publicId:
                                image.publicId,
                            position:
                                image.position,
                        })
                    ) ?? [],
            }
            : undefined,
    };
}