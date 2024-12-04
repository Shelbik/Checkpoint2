export const isPresentInFavorites = (favorites, restaurantId) => {
    return favorites.some(item => item.id === restaurantId);
};
