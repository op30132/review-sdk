import Init from "model/Init";

/**
 * @description validate params
 * @param {string} appName
 * @returns
 */
export const generator = (appName) => {
  const init = new Init(appName);
  return init;
};
