import md5 from "md5";
import axios from "axios";

function getCurrentDateFormatted() {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}${month}${day}`;
}

const url = "https://api.valantis.store:41000";
let datePass = getCurrentDateFormatted();

const password = md5(`Valantis_${datePass}`);

export const getIds = async (offset, limit) => {
  let retryCount = 300;
  let lastError = null;
  while (retryCount > 0) {
    try {
      const response = await axios({
        method: "post",
        url: `${url}`,
        data: {
          action: "get_ids",
          params: {
            offset: offset,
            limit: limit,
          },
        },
        headers: {
          "X-Auth": password,
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error occurred:", error);
      lastError = error;
      retryCount--;
      if (retryCount === 0) {
        throw lastError;
      }
      console.log(`Retrying... ${retryCount} retries left`);
    }
  }
};

export const getItems = async (ids) => {
  let retryCount = 300;
  let lastError = null;

  while (retryCount > 0) {
    try {
      const response = await axios({
        method: "post",
        url: `${url}`,
        data: {
          action: "get_items",
          params: {
            ids: ids,
          },
        },
        headers: {
          "X-Auth": password,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error occurred:", error);
      lastError = error;
      retryCount--;
      if (retryCount === 0) {
        throw lastError;
      }
      console.log(`Retrying... ${retryCount} retries left`);
    }
  }
};

// export const getField = async (field) => {
//   const response = await axios({
//     method: "post",
//     url: `${url}`,
//     data: {
//       action: "get_fields",
//       params: {
//         field: field,
//       },
//     },
//     headers: {
//       "X-Auth": password,
//     },
//   });
//   return response.data;
// };

export const getBrands = async () => {
  let retryCount = 300;
  let lastError = null;
  while (retryCount > 0) {
    try {
      const response = await axios({
        method: "post",
        url: `${url}`,
        data: {
          action: "get_fields",
          params: { field: "brand" },
        },
        headers: {
          "X-Auth": password,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error occurred:", error);
      lastError = error;
      retryCount--;
      if (retryCount === 0) {
        throw lastError;
      }
      console.log(`Retrying... ${retryCount} retries left`);
    }
  }
};

export const getFilterIds = async (params) => {
  let retryCount = 300;
  let lastError = null;
  while (retryCount > 0) {
    try {
      const response = await axios({
        method: "post",
        url: `${url}`,
        data: {
          action: "filter",
          params: params,
        },
        headers: {
          "X-Auth": password,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error occurred:", error);
      lastError = error;
      retryCount--;
      if (retryCount === 0) {
        throw lastError;
      }
      console.log(`Retrying... ${retryCount} retries left`);
    }
  }
};
