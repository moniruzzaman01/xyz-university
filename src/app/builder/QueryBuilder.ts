import { Query, FilterQuery } from "mongoose";

class QueryBuilder<T> {
  private queryModel: Query<T[], T>;
  private query: Record<string, unknown>;

  constructor(queryModel: Query<T[], T>, query: Record<string, unknown>) {
    this.queryModel = queryModel;
    this.query = query;
  }

  search(fieldsToBeSeached: string[]) {
    const searchText = this.query.searchParam;
    if (searchText) {
      this.queryModel = this.queryModel.find({
        $or: fieldsToBeSeached.map((field) => {
          return {
            [field]: { $regex: searchText, $options: "i" },
          } as FilterQuery<T>;
        }),
      });
    }
    return this;
  }

  filter() {
    const filter = { ...this.query };
    ["searchParam", "sort", "limit", "page", "fields"].forEach(
      (el) => delete filter[el]
    );
    this.queryModel = this.queryModel.find(filter as FilterQuery<T>);
    return this;
  }

  sort() {
    if (this.query.sort) {
      const sort = (this.query.sort as string).split(",").join(" ");
      this.queryModel = this.queryModel.sort(sort);
    }
    return this;
  }

  pagination() {
    let limit = 10; //default limit no 10
    let page = 0; //default page no 0
    let skip = 0; //default skip 0
    if (this.query.page) page = Number(this.query.page); //set page no from query
    if (this.query.limit) limit = Number(this.query.limit); //set limit no from query
    if (page) skip = (page - 1) * limit; //calculate how many data will be skipped
    this.queryModel = this.queryModel.skip(skip).limit(limit);

    return this;
  }

  projection() {
    let fields = "-__v";
    if (this.query.fields)
      fields = (this.query.fields as string).split(",").join(" ");
    this.queryModel = this.queryModel.select(fields);
    return this;
  }

  build() {
    return this.queryModel;
  }
}

export default QueryBuilder;
