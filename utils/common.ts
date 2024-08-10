import type {
  CategoryRecord,
  ProductOption,
  SelectedFilter,
} from "~/types/products";

export function parseQueryString(queryString: string) {
  const params = new URLSearchParams(queryString);
  const result: { [key: string]: string } = {};

  for (const [key, value] of params.entries()) {
    const match = key.match(/\[([^\]]+)\]/);
    if (match) {
      const innerKey = match[1];
      const finalKey = innerKey === "v2_categories" ? "categories" : innerKey;

      if (result[finalKey]) {
        result[finalKey] += `,${value}`;
      } else {
        result[finalKey] = value;
      }
    }
  }
  return result;
}

export function objectToQueryString(obj: any) {
  const queryStringParts = [];
  if (!obj || !Object.values(obj).length) return undefined;
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (key !== "page") {
        const filterKey = key === "categories" ? "v2_categories" : key;
        queryStringParts.push(`filter[${filterKey}]=${obj[key]}`);
      }
    }
  }

  return queryStringParts.join("&");
}

export function filtersToQueryObj(filters: SelectedFilter[]) {
  return filters.reduce<{ [key: string]: string[] }>((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = [];
    }
    acc[item.type].push(item.id.toString());

    return acc;
  }, {});
}

export function getSelectedFilters(
  categoryFilters: CategoryRecord[],
  options: ProductOption[],
  initialQuery: any,
) {
  const result: SelectedFilter[] = [];

  for (const [type, value] of Object.entries(initialQuery)) {
    const ids = value as string;
    const idArray = ids.split(",");
    if (type === "options") {
      idArray.forEach((id) => {
        options.forEach((element) => {
          const item = element.option_values.find(
            (i) => i.id.toString() === id,
          );
          if (item) {
            result.push({
              type,
              title: item.title,
              id: item.id,
              value: item.value,
            });
          }
        });
      });
    } else if (type === "categories") {
      idArray.forEach((id) => {
        const item = categoryFilters.find((element) => element.id === id);
        if (item) {
          result.push({
            type,
            title: item.title,
            id: item.id,
          });
        }
      });
    } else if (type === "max_price" || type === "min_price") {
      if (!result.find((i) => i.type.includes("price"))) {
        result.push({
          type,
          title: `${initialQuery?.min_price} - ${initialQuery?.max_price} EGP`,
          id: `${initialQuery?.min_price},${initialQuery?.max_price}`,
        });
      }
    }
  }
  return result;
}
