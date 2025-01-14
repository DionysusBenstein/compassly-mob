export default getInitials = (name) => {
  let parts = name.split(" ");
  let initials = "";
  for (var i = 0; i < parts.length; i++) {
    if (parts[i].length > 0 && parts[i] !== "") {
      initials += " " + parts[i][0];
    }
  }
  return initials;
};
