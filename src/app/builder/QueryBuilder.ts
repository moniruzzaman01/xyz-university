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
      this.queryModel.find({
        $or: fieldsToBeSeached.map((field) => {
          return {
            [field]: { $regex: searchText, $options: "i" },
          } as FilterQuery<T>;
        }),
      });
    }
    return this;
  }
  build() {
    return this.queryModel;
  }
}

export default QueryBuilder;
