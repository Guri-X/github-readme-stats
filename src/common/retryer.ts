import axios, {
  AxiosError,
  AxiosPromise,
  AxiosRequestHeaders,
  AxiosResponse,
} from "axios";
import { CustomError, logger } from "./utils";

/**
 * Try to execute the fetcher function until it succeeds or the max number of retries is reached.
 *
 * @param {object[]} retryerParams Object that contains the createTextNode parameters.
 * @param {object[]} retryerParams.fetcher The fetcher function.
 * @param {object[]} retryerParams.variables Object with arguments to pass to the fetcher function.
 * @param {number} retryerParams.retries How many times to retry.
 * @returns Promise<retryer>
 */
export const retryer = async (
  fetcher: (
    variables: AxiosRequestHeaders,
    token: string,
    retries?: number,
  ) => AxiosPromise<any>,
  variables: AxiosRequestHeaders,
  retries = 0,
): Promise<any> => {
  if (retries > 7) {
    throw new CustomError("Maximum retries exceeded", CustomError.MAX_RETRY);
  }
  try {
    // try to fetch with the first token since RETRIES is 0 index i'm adding +1
    let response = await fetcher(
      variables,
      process.env[`PAT_${retries + 1}`] as string,
      retries,
    );

    // prettier-ignore
    const isRateExceeded = response.data.errors && response.data.errors[0].type === "RATE_LIMITED";

    // if rate limit is hit increase the RETRIES and recursively call the retryer
    // with username, and current RETRIES
    if (isRateExceeded) {
      logger.log(`PAT_${retries + 1} Failed`);
      retries++;
      // directly return from the function
      return retryer(fetcher, variables, retries);
    }

    // finally return the response
    return response;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      // prettier-ignore
      // also checking for bad credentials if any tokens gets invalidated
      const isBadCredential = err?.response?.data && err.response.data.message === "Bad credentials";

      if (isBadCredential) {
        logger.log(`PAT_${retries + 1} Failed`);
        retries++;
        // directly return from the function
        return retryer(fetcher, variables, retries);
      }
    }
  }
};
