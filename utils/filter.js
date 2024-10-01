const AppError = require("./appError");

module.exports = (req, next) => {
  const { filter, startDate, endDate } = req.query;

  if (!filter && !startDate && !endDate) {
    return {};
  }

  //make sure filter and the custom dates are not passed together
  if (filter && (startDate || endDate)) {
    return next(
      new AppError(
        `You can only use either "filter" alone, or "startDate" and "endDate" together`,
        400,
      ),
    );
  }
  //make sure filter is not more than one
  if (filter && Array.isArray(filter)) {
    return next(
      new AppError(
        `Conflicting filters: You can only use one filter at a time`,
        400,
      ),
    );
  }

  let start, end;

  //make sure startDate and endDate are passed together
  if ((startDate && !endDate) || (!startDate && endDate)) {
    return next(
      new AppError(
        `invalid query, you should use "startDate" and "endDate" together`,
        400,
      ),
    );
  }

  if (startDate && endDate) {
    start = new Date(startDate);
    end = new Date(endDate);
    const query = { date: { $gte: start, $lte: end } };
    return query;
  }

  if (filter === "lastWeek") {
    start = new Date();
    start.setDate(start.getDate() - 7);
    end = new Date();
  } else if (filter === "lastMonth") {
    start = new Date();
    start.setMonth(start.getMonth() - 1);
    end = new Date();
  } else if (filter === "last3Months") {
    start = new Date();
    start.setMonth(start.getMonth() - 3);
    end = new Date();
  } else {
    return next(new AppError("Invalid filter", 400));
  }

  const query = { date: { $gte: start, $lte: end } };

  return query;
};
