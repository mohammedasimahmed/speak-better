/* eslint-disable @typescript-eslint/no-empty-object-type */
import { addToFilterAndCache } from "../services/add-to-filter-and-cache.service";
import { ServerUnaryCall, sendUnaryData, status } from "@grpc/grpc-js";

type AddToFilterAndCacheRequest = { username: string; email: string };
type AddToFilterAndCacheResponse = {};

const addToFilterAndCacheHandler = async (call: ServerUnaryCall<AddToFilterAndCacheRequest, AddToFilterAndCacheResponse>, callback: sendUnaryData<AddToFilterAndCacheResponse>) => {
  try {
    const { username, email } = call.request;
    await addToFilterAndCache(username, email);
    callback(null, {});
  } catch (err) {
    console.error("Error in addToFilterAndCache:", err);
    callback({
      code: status.INTERNAL,
      message: "Failed to add to filter and cache",
    }, null);
  }
};

export default addToFilterAndCacheHandler;