import axios from "axios";

// Base URL can be overridden via env. Keep trailing slashes consistent
const DEFAULT_API_BASE = "http://localhost:8000/api";
const API_BASE_URL = (process.env.REACT_APP_API_URL || DEFAULT_API_BASE).replace(/\/$/, "");

// Axios instance
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: false,
});

// Helpers
const buildQuery = (params) => {
  if (!params || typeof params !== "object") return "";
  const usp = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    if (Array.isArray(value)) {
      value.forEach((v) => usp.append(key, String(v)));
    } else {
      usp.set(key, String(value));
    }
  });
  const qs = usp.toString();
  return qs ? `?${qs}` : "";
};

const endpoint = (path) => `${API_BASE_URL}${path.startsWith("/") ? "" : "/"}${path}`.replace(/\/$/, "");

// Generic REST helpers
const list = async (resourcePath, params) => {
  const url = `${endpoint(resourcePath)}/${buildQuery(params)}`.replace(/\/\?$/, "");
  const { data } = await apiClient.get(url);
  return data;
};

const retrieve = async (resourcePath, id, params) => {
  const url = `${endpoint(resourcePath)}/${encodeURIComponent(id)}/${buildQuery(params)}`.replace(/\/\?$/, "");
  const { data } = await apiClient.get(url);
  return data;
};

const create = async (resourcePath, payload) => {
  const { data } = await apiClient.post(`${endpoint(resourcePath)}/`, payload);
  return data;
};

const update = async (resourcePath, id, payload, { partial = true } = {}) => {
  const url = `${endpoint(resourcePath)}/${encodeURIComponent(id)}/`;
  const method = partial ? "patch" : "put";
  const { data } = await apiClient[method](url, payload);
  return data;
};

const remove = async (resourcePath, id) => {
  const url = `${endpoint(resourcePath)}/${encodeURIComponent(id)}/`;
  await apiClient.delete(url);
  return true;
};

// Resources (from Django routers)
const RESOURCES = {
  // shared
  images: "/shared/images",
  models3d: "/shared/models3d",
  // historical figures
  scienceFields: "/historical-figures/science-fields",
  historicalFigures: "/historical-figures/historical-figures",
  // artifacts
  hallCategories: "/artifacts/hall-categories",
  halls: "/artifacts/halls",
  artifactCategories: "/artifacts/artifact-categories",
  artifacts: "/artifacts/artifacts",
};

// Shared: Images
export const ImagesAPI = {
  list: (params) => list(RESOURCES.images, params),
  get: (id, params) => retrieve(RESOURCES.images, id, params),
  create: (payload) => create(RESOURCES.images, payload),
  update: (id, payload, opts) => update(RESOURCES.images, id, payload, opts),
  remove: (id) => remove(RESOURCES.images, id),
};

// Shared: 3D Models
export const Models3DAPI = {
  list: (params) => list(RESOURCES.models3d, params),
  get: (id, params) => retrieve(RESOURCES.models3d, id, params),
  create: (payload) => create(RESOURCES.models3d, payload),
  update: (id, payload, opts) => update(RESOURCES.models3d, id, payload, opts),
  remove: (id) => remove(RESOURCES.models3d, id),
};

// Historical Figures: Science Fields
export const ScienceFieldsAPI = {
  list: (params) => list(RESOURCES.scienceFields, params),
  get: (id, params) => retrieve(RESOURCES.scienceFields, id, params),
  create: (payload) => create(RESOURCES.scienceFields, payload),
  update: (id, payload, opts) => update(RESOURCES.scienceFields, id, payload, opts),
  remove: (id) => remove(RESOURCES.scienceFields, id),
};

// Historical Figures
export const HistoricalFiguresAPI = {
  list: (params) => list(RESOURCES.historicalFigures, params),
  get: (id, params) => retrieve(RESOURCES.historicalFigures, id, params),
  create: (payload) => create(RESOURCES.historicalFigures, payload),
  update: (id, payload, opts) => update(RESOURCES.historicalFigures, id, payload, opts),
  remove: (id) => remove(RESOURCES.historicalFigures, id),
};

// Artifacts: Hall Categories
export const HallCategoriesAPI = {
  list: (params) => list(RESOURCES.hallCategories, params),
  get: (id, params) => retrieve(RESOURCES.hallCategories, id, params),
  create: (payload) => create(RESOURCES.hallCategories, payload),
  update: (id, payload, opts) => update(RESOURCES.hallCategories, id, payload, opts),
  remove: (id) => remove(RESOURCES.hallCategories, id),
};

// Artifacts: Halls
export const HallsAPI = {
  list: (params) => list(RESOURCES.halls, params),
  get: (id, params) => retrieve(RESOURCES.halls, id, params),
  create: (payload) => create(RESOURCES.halls, payload),
  update: (id, payload, opts) => update(RESOURCES.halls, id, payload, opts),
  remove: (id) => remove(RESOURCES.halls, id),
};

// Artifacts: Artifact Categories
export const ArtifactCategoriesAPI = {
  list: (params) => list(RESOURCES.artifactCategories, params),
  get: (id, params) => retrieve(RESOURCES.artifactCategories, id, params),
  create: (payload) => create(RESOURCES.artifactCategories, payload),
  update: (id, payload, opts) => update(RESOURCES.artifactCategories, id, payload, opts),
  remove: (id) => remove(RESOURCES.artifactCategories, id),
};

// Artifacts
export const ArtifactsAPI = {
  list: (params) => list(RESOURCES.artifacts, params),
  get: (id, params) => retrieve(RESOURCES.artifacts, id, params),
  create: (payload) => create(RESOURCES.artifacts, payload),
  update: (id, payload, opts) => update(RESOURCES.artifacts, id, payload, opts),
  remove: (id) => remove(RESOURCES.artifacts, id),
};

// Convenience export: grouped APIs and generic helpers
export const API = {
  baseURL: API_BASE_URL,
  client: apiClient,
  images: ImagesAPI,
  models3d: Models3DAPI,
  scienceFields: ScienceFieldsAPI,
  historicalFigures: HistoricalFiguresAPI,
  hallCategories: HallCategoriesAPI,
  halls: HallsAPI,
  artifactCategories: ArtifactCategoriesAPI,
  artifacts: ArtifactsAPI,
  util: { buildQuery },
};

export default API;



