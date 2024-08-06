import type { SelectedFilter } from "~/types/products";

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
  return filters.reduce(
    (acc, item) => {
      if (!acc[item.type]) {
        acc[item.type] = [];
      }
      acc[item.type].push(item.id.toString());

      return acc;
    },
    {} as { [key: string]: string[] },
  );
}
