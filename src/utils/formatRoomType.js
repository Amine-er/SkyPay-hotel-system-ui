const formatRoomType = (type) => {
  return type.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
};
export default formatRoomType;