// src/utils/staffUtils.js   (optional – or just paste it where needed)
export const renumberStaffIds = (staffArray) => {
  return staffArray.map((item, index) => ({
    ...item,
    id: index + 1
  }));
};