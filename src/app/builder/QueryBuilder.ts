import { FilterQuery, Query } from 'mongoose'

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>
  public query: Record<string, unknown>

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery
    this.query = query
  }

  // Search filter function
  search(searchableFields: string[]) {
    const searchTerm = this?.query?.searchTerm
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>
        ),
      })
    }

    return this
  }

  filter() {
    const queryObj = { ...this.query }

    // Filtering
    const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields']

    excludeFields.forEach((el) => delete queryObj[el])

    // Start to End Date Filter
    if (queryObj.startDate || queryObj.endDate) {
      const createdAtFilter: Record<string, unknown> = {}

      const startDate = queryObj.startDate
        ? new Date(queryObj.startDate as string)
        : null
      const endDate = queryObj.endDate
        ? new Date(queryObj.endDate as string)
        : null

      //  If both are same -> treat as specific date
      if (
        startDate &&
        endDate &&
        startDate.toDateString() === endDate.toDateString()
      ) {
        const startOfDay = new Date(startDate)
        startOfDay.setHours(0, 0, 0, 0)

        const endOfDay = new Date(endDate)
        endOfDay.setHours(23, 59, 59, 999)

        createdAtFilter.$gte = startOfDay
        createdAtFilter.$lte = endOfDay
      } else {
        // ✅ Normal range-based filtering
        if (startDate) createdAtFilter.$gte = startDate
        if (endDate) createdAtFilter.$lte = endDate
      }

      queryObj.createdAt = createdAtFilter
      delete queryObj.startDate
      delete queryObj.endDate
    }

    // Specific date filter
    if (queryObj.specificDate) {
      const start = new Date(queryObj.specificDate as string)
      start.setHours(0, 0, 0, 0) // start of day
      const end = new Date(queryObj.specificDate as string)
      end.setHours(23, 59, 59, 999) // end of day
      queryObj.createdAt = { $gte: start, $lte: end }
      delete queryObj.specificDate
    }

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>)

    return this
  }

  //   sort() {
  //     const sort =
  //       (this?.query?.sort as string)?.split(',')?.join(' ') || '-createdAt'
  //     this.modelQuery = this.modelQuery.sort(sort as string)

  //     return this
  //   }

  sort(defaultSort?: Record<string, 1 | -1>) {
    if (this?.query?.sort) {
      const sort = (this.query.sort as string).split(',').join(' ')
      this.modelQuery = this.modelQuery.sort(sort)
    } else if (defaultSort) {
      this.modelQuery = this.modelQuery.sort(defaultSort)
    } else {
      this.modelQuery = this.modelQuery.sort('-createdAt')
    }
    return this
  }

  paginate() {
    const page = Number(this?.query?.page) || 1
    const limit = Number(this?.query?.limit) || 10
    const skip = (page - 1) * limit

    this.modelQuery = this.modelQuery.skip(skip).limit(limit)

    return this
  }

  fields() {
    const fields =
      (this?.query?.fields as string)?.split(',')?.join(' ') || '-__v'

    this.modelQuery = this.modelQuery.select(fields)
    return this
  }

  async countTotal() {
    const totalQueries = this.modelQuery.getFilter()
    const total = await this.modelQuery.model.countDocuments(totalQueries)
    const page = Number(this?.query?.page) || 1
    const limit = Number(this?.query?.limit) || 10
    const totalPage = Math.ceil(total / limit)

    return {
      page,
      limit,
      total,
      totalPage,
    }
  }
}

export default QueryBuilder
