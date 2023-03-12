/// <references types="houdini-svelte">

/** @type {import('houdini').ConfigFile} */
const config = {
  apiUrl: "http://localhost:8000/api/query ",
  plugins: {
    "houdini-svelte": { client: "./src/client" },
  },
  scalars: {
    Int64: {
      type: "number",
    },
    Time: {
      type: "string",
    },
    Upload: {
      type: "File",
    },
    Any: {
      type: "any",
    },
  },
};

export default config;
