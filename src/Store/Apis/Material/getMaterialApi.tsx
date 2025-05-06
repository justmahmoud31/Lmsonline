import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getMaterial, MaterialQueryParams } from "../../../Types/material";

export const getMaterials = createAsyncThunk<
  getMaterial,
  MaterialQueryParams,
  { rejectValue: string }
>("materials/fetchMaterials", async (params, { rejectWithValue }) => {
  try {
    const query = new URLSearchParams();
    if (params.stageId) query.append("stageId", params.stageId.toString());
    if (params.gradeId) query.append("gradeId", params.gradeId.toString());
    if (params.mainMaterialId)
      query.append("mainMaterialId", params.mainMaterialId.toString());
    if (params.limit) query.append("limit", params.limit.toString());
    const response = await axios.get(
      `${import.meta.env.VITE_BASEURL}/api/materials?${query.toString()}`
    );
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.message || "Failed to fetch materials");
  }
});
