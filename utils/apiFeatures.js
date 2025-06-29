class ApiFeatures {
  constructor(mongoQuery, queryString) {
    this.mongoQuery = mongoQuery;
    this.queryString = queryString;
    this.paginationResult = {};
  }

  filter() {
    // 1. Filtering
    const queryObj = { ...this.queryString };
    const excludeFields = ["page", "sort", "limit", "fields", "keyword"];
    excludeFields.forEach((el) => delete queryObj[el]);

    // 2. Advanced filtering (gte, gt, lte, lt)
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );
    this.mongoQuery = this.mongoQuery.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.mongoQuery = this.mongoQuery.sort(sortBy);
    } else {
      this.mongoQuery = this.mongoQuery.sort("-createdAt");
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.mongoQuery = this.mongoQuery.select(fields);
    } else {
      this.mongoQuery = this.mongoQuery.select("-__v");
    }
    return this;
  }

  paginate(countDocuments) {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 5;
    const skip = (page - 1) * limit;
    this.mongoQuery = this.mongoQuery.skip(skip).limit(limit);

    const totalPages = Math.ceil(countDocuments / limit) || 1;
    this.paginationResult = {
      currentPage: page,
      limit,
      total: countDocuments,
      numberOfPages: totalPages,
      next: page < totalPages ? page + 1 : null,
      prev: page > 1 ? page - 1 : null,
    };
    return this;
  }

  search(modelName) {
    if (this.queryString.keyword) {
      let query = {};
      if (modelName === 'Products') {
        query.$or = [
          { title: { $regex: this.queryString.keyword, $options: 'i' } },
          { description: { $regex: this.queryString.keyword, $options: 'i' } },
        ];
      } else {
        query = { name: { $regex: this.queryString.keyword, $options: 'i' } };
      }

      this.mongooseQuery = this.mongooseQuery.find(query);
    }
    return this;
  }

  getPaginationResult() {
    return this.paginationResult;
  }
}

module.exports = ApiFeatures;