export function mapUserProfile(user: any) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    image: user.image,
    emailVerified: user.emailVerified,

    sellerProfile: user.sellerProfile
      ? {
          id: user.sellerProfile.id,
          storeName: user.sellerProfile.storeName,
          description: user.sellerProfile.description,
          phone: user.sellerProfile.phone,
          logo: user.sellerProfile.logo,
          status: user.sellerProfile.status,
        }
      : null,

    addresses: user.addresses.map((address: any) => ({
      id: address.id,
      label: address.label,
      fullName: address.fullName,
      phone: address.phone,

      city: address.city,
      subCity: address.subCity,
      woreda: address.woreda,
      kebele: address.kebele,
      street: address.street,
      landmark: address.landmark,

      latitude: address.latitude
        ? Number(address.latitude)
        : null,

      longitude: address.longitude
        ? Number(address.longitude)
        : null,

      isDefault: address.isDefault,
    })),
  };
}