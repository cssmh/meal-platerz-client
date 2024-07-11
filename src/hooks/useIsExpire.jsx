import moment from "moment";
const useIsExpire = (date, time) => {
  const expiredDateTime = moment(`${date} ${time}`, "YYYY-MM-DD hh:mm A");
  const isExpired = moment().isAfter(expiredDateTime);
  return isExpired;
};

export default useIsExpire;
