import User from "../user/user.model";

export const generateAdminId = async () => {
  const lastStudent = await User.findOne({ role: "admin" }, { _id: 1, id: 1 })
    .sort({ createdAt: -1 })
    .lean();
  const previousId = lastStudent ? lastStudent.id : null;
  //   console.log("pre", previousId?.substring(2));
  let newId = `A-0001`;
  if (previousId) {
    newId = `A-${(Number(previousId.substring(2)) + 1)
      .toString()
      .padStart(4, "0")}`;
  }
  return newId;
};
