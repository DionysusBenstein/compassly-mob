export default getBehaviorName = (index) => {
  let name = "right";
  switch (index) {
    case 0:
      name = "right";
      break;
    case 1:
      name = "wrong";
      break;
    case 2:
      name = "neutral";
      break;
    default:
      name = "right";
      break;
  }
  return name;
};
