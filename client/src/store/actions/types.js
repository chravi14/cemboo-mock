export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const IS_AUTHENTICATED = "IS_AUTHENTICATED";
export const SET_ERRORS = "SET_ERRORS";
export const USER_LOADING = "USER_LOADING";
export const SET_UPLOADS_DATA = "SET_UPLOADS_DATA";
export const SET_LOADER = "SET_LOADER";

export const CLOUD_PROVIDERS = [
    {
        id: 1,
        key: "aws",
        api_url: "/api/aws/videos/upload"
    },
    {
        id: 2,
        key: "gcs",
        api_url: "/api/gcs/videos/upload"
    },
    {
        id: 3,
        key: "azure",
        api_url: "/api/azure/videos/upload"
    },
    {
        id: 4,
        key: "ibm",
        api_url: "/api/ibm/videos/upload"
    },
]