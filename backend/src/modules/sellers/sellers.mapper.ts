export function mapSellerProfile(seller: any) {
  return {
    id: seller.id,
    storeName: seller.storeName,
    description: seller.description,
    phone: seller.phone,
    logo: seller.logo,
    status: seller.status,

    productCount: seller._count?.products ?? 0,

    createdAt: seller.createdAt,
    updatedAt: seller.updatedAt,
  };
}